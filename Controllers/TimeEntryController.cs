/*  TimeEntryController.cs
    Contains the API related to time entry
*/

using EmployeePayroll.Context;
using EmployeePayroll.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace EmployeePayroll.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeEntryController: ControllerBase
    {
        private readonly AppDBContext _dbContext;

        public TimeEntryController(AppDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        //Make api post request with the header, returns the time entered
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateTimeEntry()
        {
            int userId = int.Parse(User.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value);
            Employee employee = await _dbContext.Employees.FirstOrDefaultAsync(e => e.UserId == userId);
            if(employee == null)
            {
                return Unauthorized();
            }

            TimeEntry newEntry = new TimeEntry
            {
                EmployeeId = employee.Id,
                PunchInTime = DateTime.UtcNow
            };

            await _dbContext.TimeEntries.AddAsync(newEntry);
            await _dbContext.SaveChangesAsync();
            return Ok(new {Message = "Last punch:", Time = newEntry.PunchInTime.ToString("O")});
        }

        [Authorize]
        [HttpGet("punchEntry")]
        public async Task<IActionResult> GetLastEntry()
        {
            int userId = int.Parse(User.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value);
            TimeEntry LastEntry = await _dbContext.TimeEntries
                .Where(e => e.EmployeeId == userId)
                .OrderByDescending(e=> e.PunchInTime)
                .FirstOrDefaultAsync();
            if (LastEntry == null)
            {
                return NotFound();
            }
            return Ok(new {Time =  LastEntry.PunchInTime.ToString("O")});
        }

        //Calculates the pay for the last 7 days
        [Authorize]
        [HttpGet("currentPay")]
        public async Task<IActionResult> CurrentPayment() {
            double TaxRate = 0.08;
            double payRate = 0.0;
            //Start counting time from 7 days ago
            DateTime LastPaymentDate = DateTime.UtcNow.AddDays(-7);
            int userId = int.Parse(User.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value);
            Statement statementInfo = await _dbContext.Statements.FirstOrDefaultAsync(e=> e.EmployeeId == userId);
            //If there is no statement, it means employee is new and don't have old statement
            if (statementInfo == null)
            {
                return Ok(new { GrossPay = 0.0, TaxedPay = 0.0 });
            }
            payRate = statementInfo.PayRate;
            //Get all time entries for the user
            List<TimeEntry> timeEntries = await _dbContext.TimeEntries
                .Where(e => e.EmployeeId == userId && e.PunchInTime >= LastPaymentDate)
                .OrderBy(e => e.PunchInTime).ToListAsync();
            double totalHours = 0;
            for(int i = 0; i<timeEntries.Count; i++)
            {
                if(i + 1 < timeEntries.Count)
                {
                    totalHours = (timeEntries[i + 1].PunchInTime - timeEntries[i].PunchInTime).TotalHours;
                }
            }
            return Ok(new {GrossPay = (totalHours*payRate).ToString(), TaxedPay = (totalHours * payRate * (1.0 -TaxRate)).ToString()});
     
        }
    }
}
