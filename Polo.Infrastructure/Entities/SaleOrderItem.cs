using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Infrastructure.Entities
{
    public class SaleOrderItem
    {
        public int Id { get; set; }
        public int InvoiceNumber { get; set; }
        [ForeignKey("SaleOrder")]
        public int SaleOrderId { get; set; }
        public virtual SaleOrder SaleOrder { get; set; }
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
        public float Quantity { get; set; }
        public float Total { get; set; }
    }
}
