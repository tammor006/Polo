using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Polo.Core.Repositories.Interfaces;
using Polo.Core.ViewModels;
using Polo.Infrastructure;
using Polo.Infrastructure.Entities;
using Polo.Infrastructure.Utilities;

namespace Polo.Core.Repositories
{
    public class StockRepository : IStockRepository
    {
        private PoloDBContext _db;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        public StockRepository(PoloDBContext db, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _db = db;
            _userManager = userManager;
            _signInManager = signInManager;
        }
        public Response PreBind()
        {
            Response response = new Response();
            response.data = new
            {
                Product = _db.Product.Where(x => x.IsActive).Select(x => new { Id = x.Id, Name = x.Name }).ToList(),
            };
            response.Success = true;
            return response;
        }
        public Response SaveStock(Stock stock, string userId)
        {
            Response response = new Response();

            try
            {
                if (!stock.Id.IsNullOrZero())
                {
                    Stock foundStock = _db.Stock.Where(x => x.Id == stock.Id).FirstOrDefault();
                    foundStock.Quantity = stock.Quantity;
                    foundStock.ProductId = stock.ProductId;
                    foundStock.LastUpdate = (DateTime)stock.StrLastUpdate.DbDate();
                    foundStock.IsActive = stock.IsActive;
                    foundStock.UpdatedDate = DateTime.Now;
                    foundStock.UpdatedBy = userId.ToString();
                    _db.Entry(foundStock).State = EntityState.Modified;
                    _db.SaveChanges();
                    response.Success = true;
                    response.Detail = "Stock is updated Successfully";
                }
                else
                {
                    stock.LastUpdate = (DateTime)stock.StrLastUpdate.DbDate();
                    stock.CreatedDate = DateTime.Now;
                    stock.CreatedBy = userId;
                    _db.Add(stock);
                    _db.SaveChanges();
                    response.Success = true;
                    response.Detail = "Stock is added Successfully";
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return response;

        }
        public Response GetAllStock()
        {
            Response response = new Response();
            List<StockVM> stock = new List<StockVM>();
            var stockList = _db.Stock.Where(x => x.IsActive == true).ToList();
            foreach (var s in stockList)
            {
                StockVM vM = new StockVM();
                vM.Id = s.Id;
                vM.Quantity = s.Quantity;
                vM.StrLastUpdated = s.LastUpdate.ViewDate();
                vM.ProductName = _db.Product.FirstOrDefault(x => x.Id == s.ProductId).Name;
                stock.Add(vM);
            }
            response.data = stock;
            response.Success = true;
            return response;
        }
        public Response GetStockById(int id)
        {
            Response response = new Response();
            if (!id.IsNullOrZero())
            {
                Stock stock = _db.Stock.FirstOrDefault(x => x.Id == id);
                if (!ReferenceEquals(stock, null))
                {
                    stock.StrLastUpdate = stock.LastUpdate.ViewDate();
                }
                    response.data = new
                {
                    Stock = stock,
                };
                response.Success = true;
            }
            return response;
        }
        public Response DeleteStock(int id)
        {
            Response response = new Response();
            if (!id.IsNullOrZero())
            {
                Stock stock = _db.Stock.FirstOrDefault(x => x.Id == id);
                _db.Stock.Remove(stock);
                _db.SaveChanges();
                response.Detail = "Stock has been deleted";
                response.Success = true;
            }
            return response;
        }
    }
}
