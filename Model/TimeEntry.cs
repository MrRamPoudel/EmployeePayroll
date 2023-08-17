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

        private DateTime _punchInTime;

        [Required]
        public DateTime PunchInTime
        {
            get => _punchInTime; 
            //always save in Universal time
            set => _punchInTime = value.Kind == DateTimeKind.Utc? value: value.ToUniversalTime();
        }

    }
}
