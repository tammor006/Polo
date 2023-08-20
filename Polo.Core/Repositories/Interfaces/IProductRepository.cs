using Polo.Infrastructure.Entities;
using Polo.Infrastructure.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Http;
using System.Collections.ObjectModel;

namespace Polo.Core.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Response PreBind();
        Response SaveProduct(Product product, IFormFileCollection files,string userId);
        Response GetAllProduct();
        Response GetProductById(int id);
        Response DeleteProduct(int id);

    }
}
