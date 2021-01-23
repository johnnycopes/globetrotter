using System.ComponentModel.DataAnnotations;

namespace Globetrotter.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 8, ErrorMessage ="Password must be between 8 and 20 characters")]
        public string Password { get; set; }
    }
}
