using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Infrastructure.Entities
{
    public class Purchase
    {
        [Key]
        public int Id { get; set; }
        public required string InvoiceNo { get; set; }
        [ForeignKey("Supplier")]
        public int SupplierId { get; set; }
        public virtual Supplier Supplier { get; set; }
        public float SubTotal { get; set; }
        public float Tax { get; set; }
        public float Discount { get; set; }
        public required float Total { get; set; }
        public bool IsActive { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public virtual ICollection<PurchaseItem> PurchaseItem { get; set; }
        [NotMapped]
        public List<int> DeleteIds { get; set; }

    }
}
