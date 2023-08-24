using System.Net;
using Polo.Infrastructure.Utilities;
using Polo.Core.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Polo.Core.Repositories;
using Polo.Infrastructure.Entities;

namespace Polo.Controllers
{
    public class CategoriesController : Controller
    {
        private readonly ICategoriesRepository _categoriesRepository;
        private readonly UserManager<IdentityUser> _userManager;
        public CategoriesController(UserManager<IdentityUser> userManager, ICategoriesRepository categoriesRepository)
        {
            _categoriesRepository = categoriesRepository;
            _userManager = userManager;
        }
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllCategories()
        {
            Response response = new Response();
            try
            {
                response = _categoriesRepository.GetAllCategories();
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }

            return Json(response);
        }
        public JsonResult SaveCategory(Categories categories)
        {
            Response response = new Response();

            try
            {
                if (User.Identity.IsAuthenticated)
                {
                    string userId = _userManager.GetUserId(User);
                    response = _categoriesRepository.SaveProduct(categories, userId);
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
        public JsonResult GetCategoryById(int id)
        {
            Response response = new Response();
            try
            {
                response = _categoriesRepository.GetCategoryById(id);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return Json(response);
        }
        public JsonResult DeleteCategory(int id)
        {
            Response response = new Response();
            try
            {
                response = _categoriesRepository.DeleteCategory(id);
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
