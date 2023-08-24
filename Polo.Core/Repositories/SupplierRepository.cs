using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Polo.Core.Repositories.Interfaces;
using Polo.Infrastructure;
using Polo.Infrastructure.Entities;
using Polo.Infrastructure.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Core.Repositories
{
	public class SupplierRepository : ISupplierRepository
	{
        private PoloDBContext _db;
        public SupplierRepository(PoloDBContext db)
        {
            _db = db;
        }
        public Response GetAllSupplier()
        {
            Response response = new Response();
            List<Supplier> suppliers = new List<Supplier>();
            suppliers = _db.Supplier.ToList(); ;
            response.data = suppliers;
            return response;
        }
        public Response SaveSupplier(Supplier supplier, string userId)
        {
            Response response = new Response();
            try
            {
                if (!supplier.Id.IsNullOrZero())
                {
                    Supplier foundsupplier = _db.Supplier.Where(x => x.Id == supplier.Id).FirstOrDefault();
                    foundsupplier.Name = supplier.Name;
                    foundsupplier.IsActive = supplier.IsActive;
                    foundsupplier.UpdatedDate = DateTime.Now;
                    foundsupplier.UpdatedBy = userId.ToString();
                    _db.Entry(foundsupplier).State = EntityState.Modified;
                    _db.SaveChanges();
                    response.Success = true;
                    response.Detail = " Supplier is updated Successfully";
                }
                else
                {
                    supplier.CreatedDate = DateTime.Now;
                    supplier.CreatedBy = userId.ToString();
                    _db.Add(supplier);
                    _db.SaveChanges();
                    response.Success = true;
                    response.Detail = " Supplier is added Successfully";
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return response;
        }
        public Response GetSupplierById(int id)
        {
            Response response = new Response();
            if (!id.IsNullOrZero())
            {
                Supplier supplier = _db.Supplier.FirstOrDefault(x => x.Id == id);
                response.data = new
                {
                    Supplier = supplier,
                };
                response.Success = true;
            }
            return response;
        }
        public Response DeleteSupplier(int id)
        {
            Response response = new Response();
            if (!id.IsNullOrZero())
            {
                Supplier suplier = _db.Supplier.FirstOrDefault(x => x.Id == id);
                _db.Supplier.Remove(suplier);
                _db.SaveChanges();
                response.Detail = "Supplier has been deleted";
                response.Success = true;
            }
            return response;
        }
    }
}
