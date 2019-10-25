using Globetrotter.Models;
using System.Threading.Tasks;

namespace Globetrotter.Data
{
    interface IAuthRepository
    {
        Task<User> Register(User user, string password);

        Task<User> Login(string username, string password);

        Task<bool> CheckIfUserExists(string username);
    }
}
