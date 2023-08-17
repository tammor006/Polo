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
        public HttpStatusCode httpCode { get; set; }
        public string message { get; set; }
        public dynamic data { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        [Newtonsoft.Json.JsonIgnore]
        public bool isValidated { get { return this.httpCode == HttpStatusCode.OK ? true : false; } }
    }
    public class Message
    {
        public static string errorMessage = "Oops, we hit a snag!";
        public static string successMessage = "Request processed successfully";
        public static string accountCreationMessage = "Registered successfully";
    }
}
