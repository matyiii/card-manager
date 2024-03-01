using System.ComponentModel.DataAnnotations;

namespace card_manager_backend.Models.UserModels
{
    public class ChangePassword
    {
        [Required(ErrorMessage = "Current password is required")]
        public string CurrentPassword { get; set; }

        [Required(ErrorMessage = "New password is required")]
        [StringLength(20, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        public string NewPassword { get; set; }
    }
}
