﻿using Microsoft.EntityFrameworkCore;
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

        public Response GetCustomerById(double number)
        {
            Response response = new Response();
            var cust = _db.Customer.FirstOrDefault(x => x.Number == number.ToString());
            CustomerVM customer = new CustomerVM();
            customer.CustId = cust.Id;
            customer.Address = cust.Address;
            customer.Name = cust.FirstName + " " + cust.LastName;
            customer.Number = cust.Number;
            customer.Email = cust.Email;
            response.Success = true;
            response.data = customer;
            return response;
        }
        public Response SaveOrder(SaleOrder orders, string userId)
        {
            Response response = new Response();
            try
            {
                orders.CreatedDate = DateTime.Now;
                orders.CreatedBy = userId.ToString();
                _db.Add(orders);
                if (orders.SaleOrderItem != null && orders.SaleOrderItem.Count > 0)
                {
                    orders.SaleOrderItem.ToList().ForEach(x =>
                    {
                        x.SaleOrderId = orders.Id;
                        x.InvoiceNumber = orders.InvoiceNumber;
                    });
                    _db.SaleOrderItem.AddRange(orders.SaleOrderItem);
                }



                _db.SaveChanges();
                response.Success = true;
                response.data = new
                {
                    Customer = _db.Customer.FirstOrDefault(x => x.Id == orders.CustomerId),
                    SaleOrder = orders,
                   
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
