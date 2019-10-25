using Microsoft.EntityFrameworkCore;

namespace Globetrotter.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}        
    }
}
