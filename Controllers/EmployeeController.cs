using EmployeePayroll.Context;
using EmployeePayroll.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

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
            var emp = await _authContext.employees.FirstOrDefaultAsync(x=> (x.email == employeeObj.email || x.username == employeeObj.username) && x.password == employeeObj.password);
            if (emp == null)
            {
                return NotFound(new {Message = "User Not Found!"});
            }
            emp.Token = GenerateJWTToken(emp);
            return Ok(new 
            {
                Token = emp.Token,
                Message = "Login Success!" 
            });
        }
        private string GenerateJWTToken(Employee employee){
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryveryrandomssecretkey.........");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, $"{employee.firstName}{employee.lastName}")
            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key),SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = credentials,
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);

            return jwtTokenHandler.WriteToken(token);
        }
    }

}
