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
    public class SelectList
    {
        public string Id { get; set; }
        public string Code { get; set; }
        public string Type { get; set; }
        public bool IsShow { get; set; }
        public int SortOrder { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string StrScheduleDate { get; set; }
        public string StrStartTime { get; set; }
        public string StrEndTime { get; set; }
        public string Comments { get; set; }
    }
}
