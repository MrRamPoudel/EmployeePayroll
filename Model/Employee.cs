using System.ComponentModel.DataAnnotations;

namespace EmployeePayroll.Model
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required,EmailAddress]
        public string Email { get; set; }
        public string Address1 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zipcode { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
        public ICollection<Statement> Statements { get; set; } = new List<Statement>();
        public ICollection<TimeEntry> TimeEntries { get; set; } = new List<TimeEntry>();
    }
}
