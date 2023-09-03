using Polo.Infrastructure.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Core.ViewModels
{
    public class ProductAttributesVM
    {
        public string Category { get; set; }
        public List<ProductAttributes> attributes { get; set; }
    }
}
