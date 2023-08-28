using System.Net;
using Polo.Infrastructure.Utilities;
using Polo.Core.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Polo.Core.Repositories;
using Polo.Infrastructure.Entities;
using Polo.Infrastructure.DTO;
using Polo.Core.Enum;
using Microsoft.AspNetCore.Authorization;

namespace Polo.Controllers
{
    [Authorize]

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
                    var paymentTypeEnum = Enum.GetName(typeof(PaymentType),customer.PaymentType);
                    var customerDTO = new CustomerDTO
                    {
                        Id = customer.Id,
                        Name = $"{customer.FirstName}" + " " + $"{customer.LastName}",
                        Address = $"{customer.Street}" + " " + $"{customer.City}" + " " +$"{customer.Address}",
                        Number = customer.Number,
                        Email = customer.Email,
                        PaymentType = paymentTypeEnum,
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


        public JsonResult SaveCustomer(Customer customer)
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
