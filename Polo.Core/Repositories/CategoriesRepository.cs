using Polo.Core.Repositories.Interfaces;
using Polo.Infrastructure;
using Polo.Infrastructure.Entities;
using Polo.Infrastructure.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Core.Repositories
{
	public class CategoriesRepository:ICategoriesRepository
	{
        private PoloDBContext _db;
        public CategoriesRepository(PoloDBContext db)
        {
            _db = db;
        }
        public async Task<Response> GetAllCategories()
        {
            Response response = new Response();
            response.httpCode = System.Net.HttpStatusCode.OK;
            List<Categories> getallcategories = new List<Categories>();
            getallcategories = _db.Categories.Where(x => x.IsActive == true).ToList(); ;
            response.data = getallcategories;
            return response;
        }
    }
}
