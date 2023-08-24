using Microsoft.AspNetCore.Mvc;
using Polo.Core.Repositories;
using Polo.Core.Repositories.Interfaces;
using Polo.Infrastructure.Utilities;

namespace Polo.Controllers
{
    public class OrderController : Controller
    {
        private readonly IOrderRepository _ordersRepository;
        public OrderController( IOrderRepository ordersRepository)
        {
            _ordersRepository = ordersRepository;
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
    }
}
