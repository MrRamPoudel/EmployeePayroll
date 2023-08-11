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
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateTimeEntry()
        {
            DateTime serverTime = DateTime.Now;
            int userId = int.Parse(User.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value);
            Employee employee = await _dbContext.Employees.FirstOrDefaultAsync(e => e.UserId == userId);
            if(employee == null)
            {
                return Unauthorized();
            }

            TimeEntry newEntry = new TimeEntry
            {
                EmployeeId = employee.Id,
                PunchInTime = DateTime.Now
            };

            await _dbContext.TimeEntries.AddAsync(newEntry);
            await _dbContext.SaveChangesAsync();

            return Ok(new {Message = "Last punch:", Time = newEntry.PunchInTime.ToString()});
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
            return Ok(new {Time =  LastEntry.PunchInTime.ToString()});
        }
    }
}
