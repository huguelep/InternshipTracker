using Microsoft.EntityFrameworkCore;

namespace JobApplicationTracker.Models
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
        {

        }

        public DbSet<Application> Applications { get; set; }
    }
}
