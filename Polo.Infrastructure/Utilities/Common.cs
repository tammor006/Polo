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
        public HttpStatusCode httpCode { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        [Newtonsoft.Json.JsonIgnore]
        public bool isValidated { get { return this.httpCode == HttpStatusCode.OK ? true : false; } }
    }
    public class Message
    {
        public static string ErrorMessage = "Oops, we hit a snag!";
        public static string SuccessMessage = "Request processed successfully";
        public bool Success = true;
        public static string AccountCreationMessage = "Registered successfully";
        public string Detail = "Request processed successfully";
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
    public class Paging
    {
        public int Draw { get; set; }
        public int DisplayStart { get; set; }
        public int DisplayLength { get; set; }
        public int SortColumn { get; set; }
        public string? SortOrder { get; set; }
        public string? Search { get; set; }
        public string? Description { get; set; }
        public string? SearchJson { get; set; }
    }
    public class CallBackData
    {
        public Message msg = new Message();

        public JqueryDataTable Data = new JqueryDataTable();
    }
    public class JqueryDataTable
    {
        public int draw { get; set; }
        public int recordsTotal { get; set; }
        public Nullable<int> recordsFiltered { get; set; }
        public dynamic data { get; set; }
    }
}
