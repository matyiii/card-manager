using System.ComponentModel.DataAnnotations;

namespace card_manager_backend.Models.UserModels
{
    public class UpdateName
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }
    }
}
