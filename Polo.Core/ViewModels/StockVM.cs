﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Core.ViewModels
{
    public class StockVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Quantity { get; set; }
        public string StrLastUpdated { get; set; }
        public string MeasureQuantity { get; set; }
    }
}
