using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.FileProviders;
using Mono.TextTemplating;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
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
        public static bool IsNullOrZero(this int? value)
        {
            return (value ?? 0) == 0;
        }
        public static bool IsNullOrZero(this int value)
        {
            return value == 0;
        }
        public static bool IsNullOrZero(this long value)
        {
            return value == 0;
        }
        public static bool IsNullOrZero(this double value)
        {
            return value == 0;
        }
        public static bool IsNullOrZero(this long? value)
        {
            return value == 0;
        }
        public static bool IsNullOrZero(this Guid value)
        {
            return value == Guid.Empty;
        }
        public static int NullToZeroReplace(this int? value)
        {
            return (value != null) ? (int)value : 0;
        }
        public static double NullToZeroReplace(this object value)
        {
            //double result = String.IsNullOrEmpty(Convert.ToString(value)) ? 0 : Convert.ToDouble(value);
            //if (!Double.IsNaN(result) && !Double.IsInfinity(result))
            //    return Math.Round(Convert.ToDouble(result), 2);
            //else
            //    return 0;

            return String.IsNullOrEmpty(Convert.ToString(value)) ? 0 : Convert.ToDouble(value);
        }
        public static double NullToZeroReplace(this string value)
        {
            if (!ReferenceEquals(value, null) && value.Contains(","))
                value = value.Replace(",", "");

            return String.IsNullOrEmpty(Convert.ToString(value)) ? 0 : Convert.ToDouble(value);
        }
        public static string NullToEmptyReplace(this string value)
        {
            return String.IsNullOrEmpty(Convert.ToString(value)) ? string.Empty : value;
        }
        public static string ToString(this object value)
        {
            return Convert.ToString(value);
        }
        public static int? ZeroToNullReplace(this int? value)
        {
            return (value != 0) ? value : null;
        }
        public static int? ZeroToNullReplace(this int value)
        {
            if (value != 0)
                return value;
            else
                return null;
        }
        public static double? ZeroToNullReplace(this double? value)
        {
            return (value != 0) ? value : null;
        }
        //    public static IActionResult responseFormat(this Response response, Controller controller)
        //        => controller.StatusCode((int)((HttpStatusCode)response.httpCode), response);
        //}
    }
}
