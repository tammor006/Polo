using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Infrastructure.Entities
{
	public class Categories
	{
		[Key]
		public int Id { get; set; }
		public string Name { get; set; }
		public Nullable<bool> IsActive { get; set; }
		public string? CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		public string? UpdatedBy { get; set; }
		public DateTime UpdatedDate { get; set;}

	}
}
