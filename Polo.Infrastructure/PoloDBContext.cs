using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.CodeAnalysis.Elfie.Model.Structures;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGeneration.EntityFrameworkCore;
using Polo.Infrastructure.DTO;
using Polo.Infrastructure.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Infrastructure
{
	public class PoloDBContext : IdentityDbContext<IdentityUser, IdentityRole, string>
	{
		public PoloDBContext(DbContextOptions<PoloDBContext> options) : base(options)
		{
		}
		public DbSet<Categories> Categories { get; set; }
		public DbSet<Product> Product { get; set; }
		public DbSet<Supplier> Supplier { get; set; }
		public DbSet<Stock> Stock {get;set;}
		public DbSet<Customer> Customer {get;set;}
		public DbSet<SaleOrder> SaleOrder { get; set; }
		public DbSet<SaleOrderItem> SaleOrderItem { get; set; }
		public DbSet<ProductAttributes> ProductAttributes { get; set; }
        public DbSet<SaleItemAtrributes> SaleItemAtrributes { get; set; }
        public DbSet<ProductItem> ProductItem { get; set; }
        public DbSet<Purchase> Purchase { get; set; }
        public DbSet<PurchaseItem> PurchaseItem { get; set; }
       

        //public List<Categories> FetchCategories(Nullable<int> displayLength, Nullable<int> displayStart, Nullable<int> sortCol, string sortOrder, string search)
        //{
            
        //    var displayLengthParameter = new SqlParameter
        //    {
        //        ParameterName = "@DisplayLength",
        //        Value = displayLength
        //    };
        //    var displayStartParameter = new SqlParameter
        //    {
        //        ParameterName = "@DisplayStart",
        //        Value = displayStart
        //    };
        //    var sortColParameter = new SqlParameter
        //    {
        //        ParameterName = "@SortCol",
        //        Value = sortCol
        //    };
        //    var sortOrderParameter = new SqlParameter
        //    {
        //        ParameterName = "@SortOrder",
        //        Value = sortOrder
        //    };
        //    var searchParameter = new SqlParameter
        //    {
        //        ParameterName = "@Search",
        //        Value = search
        //    };

            
        //    return this.Database.SqlQuery<Categories>("EXEC [dbo].[sp_FetchCategories] @DisplayLength,@DisplayStart,@SortCol,@SortOrder,@Search", displayLengthParameter, displayStartParameter, sortColParameter, sortOrderParameter, searchParameter).ToList();
           
        //}

    }
}
