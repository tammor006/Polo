using System.Net;
using Polo.Infrastructure.Utilities;
using Polo.Core.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Polo.Core.Repositories;
using Polo.Infrastructure.Entities;
using Microsoft.AspNetCore.Authorization;

namespace Polo.Controllers
{
    [Authorize]
    public class SupplierController : Controller
    {
        private readonly ISupplierRepository _supplierRepository;
        private readonly UserManager<IdentityUser> _userManager;
        public SupplierController(UserManager<IdentityUser> userManager, ISupplierRepository supplierRepository)
        {
            _supplierRepository = supplierRepository;
            _userManager = userManager;
        }
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllSupplier()
        {
            Response response = new Response();
            try
            {
                response = _supplierRepository.GetAllSupplier();
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }

            return Json(response);
        }
        public JsonResult SaveSupplier(Supplier supplier)
        {
            Response response = new Response();

            try
            {
                if (User.Identity.IsAuthenticated)
                {
                    string userId = _userManager.GetUserId(User);
                    response = _supplierRepository.SaveSupplier(supplier, userId);
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
        public JsonResult GetSupplierById(int id)
        {
            Response response = new Response();
            try
            {
                response = _supplierRepository.GetSupplierById(id);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return Json(response);
        }
        public JsonResult DeleteSupplier(int id)
        {
            Response response = new Response();
            try
            {
                response = _supplierRepository.DeleteSupplier(id);
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
