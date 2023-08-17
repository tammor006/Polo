using Microsoft.AspNetCore.Mvc;

namespace Polo.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        
    }
}
