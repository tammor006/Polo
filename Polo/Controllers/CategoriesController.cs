using Microsoft.AspNetCore.Mvc;
using System.Net;
using Polo.Infrastructure.Utilities;
using Polo.Core.Repositories.Interfaces;

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
       
        public async Task<JsonResult> GetAllCategories()
        {
            Response response = new Response();
            try
            {
                response = await _categoriesRepository.GetAllCategories();
            }
            catch (Exception ex)
            {
                response.httpCode = HttpStatusCode.InternalServerError;
                response.message = Message.errorMessage;
            }
            return Json(response.data);
        }
    }
}
