using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Mono.TextTemplating;
using Polo.Core.Repositories.Interfaces;
using Polo.Core.ViewModels;
using Polo.Infrastructure;
using Polo.Infrastructure.Entities;
using Polo.Infrastructure.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Polo.Core.Repositories
{
    public class ProductRepository:IProductRepository
    {
        private PoloDBContext _db;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private IWebHostEnvironment _webHostEnvironment;
        public ProductRepository(PoloDBContext db, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IWebHostEnvironment webHostEnvironment)
        {
            _db = db;
            _userManager = userManager;
            _signInManager = signInManager;
            _webHostEnvironment = webHostEnvironment;
        }
        public Response PreBind()
        {
            Response response = new Response();
            response.data = new
            {
                Categories = _db.Categories.Where(x => x.IsActive == true).ToList(),
            };
            response.Success = true;
            return response;
        }
        public Response SaveProduct(Product product,IFormFileCollection files,string userId)
        {
            Response response = new Response();
            
            try
            {
              if(!product.Id.IsNullOrZero())
                {
                    Product foundProduct = _db.Product.Where(x => x.Id == product.Id).FirstOrDefault();
                    foundProduct.Price = product.Price;
                    foundProduct.BarCode = product.BarCode;
                    foundProduct.Name = product.Name;
                    foundProduct.UpdatedDate = DateTime.Now;
                    foundProduct.UpdatedBy = userId.ToString();
                    foundProduct.Description = product.Description;
                    foundProduct.CategoryId = product.CategoryId;
                    if (product.ImageUrl =="")
                    {
                        int i = 0;
                        IFormFile formFile = files[i];
                        string fileName = null;


                        string uploadDir = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
                        fileName = Guid.NewGuid().ToString() + "-" + formFile.FileName;
                        string filePath = Path.Combine(uploadDir, fileName);
                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            formFile.CopyTo(fileStream);
                        }
                        foundProduct.ImageName = formFile.FileName;
                        foundProduct.ImageUrl = fileName;


                    }
                    _db.Entry(foundProduct).State = EntityState.Modified;
                    _db.SaveChanges();
                    response.Success = true;
                    response.Detail = " Product is updated Successfully";
                }
                else
                {
                    product.CreatedDate = DateTime.Now;
                    product.CreatedBy = userId.ToString();
                    if (product.ImageName != null)
                    {
                        int i = 0;
                        IFormFile formFile = files[i];
                        string fileName = null;


                        string uploadDir = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
                        fileName = Guid.NewGuid().ToString() + "-" + formFile.FileName;
                        string filePath = Path.Combine(uploadDir, fileName);
                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            formFile.CopyTo(fileStream);
                        }
                        product.ImageName = formFile.FileName;
                        product.ImageUrl = fileName;


                    }
                    _db.Add(product);
                    _db.SaveChanges();
                    response.Success = true;
                    response.Detail = " Product is added Successfully";
                }
            }
            catch(Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return response;

        }
        public Response GetAllProduct()
        {
            Response response = new Response();
            List<ProductVM> products = new List<ProductVM>();
            var productList = _db.Product.Where(x => x.IsActive == true).ToList();
            foreach( var p in productList)
            {
                ProductVM vM = new ProductVM();
                vM.Id = p.Id;
                vM.Name = p.Name;
                vM.Price = p.Price;
                vM.BarCode = p.BarCode;
                vM.CategoryName = _db.Categories.FirstOrDefault(x => x.Id == p.CategoryId).Name;
                products.Add(vM);

            }
            response.data = products;
            response.Success = true;
            return response;
        }
        public Response GetProductById(int id)
        {
            Response response = new Response();
            if(!id.IsNullOrZero())
            {
                Product product = _db.Product.FirstOrDefault(x => x.Id == id);
                response.data = new
                {
                    Product=product,
                };
                response.Success = true;
            }
            return response;
        }
        public Response DeleteProduct(int id)
        {
            Response response = new Response();
            if (!id.IsNullOrZero())
            {
                Product product = _db.Product.FirstOrDefault(x => x.Id == id);
                _db.Product.Remove(product);
                _db.SaveChanges();
                response.Detail = "Product has been deleted";
                response.Success = true;
            }
            return response;
        }

    }
}
