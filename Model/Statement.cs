using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeePayroll.Model
{
    public class Statement
    {
        [Key]
        [DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)]
        public int Id {get; set;}

        public float HoursWOrked { get; set; }
        public float PayRate { get; set; }

    }
}
