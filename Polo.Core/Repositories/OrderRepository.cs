using Microsoft.EntityFrameworkCore;
using Polo.Core.Repositories.Interfaces;
using Polo.Core.ViewModels;
using Polo.Infrastructure;
using Polo.Infrastructure.Entities;
using Polo.Infrastructure.Migrations;
using Polo.Infrastructure.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Core.Repositories
{
    public class OrderRepository:IOrderRepository
    {
        private PoloDBContext _db;
        public OrderRepository(PoloDBContext db)
        {
            _db = db;
        }
        public Response PreBind()
        {
            Response response = new Response();
            List<OrderVM> orderVM = new List< OrderVM>();
            var Categories = _db.Categories.Where(x => x.IsActive==true).ToList();
            foreach(var cat in Categories)
            {
                OrderVM vM = new OrderVM();
                vM.Category = cat.Name;
                vM.Product = _db.Product.Where(x => x.CategoryId == cat.Id).ToList();
                orderVM.Add(vM);
            }
            response.data = new
            {
                Product = orderVM
            };
            response.Success = true;
            return response;
        }

        public Response GetCustomerById(string number)
        {
            Response response = new Response();
            var cust = _db.Customer.FirstOrDefault(x => x.Number ==number);
            CustomerVM customer = new CustomerVM();
            customer.CustId = cust.Id;
            customer.Address = cust.Address;
            customer.Name = cust.FirstName + " " + cust.LastName;
            customer.Number = cust.Number;
            customer.Email = cust.Email;
            customer.Street = cust.Street;
            customer.City = cust.City;
            response.Success = true;
            response.data = customer;
            return response;
        }
        public Response SaveOrder(SaleOrder orders, string userId)
        {
            Response response = new Response();
            try
            {
                var orderList = new List<SaleItemAtrributes>();
                orders.CreatedDate = DateTime.Now;
                orders.CreatedBy = userId.ToString();
                orders.AvailableTime =Convert.ToDateTime(orders.StrAvailableTime).ToLocalTime();
                _db.Add(orders);
                if (orders.SaleOrderItem != null && orders.SaleOrderItem.Count > 0)
                {
                    orders.SaleOrderItem.ToList().ForEach(x =>
                    {
                        x.SaleOrderId = orders.Id;
                        x.InvoiceNumber = orders.InvoiceNumber;
                        x.Product = _db.Product.FirstOrDefault(y => y.Id == x.ProductId);
                         x.SaleItemAtrributes.ToList().ForEach(y =>
                        {
                            y.SaleOrderItemId = x.Id;
                        });
                        orderList.AddRange(x.SaleItemAtrributes);
                        _db.Add(x);
                        _db.SaleItemAtrributes.AddRange(x.SaleItemAtrributes);
                    });     
                }

                _db.SaveChanges();
                response.Success = true;

                response.data = new
                {
                    Customer = _db.Customer.FirstOrDefault(x => x.Id == orders.CustomerId),
                    Orders = orders,
                    strCreatedDate = orders.CreatedDate.ToString("dd MMM, H:mm"),
                    strAvailableTime=orders.AvailableTime.ToString("dd MMM, H:mm"),

                };
                
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return response;
        }
    }
}
