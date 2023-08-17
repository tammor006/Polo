using Azure;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Polo.Infrastructure.Utilities
{
    public static class Extension
    {
        public static T deserialize<T>(this string json)
        {
            return JsonConvert.DeserializeObject<T>(json);
        }
        public static void createDirectory(this string directoryPath)
        {
            if (!Directory.Exists(directoryPath))
                Directory.CreateDirectory(directoryPath);
        }
    //    public static IActionResult responseFormat(this Response response, Controller controller)
    //        => controller.StatusCode((int)((HttpStatusCode)response.httpCode), response);
    //}
    }
}
