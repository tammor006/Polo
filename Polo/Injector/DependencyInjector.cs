using Microsoft.Extensions.DependencyInjection;
using System;
using Polo.Core.Repositories;
using Polo.Core.Repositories.Interfaces;

namespace Polo.Injector
{

    public class DependencyInjector
    {
        private static IServiceProvider ServiceProvider { get; set; }

        private static IServiceCollection Services { get; set; }

        public static T GetService<T>()
        {
            Services = Services ?? RegisterServices();
            ServiceProvider = ServiceProvider ?? Services.BuildServiceProvider();
            return ServiceProvider.GetService<T>();
        }

        public static IServiceCollection RegisterServices()
        {
            return RegisterServices(new ServiceCollection());
        }

        public static IServiceCollection RegisterServices(IServiceCollection services)
        {
            Services = services;
            Services.AddScoped<ICategoriesRepository,CategoriesRepository>();
            Services.AddScoped<IProductRepository, ProductRepository>();
            Services.AddScoped<ISupplierRepository, SupplierRepository>();
            return Services;
        }
    }
}

