using System.ComponentModel.DataAnnotations;
using card_manager_backend.Data;

namespace card_manager_backend.Models.Admin
{
    public class CreateUserWithAccountAndCard
    {
        // User properties
        [Required]
        public string LastName { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        [EmailAddress]
        [UniqueEmail(ErrorMessage = "Email address already exists")]
        public string Email { get; set; }

        [Required]
        [StringLength(20, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        public string Password { get; set; }

        // Account properties
        [Required]
        public int Balance { get; set; }

        [Required]
        [RegularExpression("^(Deposit|Credit|Currency)$", ErrorMessage = "Account type must be Deposit or Credit or Currency")]
        public string AccountType { get; set; }

        // Card properties
        [Required]
        [StringLength(16, MinimumLength = 16, ErrorMessage = "Card number must be exactly 16 characters")]
        public string CardNumber { get; set; }

        [Required]
        public bool CardValid { get; set; }

        [Required]
        [RegularExpression("^(Active|Inactive|Disabled|Expired)$", ErrorMessage = "Card state must be Active, Inactive, Disabled or Expired")]
        public string CardState { get; set; }

        [Required]
        [AccountType(ErrorMessage = "Invalid relationship between AccountType and CardType")]
        public string CardType { get; set; }
    }

    public class UniqueEmailAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var email = (string)value;
            var dbContext = (DataContext)validationContext.GetService(typeof(DataContext));

            if (dbContext.Users.Any(u => u.Email == email))
            {
                return new ValidationResult("Email address already exists.");
            }

            return ValidationResult.Success;
        }
    }

    public class AccountTypeAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var model = (CreateUserWithAccountAndCard)validationContext.ObjectInstance;
            var accountType = model.AccountType;
            var cardType = model.CardType;

            if (accountType == "Deposit" && cardType != "Forint")
            {
                return new ValidationResult("If account type is Deposit, card type must be Forint.");
            }
            else if (accountType == "Credit" && cardType != "Credit")
            {
                return new ValidationResult("If account type is Credit, card type must be Credit.");
            }
            else if (accountType == "Currency" && (cardType != "EUR" && cardType != "USD"))
            {
                return new ValidationResult("If account type is Currency, card type must be EUR or USD.");
            }

            return ValidationResult.Success;
        }
    }
}