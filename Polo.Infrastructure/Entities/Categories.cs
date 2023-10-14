using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Infrastructure.Entities
{
	public partial class Categories
	{
		[Key]
		public int Id { get; set; }
		public string? Name { get; set; }
		public Nullable<bool> IsActive { get; set; }
		public string? CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		public string? UpdatedBy { get; set; }
		public DateTime UpdatedDate { get; set;}
		[NotMapped]
        public Nullable<long> RowNo { get; set; }
        [NotMapped]
        public Nullable<int> Total { get; set; }
        [NotMapped]
        public string? Search { get; set; }

    }
}
