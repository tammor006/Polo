using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Infrastructure.Entities
{
    public class Stock
    {
        [Key]
        public int Id { get; set; }
        public required int Quantity { get; set; }
        [ForeignKey("Product")]
        public required int ProductId { get; set; }
        public virtual Product Product { get; set; }
        public DateTime LastUpdate { get; set; }
        public bool IsActive { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        [NotMapped]
        public string? StrLastUpdate { get; set; }
    }
}
