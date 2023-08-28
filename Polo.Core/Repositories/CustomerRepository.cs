using Microsoft.EntityFrameworkCore;
using Polo.Core.Enum;
using Polo.Core.Repositories.Interfaces;
using Polo.Infrastructure;
using Polo.Infrastructure.DTO;
using Polo.Infrastructure.Entities;
using Polo.Infrastructure.Utilities;

namespace Polo.Core.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private PoloDBContext _db;
        public CustomerRepository(PoloDBContext db)
        {
            _db = db;
        }
        public List<Customer> GetAllCustomers()
        {
            var customers = _db.Customer.ToList();
            return customers;
        }
        public Response SaveCustomer(Customer customer, string userId)
        {
            Response response = new Response();
            try
            {
                if (!customer.Id.IsNullOrZero())
                {
                    Customer foundCustomer = _db.Customer.FirstOrDefault(x => x.Id == customer.Id);
                    if (foundCustomer != null)
                    {
                        foundCustomer.FirstName = customer.FirstName;
                        foundCustomer.LastName = customer.LastName;
                        foundCustomer.Address = customer.Address;
                        foundCustomer.Street = customer.Street;
                        foundCustomer.City = customer.City;
                        foundCustomer.Number = customer.Number;
                        foundCustomer.Email = customer.Email;
                        //foundCustomer.OrderType = customer.OrderType;
                        foundCustomer.PaymentType = customer.PaymentType;
                       // foundCustomer.DeliveryTime = customer.DeliveryTime;
                        foundCustomer.UpdatedDate = DateTime.Now;
                        foundCustomer.UpdatedBy = userId.ToString();

                        _db.Entry(foundCustomer).State = EntityState.Modified;
                        _db.SaveChanges();

                        response.Success = true;
                        response.Detail = "Customer is updated Successfully";
                    }
                    else
                    {
                        response.Success = false;
                        response.Detail = "Customer not found"; // Handle not found scenario
                    }
                }
                else
                {
                    customer.CreatedDate = DateTime.Now;
                    customer.CreatedBy = userId.ToString();
                    _db.Add(customer);
                    _db.SaveChanges();

                    response.Success = true;
                    response.Detail = "Customer is added Successfully";
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return response;
        }

        public Response GetCustomerById(int id)
        {
            Response response = new Response();
            if (!id.IsNullOrZero())
            {
                Customer customers = _db.Customer.FirstOrDefault(x => x.Id == id);
                response.data = new
                {
                    Customers = customers,
                };
                response.Success = true;
            }
            return response;
        }
        public Response DeleteCustomer(int id)
        {
            Response response = new Response();
            if (!id.IsNullOrZero())
            {
                Customer customers = _db.Customer.FirstOrDefault(x => x.Id == id);
                _db.Customer.Remove(customers);
                _db.SaveChanges();
                response.Detail = "Customer has been deleted";
                response.Success = true;
            }
            return response;
        }
    }
}
