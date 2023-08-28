using System.Net;
using Polo.Infrastructure.Utilities;
using Polo.Core.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Polo.Core.Repositories;
using Polo.Infrastructure.Entities;
using Polo.Infrastructure.DTO;
using Polo.Core.Enum;

namespace Polo.Controllers
{
    public class CustomerController : Controller
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly UserManager<IdentityUser> _userManager;
        public CustomerController(UserManager<IdentityUser> userManager, ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
            _userManager = userManager;
        }

        public IActionResult Index()
        {
            return View();
        }
        public JsonResult GetAllCustomers()
        {
            Response response = new Response();
            try
            {
                var customers = _customerRepository.GetAllCustomers();

                var customerDTOs = new List<CustomerDTO>();
                foreach (var customer in customers)
                {
                    var paymentType = "";
                    var orderType = customer.OrderType != null ? Enum.GetName(typeof(OrderType), customer.OrderType) : null;
                    var deliveryType = customer.DeliveryType != null ? Enum.GetName(typeof(DeliveryType), customer.DeliveryType) : null;
                    var address = $"{customer.Street}, {customer.City}, {customer.Address}";
                    var availableTime = customer.AvailableTime != null ? customer.AvailableTime : null ;

                    if (orderType == OrderType.Pickup.ToString())
                    {
                        paymentType = "Card at Pickup Counter";
                    }
                    else if (orderType == OrderType.Delivery.ToString() && customer.PaymentType == (int)PaymentType.Card)
                    {
                        paymentType = "Card to Delivery Person";
                    }
                    else
                    {
                        paymentType = Enum.GetName(typeof(PaymentType), customer.PaymentType);
                    }

                    var customerDTO = new CustomerDTO
                    {
                        Id = customer.Id,
                        Name = $"{customer.FirstName} {customer.LastName}",
                        Address = address,
                        Number = customer.Number,
                        Email = customer.Email,
                        OrderType = orderType,
                        DeliveryType = deliveryType,
                        AvailableTime = availableTime,
                        PaymentType = paymentType,
                    };

                    customerDTOs.Add(customerDTO);
                }

                response.Success = true;
                response.data = customerDTOs;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }

            return Json(response);
        }

        public JsonResult SaveCustomer(Customers customer)
        {
            Response response = new Response();

            try
            {
                if (User.Identity.IsAuthenticated)
                {
                    string userId = _userManager.GetUserId(User);
                    response = _customerRepository.SaveCustomer(customer, userId);
                }
                else
                {
                    response.Success = false;
                    response.Detail = "User not Authenticated";
                    return Json(response);
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return Json(response);
        }

        public JsonResult GetCustomerById(int id)
        {
            Response response = new Response();
            try
            {
                response = _customerRepository.GetCustomerById(id);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return Json(response);
        }

        public JsonResult DeleteCustomer(int id)
        {
            Response response = new Response();
            try
            {
                response = _customerRepository.DeleteCustomer(id);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return Json(response);
        }
    }

}
