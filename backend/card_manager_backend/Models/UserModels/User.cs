using System.ComponentModel.DataAnnotations;

namespace card_manager_backend.Models.UserModels
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }

        //username
        public string Email { get; set; }
        public string Password { get; set; }

        //null-forgiving operator null!
        public DateTime? LastLogin { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public DateTime? PasswordLastChanged { get; set; } = null!;

        //https://learn.microsoft.com/en-us/ef/core/modeling/relationships/one-to-many
        public ICollection<Account> Accounts { get; set; }
        public string? PasswordResetToken { get; set; } = null!;
        public DateTime? PasswordResetTokenExpiry { get; set; } = null!;
    }
}
