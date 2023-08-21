using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
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
        public Response GetAllCategories()
        {
            Response response = new Response();
            List<Categories> getallcategories = new List<Categories>();
            getallcategories = _db.Categories.ToList(); ;
            response.data = getallcategories;
            return response;
        }
        public Response SaveProduct(Categories category, string userId)
        {
            Response response = new Response();
            try
            {
                if (!category.Id.IsNullOrZero())
                {
                    Categories foundCategories = _db.Categories.Where(x => x.Id == category.Id).FirstOrDefault();
                    foundCategories.Name = category.Name;
                    foundCategories.IsActive = category.IsActive;
                    foundCategories.UpdatedDate = DateTime.Now;
                    foundCategories.UpdatedBy = userId.ToString();
                    _db.Entry(foundCategories).State = EntityState.Modified;
                    _db.SaveChanges();
                    response.Success = true;
                    response.Detail = " Category is updated Successfully";
                }
                else
                {
                    category.CreatedDate = DateTime.Now;
                    category.CreatedBy = userId.ToString();
                    _db.Add(category);
                    _db.SaveChanges();
                    response.Success = true;
                    response.Detail = " Category is added Successfully";
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return response;
        }
        public Response GetCategoryById(int id)
        {
            Response response = new Response();
            if (!id.IsNullOrZero())
            {
                Categories categories = _db.Categories.FirstOrDefault(x => x.Id == id);
                response.data = new
                {
                    Category = categories,
                };
                response.Success = true;
            }
            return response;
        }
        public Response DeleteCategory(int id)
        {
            Response response = new Response();
            if (!id.IsNullOrZero())
            {
                Categories categories = _db.Categories.FirstOrDefault(x => x.Id == id);
                _db.Categories.Remove(categories);
                _db.SaveChanges();
                response.Detail = "Category has been deleted";
                response.Success = true;
            }
            return response;
        }
    }
}
