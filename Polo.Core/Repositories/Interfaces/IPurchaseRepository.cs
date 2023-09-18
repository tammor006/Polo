using Polo.Infrastructure.Entities;
using Polo.Infrastructure.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Core.Repositories.Interfaces
{
    public interface IPurchaseRepository
    {
        Response PreBindPurchase();
        Response SavePurchase(Purchase purchase, string userId);
        Response GetPurchaseById(int id);
        Response GetAllPurchase();
        Response DeletePurchase(int id, string userId);
    }
}
