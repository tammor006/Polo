using Microsoft.CodeAnalysis.CSharp.Syntax;
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
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web.WebPages;

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
                List<Stock> stocks = new List<Stock>();
                orders.CreatedDate = DateTime.Now;
                orders.CreatedBy = userId.ToString();
                int time=0;
                if (orders.DeliveryType == "As_Soon_As")
                {
                    orders.AvailableTime = orders.CreatedDate.AddMinutes(40);
                }
                else
                {
                    orders.AvailableTime =Convert.ToDateTime(orders.StrAvailableTime);
                    TimeSpan? dateDiff = orders.AvailableTime-orders.CreatedDate;
                     time = dateDiff.Value.Minutes;
                }
                _db.Add(orders);
                if (orders.SaleOrderItem != null && orders.SaleOrderItem.Count > 0)
                {
                    orders.SaleOrderItem.ToList().ForEach(x =>
                    {
                        x.SaleOrderId = orders.Id;
                        x.InvoiceNumber = orders.InvoiceNumber;
                        x.Product = _db.Product.FirstOrDefault(y => y.Id == x.ProductId);
                        List<ProductItem> productItems = _db.ProductItem.Where(p => p.ProductId == x.ProductId).ToList();
                        if(productItems !=null && productItems.Count > 0) 
                        {
                            foreach (var p in productItems)
                            {
                                Stock foundStock = _db.Stock.FirstOrDefault(x => x.Name == p.Name);
                                if (foundStock == null)
                                {
                                    response.Success = false;
                                    response.Detail = p.Name + " not exist in stock";
                                    break;
                                }
                                else
                                {
                                    if (foundStock.MeasureQuantity == "Kg" && foundStock.Quantity != 0)
                                    {
                                        float TotalQty = foundStock.Quantity * 1000;
                                        foundStock.Quantity = (TotalQty - p.Qty) / 1000;
                                        foundStock.LastUpdate = DateTime.Now;
                                        foundStock.UpdatedDate = DateTime.Now;
                                        foundStock.UpdatedBy = userId.ToString();
                                        stocks.Add(foundStock);
                                    }
                                    else if (foundStock.MeasureQuantity == "Number" && foundStock.Quantity != 0)
                                    {
                                        foundStock.Quantity = foundStock.Quantity - p.Qty;
                                        foundStock.LastUpdate = DateTime.Now;
                                        foundStock.UpdatedDate = DateTime.Now;
                                        foundStock.UpdatedBy = userId.ToString();
                                        stocks.Add(foundStock);
                                    }
                                    else
                                    {
                                        response.Success = false;
                                        response.Detail = foundStock.Name + " stock is zero";
                                        break;
                                    }
                                }
                            }
                        }
                        else
                        {
                            response.Success = false;
                            response.Detail = "Stock is not found";
                            return;
                        }
               
                        if (x.SaleItemAtrributes != null)
                        {
                            x.SaleItemAtrributes.ToList().ForEach(y =>
                           {
                               y.SaleOrderItemId = x.Id;
                               List<ProductItem> productItems = _db.ProductItem.Where(z => z.ProductId == y.ParentProductId).ToList();
                               foreach (var p in productItems)
                               {
                                   Stock foundStock = _db.Stock.FirstOrDefault(x => x.Name == p.Name);
                                   if (foundStock == null)
                                   {
                                       response.Success = false;
                                       response.Detail = p.Name + " not exist in stock";
                                       break;
                                   }
                                   else
                                   {
                                       if (foundStock.MeasureQuantity == "Kg" && foundStock.Quantity != 0)
                                       {
                                           float TotalQty = foundStock.Quantity * 1000;
                                           foundStock.Quantity = (TotalQty - p.Qty)/100;
                                           foundStock.LastUpdate = DateTime.Now;
                                           foundStock.UpdatedDate = DateTime.Now;
                                           foundStock.UpdatedBy = userId.ToString();
                                           stocks.Add(foundStock);
                                       }
                                       else if (foundStock.MeasureQuantity == "Number" && foundStock.Quantity != 0)
                                       {
                                           foundStock.Quantity = foundStock.Quantity - p.Qty;
                                           foundStock.LastUpdate = DateTime.Now;
                                           foundStock.UpdatedDate = DateTime.Now;
                                           foundStock.UpdatedBy = userId.ToString();
                                           stocks.Add(foundStock);
                                       }
                                       else
                                       {
                                           response.Success = false;
                                           response.Detail = foundStock.Name + " stock is zero";
                                           break;
                                       }
                                   }
                               }
                           });
                            orderList.AddRange(x.SaleItemAtrributes);
                        }
                        _db.Add(x);
                        if (x.SaleItemAtrributes != null)
                            _db.SaleItemAtrributes.AddRange(x.SaleItemAtrributes);
                    });     
                }

                _db.SaveChanges();
                response.Success = true;

                response.data = new
                {
                    Customer = _db.Customer.FirstOrDefault(x => x.Id == orders.CustomerId),
                    Orders = orders,
                    strAvailableTime = orders.AvailableTime.ToString("dd MMM, H:mm"),
                    strCreatedDate = orders.CreatedDate.ToString("dd MMM, H:mm"),
                    orderTime= time,

                };
                
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
         return response;
        }
        private void ManageException(Exception ex)
        {
            //log or whatever
            throw new Exception("See inner exception", ex);
        }
    }
}
