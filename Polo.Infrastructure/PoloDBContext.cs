using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polo.Infrastructure
{
	public class PoloDBContext:IdentityDbContext<IdentityUser, IdentityRole, string>
	{
		public PoloDBContext(DbContextOptions<PoloDBContext> options) : base(options)
		{
		}
	}
}
