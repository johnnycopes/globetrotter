using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace Globetrotter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FallbackController : Controller
    {
        public IActionResult Index()
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/HTML");
        }
    }
}