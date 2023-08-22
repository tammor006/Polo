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
	public interface ISupplierRepository
    {
        Response GetAllSupplier();
        Response SaveSupplier(Supplier supplier, string userId);
        Response GetSupplierById(int id);
        Response DeleteSupplier(int id);
    }
}
