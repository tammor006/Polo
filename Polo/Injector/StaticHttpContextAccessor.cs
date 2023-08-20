namespace Polo.Injector
{
    public static class StaticHttpContextAccessor
    {
        private static IServiceProvider _serviceProvider;

        public static void Initialize(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public static HttpContext HttpContext
        {
            get
            {
                if (_serviceProvider == null)
                {
                    throw new InvalidOperationException("Service provider not initialized.");
                }

                var httpContextAccessor = _serviceProvider.GetRequiredService<IHttpContextAccessor>();
                return httpContextAccessor.HttpContext;
            }
        }
    }
}
