using Polo.Infrastructure.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Infrastructure.DTO
{
    public class CategoriesPaging
    {
        public Nullable<long> RowNo { get; set; }
        public Nullable<int> Total { get; set; }
        public int Id { get; set; }
        public string? Name { get; set; }
        public Nullable<bool> IsActive { get; set; }
    }
}
