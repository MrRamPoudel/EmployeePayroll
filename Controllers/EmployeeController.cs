using EmployeePayroll.Context;
using EmployeePayroll.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeePayroll.Helpers;

namespace EmployeePayroll.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly AppDBContext _authContext;
        private readonly Helper _helper;
        public EmployeeController(AppDBContext appDBContext, Helper helper)
        {
            _authContext = appDBContext;
            _helper = helper;
        }
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            Console.WriteLine("Logging in");
            if(userObj == null)
            {
                return BadRequest();
            }
            var emp = await _authContext.Users.Include(u=>u.Employee).FirstOrDefaultAsync(x=> (x.Username == userObj.Username) && x.Password == userObj.Password);
            if (emp == null)
            {
                return NotFound(new {Message = "User Not Found!"});
            }
            string token = _helper.GenerateJwtToken(emp);
            return Ok(new 
            {
                token = token,
                Message = "Login Success!" 
            });
        }
    }

}
