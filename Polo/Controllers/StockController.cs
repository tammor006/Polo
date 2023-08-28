using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Polo.Core.Repositories.Interfaces;
using Polo.Infrastructure.Entities;
using Polo.Infrastructure.Utilities;
using Microsoft.AspNetCore.Authorization;

namespace Polo.Controllers
{
    [Authorize]
    public class StockController : Controller
    {
        private readonly IStockRepository _stockRepository;
        private readonly UserManager<IdentityUser> _userManager;
        public StockController(UserManager<IdentityUser> userManager, IStockRepository stockRepository)
        {
            _stockRepository = stockRepository;
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
                response = _stockRepository.PreBind();
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return Json(response);
        }
        public JsonResult SaveStock(Stock stock)
        {
            Response response = new Response();

            string userId = _userManager.GetUserId(User);
            try
            {
                
                response = _stockRepository.SaveStock(stock, userId);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return Json(response);
        }
        public JsonResult GetAllStock()
        {
            Response response = new Response();
            try
            {
                response = _stockRepository.GetAllStock();
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return Json(response);
        }
        public JsonResult GetStockById(int id)
        {
            Response response = new Response();
            try
            {
                response = _stockRepository.GetStockById(id);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return Json(response);
        }
        public JsonResult DeleteStock(int id)
        {
            Response response = new Response();
            try
            {
                response = _stockRepository.DeleteStock(id);
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
