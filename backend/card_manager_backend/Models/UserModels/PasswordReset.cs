using System.ComponentModel.DataAnnotations;

namespace card_manager_backend.Models.UserModels
{
    public class PasswordReset
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }
    }
}
