using System.ComponentModel.DataAnnotations;

namespace EmployeePayroll.Model
{
    public class TimeEntry
    {
        [Key]
        public int Id { get; set; }

        public int EmployeeId { get; set; }
        [Required]
        public Employee Employee { get; set; }
        [Required]
        public DateTime PunchInTime { get; set; }

    }
}
