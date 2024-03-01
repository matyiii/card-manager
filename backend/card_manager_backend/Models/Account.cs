using card_manager_backend.Models.UserModels;
using System.ComponentModel.DataAnnotations;

namespace card_manager_backend.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }
        public int Balance { get; set; }
        public string Type { get; set; }
        public int UserId { get; set; }

        //Account has to belong to a User
        public User User { get; set; } = null!;

        //Account may have a Card
        public Card? Card { get; set; }
    }
}
