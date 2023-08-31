using EmployeePayroll.Model;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EmployeePayroll.Helpers
{
    public class Helper
    {
        private readonly IConfiguration _configuration;

        public Helper(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        //Function that generates JWT token with user id, first name, and last name
        public string GenerateJwtToken(User user)
        {
            //The token is made up of header, payload, and signature that is used to verify
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            //This needs to be atleast 256 bits >= 32 bytes
            var key = Encoding.ASCII.GetBytes(_configuration["EncryptionKey"]!);
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, $"{user.Employee.FirstName! } {user.Employee.LastName!}")
            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
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
