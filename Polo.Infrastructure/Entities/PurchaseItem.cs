using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Infrastructure.Entities
{
    public class PurchaseItem
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Purchase")]
        public int PurchaseId { get; set; }
        public virtual Purchase Purchase { get; set; }
        public required string Name { get; set; }
        public required float Qty { get; set; }
        public required string MeasureQty { get; set; }
        public required float Price { get; set; }
        public required float Total { get; set; }
        public bool IsActive { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
