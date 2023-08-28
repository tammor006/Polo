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
        public List<Customers> GetAllCustomers()
        {
            try
            {
                var customers = _db.Customer
                    .Select(c => new Customers
                    {
                        Id = c.Id,
                        FirstName = c.FirstName,
                        LastName = c.LastName,
                        Email = c.Email,
                        Street = c.Street,
                        City = c.City,
                        Address = c.Address,
                        Number = c.Number,
                        OrderType = c.OrderType,
                        DeliveryType = c.DeliveryType,
                        AvailableTime = c.AvailableTime,
                        PaymentType = c.PaymentType,
                        CreatedBy = c.CreatedBy,
                        CreatedDate = c.CreatedDate,
                        UpdatedBy = c.UpdatedBy,
                        UpdatedDate = c.UpdatedDate
                    })
                    .ToList();

                return customers;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Response SaveCustomer(Customers customer, string userId)
        {
            Response response = new Response();
            try
            {
                if (!customer.Id.IsNullOrZero())
                {
                    Customers foundCustomer = _db.Customer.FirstOrDefault(x => x.Id == customer.Id);
                    if (foundCustomer != null)
                    {
                        foundCustomer.FirstName = customer.FirstName;
                        foundCustomer.LastName = customer.LastName;
                        foundCustomer.Address = customer.Address;
                        foundCustomer.Street = customer.Street;
                        foundCustomer.City = customer.City;
                        foundCustomer.Number = customer.Number;
                        foundCustomer.Email = customer.Email;
                        foundCustomer.OrderType = customer.OrderType;
                        foundCustomer.DeliveryType = customer.DeliveryType;
                        foundCustomer.AvailableTime = customer.AvailableTime;
                        foundCustomer.PaymentType = customer.PaymentType;
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
                        response.Detail = "Customer not found"; 
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
                Customers customers = _db.Customer.FirstOrDefault(x => x.Id == id);
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
                Customers customers = _db.Customer.FirstOrDefault(x => x.Id == id);
                _db.Customer.Remove(customers);
                _db.SaveChanges();
                response.Detail = "Customer has been deleted";
                response.Success = true;
            }
            return response;
        }
    }
}
