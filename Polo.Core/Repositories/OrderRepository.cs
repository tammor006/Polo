using Polo.Core.Repositories.Interfaces;
using Polo.Core.ViewModels;
using Polo.Infrastructure;
using Polo.Infrastructure.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Core.Repositories
{
    public class OrderRepository:IOrderRepository
    {
        private PoloDBContext _db;
        public OrderRepository(PoloDBContext db)
        {
            _db = db;
        }
        public Response PreBind()
        {
            Response response = new Response();
            List<OrderVM> orderVM = new List< OrderVM>();
            var Categories = _db.Categories.Where(x => x.IsActive).ToList();
            foreach(var cat in Categories)
            {
                OrderVM vM = new OrderVM();
                vM.Category = cat.Name;
                vM.Product = _db.Product.Where(x => x.CategoryId == cat.Id).ToList();
                orderVM.Add(vM);
            }
            response.data = new
            {
                Product = orderVM
            };
            response.Success = true;
            return response;
        }
    }
}
