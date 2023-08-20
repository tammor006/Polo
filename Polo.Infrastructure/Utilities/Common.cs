using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Infrastructure.Utilities
{
    public class Response
    {
        public static string ErrorMessage = "Something went wrong. Please try again";
        public bool Success { get; set;}
        public static string StatusLogged = "Your status has been logged";
        public bool Info { get; set; }
        public bool Warning { get; set; }
        public string Detail { get; set; }
        public static string DeleteError = "009 Unable to processe this request.";
        public dynamic data { get; set; }
    }
    public class Message
    {
        public static string ErrorMessage = "Oops, we hit a snag!";
        public static string SuccessMessage = "Request processed successfully";
        public static string AccountCreationMessage = "Registered successfully";
    }
}
