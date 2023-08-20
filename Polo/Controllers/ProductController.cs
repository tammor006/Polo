using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Polo.Core.Repositories;
using Polo.Core.Repositories.Interfaces;
using Polo.Infrastructure.Entities;
using Polo.Infrastructure.Utilities;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace Polo.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductRepository _productsRepository;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly UserManager<IdentityUser> _userManager;
        public ProductController(UserManager<IdentityUser> userManager,IProductRepository productsRepository,IWebHostEnvironment webHostEnvironment)
        {
            _productsRepository = productsRepository;
            _webHostEnvironment = webHostEnvironment;
            _userManager = userManager;
        }
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult PreBind()
        {
            Response response = new Response();
            try
            {
                response = _productsRepository.PreBind();
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return Json(response);
        }
        public JsonResult SaveProduct( Product product)
        {
            Response response = new Response();

            string userId = _userManager.GetUserId(User);
            try
            {
                product = Request.Form["product"].ToString().deserialize<Product>();
                response = _productsRepository.SaveProduct(product,Request.Form.Files.Count.IsNullOrZero() ? null : Request.Form.Files,userId);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return Json(response);
        }
        public JsonResult GetAllProduct()
        {
            Response response = new Response();
            try
            {
                response = _productsRepository.GetAllProduct();
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return Json(response);
        }
        public JsonResult GetProductById(int id)
        {
            Response response = new Response();
            try
            {
                response = _productsRepository.GetProductById(id);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return Json(response);
        }
        public JsonResult DeleteProduct(int id)
        {
            Response response = new Response();
            try
            {
                response = _productsRepository.DeleteProduct(id);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return Json(response);
        }

    }
}
