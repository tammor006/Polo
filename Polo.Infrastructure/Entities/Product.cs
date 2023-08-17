using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Infrastructure.Entities
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public int BarCode { get; set; }
        public  string Name { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public Categories Categories { get; set; }
        public string Image { get; set; }
        public double Price { get; set; }
        public bool IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
