using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeePayroll.Migrations
{
    /// <inheritdoc />
    public partial class fixColumnTypo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "HoursWOrked",
                table: "Statements",
                newName: "HoursWorked");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "HoursWorked",
                table: "Statements",
                newName: "HoursWOrked");
        }
    }
}
