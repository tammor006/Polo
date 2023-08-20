
using System.Net;
using Polo.Infrastructure.Utilities;
using Polo.Core.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Polo.Controllers
{
	public class CategoriesController : Controller
	{
        private readonly ICategoriesRepository _categoriesRepository;
        public CategoriesController(ICategoriesRepository categoriesRepository)
        {
            _categoriesRepository = categoriesRepository;
        }
        public IActionResult Index()
		{
			return View();
		}
       
        public JsonResult GetAllCategories()
        {
            Response response = new Response();
            try {
                response = _categoriesRepository.GetAllCategories();
            }
            catch(Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            response = _categoriesRepository.GetAllCategories();
            return Json(response);
            
        }
    }
}
