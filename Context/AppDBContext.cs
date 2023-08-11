using EmployeePayroll.Model;
using Microsoft.EntityFrameworkCore;

namespace EmployeePayroll.Context
{
    public class AppDBContext:DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options):base(options)
        {  
        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Statement> Statements { get; set; }

        public DbSet<TimeEntry> TimeEntries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.User)
                .WithOne(u => u.Employee)
                .HasForeignKey<Employee>(e => e.UserId)
                .IsRequired(false);

            modelBuilder.Entity<Statement>()
                .HasOne(s => s.Employee)
                .WithMany(e => e.Statements)
                .HasForeignKey(s => s.EmployeeId);
        }
    }
}
