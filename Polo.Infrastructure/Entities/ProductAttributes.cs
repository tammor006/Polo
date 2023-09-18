using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Infrastructure.Entities
{
    public class ProductAttributes
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
        public int ParentProductId { get; set; }
        public string? Category { get; set; }
        public bool IsRequired { get; set; }
        public float Price { get; set; }
        [NotMapped]
        public string AttrText { get; set; }
        [NotMapped]
        public string IsRequiredText { get; set; }
    }
}
