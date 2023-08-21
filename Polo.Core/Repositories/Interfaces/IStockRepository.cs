using Microsoft.AspNetCore.Http;
using Polo.Infrastructure.Entities;
using Polo.Infrastructure.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Core.Repositories.Interfaces
{
    public interface IStockRepository
    {
        Response PreBind();
        Response SaveStock(Stock stock, string userId);
        Response GetAllStock();
        Response GetStockById(int id);
        Response DeleteStock(int id);
    }
}
