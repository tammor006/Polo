using Microsoft.AspNetCore.Http;
using Polo.Infrastructure.Entities;
using Polo.Infrastructure.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Core.Repositories.Interfaces
{
	public interface ICategoriesRepository
	{
        Response GetAllCategories();
        Response SaveProduct(Categories categories, string userId);
        Response GetCategoryById(int id);
        Response DeleteCategory(int id);
    }
}
