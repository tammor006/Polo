using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Infrastructure.Entities
{
    public class ProductImages
    {
        [Key]
        public int Id { get; set; }
        public string Url { get; set; }
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public virtual  Product Product { get; set; }
        public  string Name { get; set; }
        public bool IsDeleted { get; set; }
        [NotMapped]
        public bool IsAdd { get; set; }
    }
}
