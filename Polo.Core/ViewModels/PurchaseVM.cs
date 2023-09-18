using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Core.ViewModels
{
    public class PurchaseVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string InvoiceNo { get; set; }
        public float SubTotal { get; set; }
        public float Tax { get; set; }
        public float Total { get; set; }
    }
}
