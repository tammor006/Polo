using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Polo.Core.Repositories;
using Polo.Core.Repositories.Interfaces;
using Polo.Infrastructure.Entities;
using Polo.Infrastructure.Utilities;
using Microsoft.AspNetCore.Authorization;

namespace Polo.Controllers
{
    [Authorize]
    public class OrderController : Controller
    {
        private readonly IOrderRepository _ordersRepository;
        private readonly UserManager<IdentityUser> _userManager;
        public OrderController(UserManager<IdentityUser> userManager, IOrderRepository ordersRepository)
        {
            _ordersRepository = ordersRepository;
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
                response = _ordersRepository.PreBind();
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return Json(response);
        }
        [HttpGet]
        public JsonResult GetCustomerById(string number)
        {
            Response response = new Response();
            try
            {
                response = _ordersRepository.GetCustomerById(number);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return Json(response);
        }
        public JsonResult SaveOrder(SaleOrder orders)
        {
            Response response = new Response();

            try
            {
                if (User.Identity.IsAuthenticated)
                {
                    string userId = _userManager.GetUserId(User);
                    response = _ordersRepository.SaveOrder(orders, userId);
                }
                else
                {
                    response.Success = false;
                    response.Detail = "User not Authenticated";
                    return Json(response);
                }
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
