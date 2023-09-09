using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        public required string Name { get; set; }
        public string Description { get; set; }
        [ForeignKey("Categories")]
        public int CategoryId { get; set; }
        public virtual Categories Categories { get; set; }
        public float Price { get; set; }
        public bool IsActive { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string? ImageUrl { get; set; }
        public string? ImageName { get; set; }
        public virtual ICollection<ProductAttributes> ProductAttributes { get; set;}
        
    }
}
