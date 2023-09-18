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
                Products = _db.Product.Where(x => x.IsActive == true).ToList(),
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
                    foundProduct.IsActive = product.IsActive;
                    if (files != null)
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
                    if (product.ProductItem != null && product.ProductItem.Count > 0)
                    {
                        List<ProductItem> productItem = new List<ProductItem>();
                        List<ProductItem> productList = new List<ProductItem>();
                        List<ProductItem> productDeleteList = new List<ProductItem>();
                        foreach (var item in product.ProductItem)
                        {
                            if (!item.IsDeleted)
                            {
                                ProductItem proc = _db.ProductItem.FirstOrDefault(x => x.Id == item.Id);
                                if (proc != null)
                                {
                                    proc.ProductId = product.Id;
                                    proc.Name = item.Name;
                                    proc.Qty = item.Qty;
                                    proc.MeasureQty = item.MeasureQty;
                                    proc.IsActive = item.IsActive;
                                    proc.UpdatedBy = userId.ToString();
                                    proc.UpdatedDate = DateTime.Now;
                                    productItem.Add(proc);
                                }
                                else
                                {
                                    item.ProductId = product.Id;
                                    item.CreatedDate = DateTime.Now;
                                    item.CreatedBy = userId.ToString();
                                    productList.Add(item);
                                }
                            }
                            else {
                                ProductItem productDelete = _db.ProductItem.FirstOrDefault(x => x.Id == item.Id);
                                if(productDelete != null)
                                {
                                    productDeleteList.Add(productDelete);
                                }
                            }
                            
                        }
                        _db.ProductItem.RemoveRange(productDeleteList);
                        _db.ProductItem.AddRange(productList);
                        _db.ProductItem.UpdateRange(productItem);
                        
                    }
                    if (product.ProductAttributes != null && product.ProductAttributes.Count > 0)
                    {
                        _db.ProductAttributes.RemoveRange(_db.ProductAttributes.Where(z => z.ProductId == product.Id));
                        product.ProductAttributes.ToList().ForEach(x =>
                        {
                            x.ProductId = product.Id;
                        });
                        _db.ProductAttributes.AddRange(product.ProductAttributes);
                    }
                    _db.SaveChanges();
                    response.Success = true;
                    response.Detail = " Product is updated Successfully";
                }
                else
                {
                    product.CreatedDate = DateTime.Now;
                    product.CreatedBy = userId.ToString();
                    if (files != null)
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
                    if (product.ProductAttributes != null && product.ProductAttributes.Count > 0)
                    {
                        _db.ProductAttributes.RemoveRange(_db.ProductAttributes.Where(z => z.ProductId == product.Id));
                        product.ProductAttributes.ToList().ForEach(x =>
                        {
                            x.ProductId = product.Id;
                        });
                        _db.ProductAttributes.AddRange(product.ProductAttributes);
                    }
                    if (product.ProductItem != null && product.ProductItem.Count > 0)
                    {
                        _db.ProductItem.RemoveRange(_db.ProductItem.Where(z => z.ProductId == product.Id));
                        product.ProductItem.ToList().ForEach(x =>
                        {
                            x.ProductId = product.Id;
                            x.CreatedDate = DateTime.Now;
                            x.CreatedBy = userId.ToString();
                        });
                        _db.ProductItem.AddRange(product.ProductItem);
                    }
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
                List<ProductItem> productItems = _db.ProductItem.Where(x => x.ProductId == id).ToList();
                product.ProductAttributes= _db.ProductAttributes.Where(x => x.ProductId == id).ToList();
                if (product.ProductAttributes != null && product.ProductAttributes.Count > 0)
                {
                    product.ProductAttributes.ToList().ForEach(x =>
                    {
                        x.AttrText = _db.Product.FirstOrDefault(y => y.Id == x.ParentProductId).Name;
                        x.IsRequiredText = x.IsRequired == false ? "No" : "Yes";
                    });
                }
                List<ProductAttributesVM> attributesVM = product.ProductAttributes.GroupBy(x => new { x.Category,x.IsRequired }).Select(r => new ProductAttributesVM
                {
                    
                    Category =r.Key.IsRequired==true? r.Key.Category+"(Required)":r.Key.Category,
                    attributes=product.ProductAttributes.ToList(),

                }).ToList();
                response.data = new
                {
                    Product = product,
                    Attribute = attributesVM,
                    ProductItem = productItems
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
                List<ProductAttributes> attributes = _db.ProductAttributes.Where(x => x.ProductId == id).ToList();
                List<ProductItem> items = _db.ProductItem.Where(x => x.ProductId == id).ToList();
                if(attributes != null)
                {
                    _db.ProductAttributes.RemoveRange(attributes);
                }
                else if(items != null)
                {
                    _db.ProductItem.RemoveRange(items);
                }
                _db.Product.Remove(product);
                _db.SaveChanges();
                response.Detail = "Product has been deleted";
                response.Success = true;
            }
            return response;
        }

    }
}
