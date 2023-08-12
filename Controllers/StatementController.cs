using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeePayroll.Context;
using IronPdf;
using System.Security.Claims;
using EmployeePayroll.Model;
using Microsoft.AspNetCore.Authorization;

namespace EmployeePayroll.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatementController : ControllerBase
    {
        private readonly AppDBContext _dbContext;
        public StatementController(AppDBContext context)
        {
            _dbContext = context;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GeneratePDF() {
            var Renderer = new ChromePdfRenderer();
            int userId = int.Parse(User.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value);
            Employee employee = await _dbContext.Employees.FirstOrDefaultAsync(e => e.UserId == userId);
            if(employee == null)
            {
                return NotFound();
            }
            string htmlContent = $@"
                    <html>
                        <head>
                              <link rel='stylesheet' type='text/css' href='../Helpers/style.css' />
                        </head>
                        <body>
                               <div class ='container'> 
                                <div class='employee' >
                                 <h1> {employee.FirstName} {employee.LastName} </h1>
                                  <h2> {employee.Email} </h2>
                                </div>
                                <div class='business' >
                                    <h1> Employee Stub LLC </h2>
                                    <h2> 1234 Day St, Akron OH </h2>
                                    <h2> 555-555-5555 </h2>
                                </div>
                                </div>
                        </body>
                        </html>";
            var PdfDocument = Renderer.RenderHtmlAsPdf(htmlContent);
            byte[] data = PdfDocument.BinaryData;
            return File(data, "application/pdf", $"{employee.FirstName}.pdf");  
        }
    }
}
