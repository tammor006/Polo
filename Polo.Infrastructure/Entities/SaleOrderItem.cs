using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Infrastructure.Entities
{
    public class SaleOrderItem
    {
        [Key]
        public int Id { get; set; }
        public int InvoiceNumber { get; set; }
        [ForeignKey("SaleOrder")]
        public int SaleOrderId { get; set; }
        public  virtual SaleOrder SaleOrder { get; set; }
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public virtual required Product Product { get; set; }
        public float Quantity { get; set; }
        public float Total { get; set; }
        public bool ISDeleted { get; set; }
        public virtual ICollection<SaleItemAtrributes> SaleItemAtrributes { get; set; }

    }
}
