using Microsoft.AspNetCore.Http;
using Polo.Infrastructure.DTO;
using Polo.Infrastructure.Entities;
using Polo.Infrastructure.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Core.Repositories.Interfaces
{
	public interface ICustomerRepository
    {
        List<Customer> GetAllCustomers();
        Response SaveCustomer(Customer customers, string userId);
        Response GetCustomerById(int id);
        Response DeleteCustomer(int id);
    }
}
