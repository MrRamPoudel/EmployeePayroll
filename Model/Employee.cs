using System.ComponentModel.DataAnnotations;

namespace EmployeePayroll.Model
{
    public class Employee
    {
        [Key]
        public int id { get; set; }

        public string username { get;set; }
        public string password { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }

        public string city { get; set; }
        public string state { get; set; }
        public string zipcode { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }
    }
}
