using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Infrastructure.Entities
{
    public class SaleOrder
    {
        [Key]
        public int Id { get; set; }
        public int InvoiceNumber { get; set; }
        [ForeignKey("Customer")]
        public int CustomerId { get; set; }
        public virtual Customer Customer { get; set; }
        public float SubTotal { get; set; }
        public float Tax { get; set; }
        public float Discount { get; set; }
        public float Total { get; set; }
        public bool IsDeleted { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string? Mode { get; set; }
        public virtual ICollection<SaleOrderItem> SaleOrderItem { get; set; }
        public string DeliveryType { get; set; }
        public DateTime? AvailableTime { get; set; }
        public string PaymentType { get; set; }
        [NotMapped]
        public string StrAvailableTime { get; set; }
       
    }
}
