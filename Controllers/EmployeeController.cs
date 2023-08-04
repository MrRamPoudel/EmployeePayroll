using EmployeePayroll.Context;
using EmployeePayroll.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeePayroll.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class EmployeeController : ControllerBase
    {
        private readonly AppDBContext _authContext;
        public EmployeeController(AppDBContext appDBContext)
        {
            _authContext = appDBContext;
        }
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] Employee employeeObj)
        {
            if(employeeObj == null)
            {
                return BadRequest();
            }
            var emp = await _authContext.employees.FirstOrDefaultAsync(x=> x.username == employeeObj.username && x.password == employeeObj.password);
            if (emp == null)
            {
                return NotFound(new {Message = "User Not Found!"});
            }
            return Ok(new { Message = "Login Success!" });
        }
    }
}
