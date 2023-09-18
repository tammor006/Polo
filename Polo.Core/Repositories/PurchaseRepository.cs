using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Polo.Core.Repositories.Interfaces;
using Polo.Core.ViewModels;
using Polo.Infrastructure;
using Polo.Infrastructure.Entities;
using Polo.Infrastructure.Migrations;
using Polo.Infrastructure.Utilities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Core.Repositories
{
    public class PurchaseRepository:IPurchaseRepository
    {
        private PoloDBContext _db;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        public PurchaseRepository(PoloDBContext db, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _db = db;
            _userManager = userManager;
            _signInManager = signInManager;
        }
        public Response PreBindPurchase()
        {
            Response response = new Response();
            var supplier = _db.Supplier.Where(x => x.IsActive == true).Select(y => new { Id = y.Id, Name = y.Name }).ToList();
             var item = _db.ProductItem.Where(x => x.IsActive == true).Select(y => new { Name = y.Name }).ToList();
            var productItem = item.GroupBy(x => new { x.Name }).Select(r => new
            {

               Name=r.Key.Name

            }).ToList();
            response.data = new
            {
                Supplier = supplier,
                ProductItem = productItem
            };
            response.Success = true;
            return response;
        }
        public Response SavePurchase(Purchase purchase ,string userId)
        {
            Response response = new Response();

            try
            {
                if (!purchase.Id.IsNullOrZero())
                {
                    Purchase foundPurchase = _db.Purchase.Where(x => x.Id == purchase.Id).FirstOrDefault();
                    foundPurchase.SupplierId = purchase.SupplierId;
                    foundPurchase.InvoiceNo = purchase.InvoiceNo;
                    foundPurchase.Discount = purchase.Discount;
                    foundPurchase.SubTotal = purchase.SubTotal;
                    foundPurchase.Tax = purchase.Tax;
                    foundPurchase.Total = purchase.Total;
                    foundPurchase.UpdatedDate= DateTime.Now;
                    foundPurchase.UpdatedBy= userId.ToString();
                    _db.Entry(foundPurchase).State = EntityState.Modified;
                    List<PurchaseItem> itemsList = new List<PurchaseItem>();
                    List<PurchaseItem> editItemsList = new List<PurchaseItem>();
                    List<Stock> stocksList = new List<Stock>();
                    List<Stock> editStockList = new List<Stock>();
                    List<PurchaseItem> deleteItemsList = new List<PurchaseItem>();
                    if(purchase.DeleteIds !=null && purchase.DeleteIds.Count > 0)
                    {
                        foreach(var d in purchase.DeleteIds)
                        {
                            PurchaseItem deleteItem = _db.PurchaseItem.FirstOrDefault(x => x.Id == d);
                            if(deleteItem != null)
                            {
                                Stock foundStock = _db.Stock.FirstOrDefault(y => y.Name == deleteItem.Name);
                                if (foundStock != null)
                                {
                                    foundStock.Quantity = foundStock.Quantity - deleteItem.Qty;
                                    foundStock.LastUpdate = DateTime.Now;
                                    foundStock.UpdatedDate = DateTime.Now;
                                    foundStock.UpdatedBy = userId.ToString();
                                    editStockList.Add(foundStock);
                                }
                                    deleteItemsList.Add(deleteItem);

                            }
                        }
                        _db.PurchaseItem.RemoveRange(deleteItemsList);
                    }
                    if (purchase.PurchaseItem != null && purchase.PurchaseItem.Count > 0)
                    {
                        foreach(var x in purchase.PurchaseItem)
                        {
                            PurchaseItem foundItem= _db.PurchaseItem.FirstOrDefault(z => z.Id == x.Id);
                            if (foundItem == null)
                            { 
                                PurchaseItem createItem=new PurchaseItem()
                                {
                                PurchaseId = purchase.Id,
                                Name=x.Name,
                                Price = x.Price,
                                Qty = x.Qty,
                                MeasureQty=x.MeasureQty,
                                Total = x.Total,
                                IsActive=true,
                                CreatedDate = DateTime.Now,
                                CreatedBy = userId.ToString(),
                                };
                                Stock foundStock = _db.Stock.FirstOrDefault(y => y.Name == x.Name);
                                if (foundStock == null)
                                {
                                    Stock createStock = new Stock()
                                    {
                                        Name = x.Name,
                                        Quantity = x.Qty,
                                        MeasureQuantity = x.MeasureQty,
                                        IsActive = true,
                                        LastUpdate = DateTime.Now,
                                        CreatedDate = DateTime.Now,
                                        CreatedBy = userId.ToString(),
                                    };
                                    stocksList.Add(createStock);
                                }
                                else
                                {
                                    foundStock.Name = x.Name;
                                    foundStock.Quantity = foundStock.Quantity + x.Qty;
                                    foundStock.LastUpdate = DateTime.Now;
                                    foundStock.UpdatedDate = DateTime.Now;
                                    foundStock.UpdatedBy = userId.ToString();
                                    editStockList.Add(foundStock);
                                }
                                itemsList.Add(createItem);
                            }
                            else
                            {
                                Stock foundStock = _db.Stock.FirstOrDefault(y => y.Name == x.Name);
                                if (foundStock == null)
                                {
                                    Stock createStock = new Stock()
                                    {
                                        Name = x.Name,
                                        Quantity = x.Qty,
                                        MeasureQuantity = x.MeasureQty,
                                        IsActive = true,
                                        LastUpdate = DateTime.Now,
                                        CreatedDate = DateTime.Now,
                                        CreatedBy = userId.ToString(),
                                    };
                                    stocksList.Add(createStock);
                                }
                                else
                                {
                                    foundStock.Quantity = foundStock.Quantity - foundItem.Qty;
                                    foundStock.Quantity = foundStock.Quantity + x.Qty;
                                    foundStock.LastUpdate = DateTime.Now;
                                    foundStock.UpdatedDate = DateTime.Now;
                                    foundStock.UpdatedBy = userId.ToString();
                                    editStockList.Add(foundStock);
                                }
                                foundItem.PurchaseId = purchase.Id;
                                foundItem.Price = x.Price;
                                foundItem.Qty = x.Qty;
                                foundItem.Total = x.Total;
                                foundItem.UpdatedDate = DateTime.Now;
                                foundItem.UpdatedBy = userId.ToString();
                                editItemsList.Add(foundItem);
                            }

                        };
                        _db.PurchaseItem.AddRange(itemsList);
                        _db.PurchaseItem.UpdateRange(editItemsList);
                        _db.Stock.AddRange(stocksList);

                    }
                    _db.Stock.UpdateRange(editStockList);
                    _db.SaveChanges();
                    response.Success = true;
                    response.Detail = " Purchase is updated Successfully";
                }
                else
                {
                    purchase.CreatedDate = DateTime.Now;
                    purchase.CreatedBy = userId.ToString();
                    purchase.IsActive = true;
                    _db.Add(purchase);
                    if (purchase.PurchaseItem != null && purchase.PurchaseItem.Count > 0)
                    {
                        List<Stock> stocks = new List<Stock>();
                        _db.PurchaseItem.RemoveRange(_db.PurchaseItem.Where(z => z.PurchaseId == purchase.Id));
                        purchase.PurchaseItem.ToList().ForEach(x =>
                        {
                            x.PurchaseId = purchase.Id;
                            x.CreatedBy = userId.ToString();
                            x.IsActive = true;
                            x.CreatedDate = DateTime.Now;
                            
                            Stock foundStock=_db.Stock.FirstOrDefault(y=>y.Name==x.Name);
                            if(foundStock == null)
                            {
                                Stock createStock = new Stock()
                                {
                                Name = x.Name,
                                Quantity = x.Qty,
                                MeasureQuantity = x.MeasureQty,
                                IsActive = true,
                                LastUpdate = DateTime.Now,
                                CreatedDate = DateTime.Now,
                                CreatedBy = userId.ToString(),
                            };
                                stocks.Add(createStock);
                              
                            }
                            else
                            {
                                foundStock.Name = x.Name;
                                foundStock.Quantity = foundStock.Quantity + x.Qty;
                                foundStock.LastUpdate = DateTime.Now;
                                foundStock.UpdatedDate = DateTime.Now;
                                foundStock.UpdatedBy = userId.ToString();
                                _db.Entry(foundStock).State = EntityState.Modified;
                            }
                            
                        });
                        _db.PurchaseItem.AddRange(purchase.PurchaseItem);
                        _db.Stock.AddRange(stocks);

                    }
                    _db.SaveChanges();
                    response.Success = true;
                    response.Detail = "Purchase is added Successfully";
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Detail = Message.ErrorMessage;
            }
            return response;

        }
        public Response GetAllPurchase()
        {
            Response response = new Response();
            List<PurchaseVM> purchases = new List<PurchaseVM>();
            var purchaseList = _db.Purchase.Where(x => x.IsActive == true).ToList();
            foreach (var p in purchaseList)
            {
                PurchaseVM vM = new PurchaseVM();
                vM.Id = p.Id;
                vM.SubTotal = p.SubTotal;
                vM.Tax = p.Tax;
                vM.Total = p.Total;
                vM.InvoiceNo = p.InvoiceNo;
                vM.Name = _db.Supplier.FirstOrDefault(x => x.Id == p.SupplierId).Name;
                purchases.Add(vM);

            }
            response.data = purchases;

            response.Success = true;
            return response;
        }

        public Response GetPurchaseById(int id)
        {
            Response response = new Response();
            if (!id.IsNullOrZero())
            {
                Purchase purchase = _db.Purchase.FirstOrDefault(x => x.Id == id);
                purchase.PurchaseItem = _db.PurchaseItem.Where(x => x.PurchaseId == id).ToList();         
                response.data = new
                {
                    Purchase = purchase,
                   
                };
                response.Success = true;
            }
            return response;
        }
        public Response DeletePurchase(int id,string userId)
        {
            Response response = new Response();
            if (!id.IsNullOrZero())
            {
                List<Stock> stocks = new List<Stock>();
                Purchase purchase = _db.Purchase.FirstOrDefault(x => x.Id == id);
                List<PurchaseItem> items = _db.PurchaseItem.Where(x => x.PurchaseId == id).ToList();
                if (items != null)
                {
                    foreach(var x in items)
                    {
                        Stock foundStock = _db.Stock.FirstOrDefault(y => y.Name == x.Name);
                        if(foundStock != null)
                        {
                            foundStock.Quantity = foundStock.Quantity - x.Qty;
                            foundStock.LastUpdate = DateTime.Now;
                            foundStock.UpdatedDate = DateTime.Now;
                            foundStock.UpdatedBy = userId.ToString();
                            stocks.Add(foundStock);
                        }
                    }
                    _db.Stock.UpdateRange(stocks);
                    _db.PurchaseItem.RemoveRange(items);
                }
                _db.Purchase.Remove(purchase);
                _db.SaveChanges();
                response.Detail = "Purchase has been deleted";
                response.Success = true;
            }
            return response;
        }
    }
}
