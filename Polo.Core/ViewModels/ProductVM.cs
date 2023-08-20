using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Core.ViewModels
{
    public class ProductVM
    {
    public int Id { get; set; }
    public int BarCode { get; set; }
    public  string Name { get; set; }
    public string CategoryName { get; set; }
    public double Price { get; set; }
    
    }
}
