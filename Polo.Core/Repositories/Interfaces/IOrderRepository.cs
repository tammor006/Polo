﻿using Polo.Infrastructure.Entities;
using Polo.Infrastructure.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Core.Repositories.Interfaces
{
    public interface IOrderRepository
    {
        Response PreBind();
        Response SaveOrder(SaleOrder orders, string userId);
        Response GetCustomerById(string number);
    }
}
