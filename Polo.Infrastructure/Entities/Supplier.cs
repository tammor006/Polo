using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Infrastructure.Entities
{
    public class Supplier
    {
        [Key]
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string FatherName { get; set; }
        public required string  CNIC { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public string? Number { get; set; }
        public string? Email { get; set; }
        public string? CompanyName { get; set; }
        public string? CompanyNumber{get;set;}
        public string? Address { get; set; }
        public bool IsActive { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }

    }
}
