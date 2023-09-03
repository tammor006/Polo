using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Infrastructure.Entities
{
    public class SaleItemAtrributes
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public float Price { get; set; }
        [ForeignKey("SaleOrderItem")]
        public int SaleOrderItemId { get; set; }
        public virtual SaleOrderItem SaleOrderItem { get; set; }
        public int ProductAttributesId { get; set; }
        public string? Category { get; set; }
    }
}
