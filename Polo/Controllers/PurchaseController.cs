using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Polo.Core.Repositories;
using Polo.Core.Repositories.Interfaces;
using Polo.Infrastructure.Entities;
using Polo.Infrastructure.Migrations;
using Polo.Infrastructure.Utilities;

namespace Polo.Controllers
{
    [Authorize]
    public class PurchaseController : Controller
    {
        private readonly IPurchaseRepository _PurchasesRepository;
        private readonly UserManager<IdentityUser> _userManager;
        public PurchaseController(UserManager<IdentityUser> userManager, IPurchaseRepository PurchasesRepository)
        {
            _PurchasesRepository = PurchasesRepository;
            _userManager = userManager;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Create()
        {
            return View();
        }
        public JsonResult PreBindPurchase()
        {
            Response response = new Response();
            try
            {
                response = _PurchasesRepository.PreBindPurchase();
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return Json(response);
        }
        public JsonResult SavePurchase(Purchase purchase)
        {
            Response response = new Response();

            try
            {
                if (User.Identity.IsAuthenticated)
                {
                    string userId = _userManager.GetUserId(User);
                    response = _PurchasesRepository.SavePurchase(purchase, userId);
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
        public JsonResult GetAllPurchase()
        {
            Response response = new Response();
            try
            {
                response = _PurchasesRepository.GetAllPurchase();
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return Json(response);
        }
        public JsonResult  DeletePurchase(int id)
        {
            Response response = new Response();

            try
            {
                if (User.Identity.IsAuthenticated)
                {
                    string userId = _userManager.GetUserId(User);
                    response = _PurchasesRepository.DeletePurchase(id, userId);
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
        public JsonResult GetPurchaseById(int id)
        {
            Response response = new Response();
            try
            {
                response = _PurchasesRepository.GetPurchaseById(id);
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
