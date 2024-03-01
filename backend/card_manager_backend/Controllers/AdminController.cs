using card_manager_backend.Models.Admin;
using card_manager_backend.Models.UserModels;
using card_manager_backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using card_manager_backend.Data;
using BC = BCrypt.Net.BCrypt;

namespace card_manager_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;

        public AdminController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("createUserWithAccountAndCard")]
        [Authorize]
        public async Task<IActionResult> CreateUserWithAccountAndCard(CreateUserWithAccountAndCard model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Hash the password
            string hashedPassword = BC.HashPassword(model.Password);

            // Create User
            var user = new User
            {
                LastName = model.LastName,
                FirstName = model.FirstName,
                Email = model.Email,
                Password = hashedPassword,
                CreatedAt = DateTime.UtcNow
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Create Account
            var account = new Account
            {
                Balance = model.Balance,
                Type = model.AccountType,
                UserId = user.Id
            };
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            // Create Card
            var card = new Card
            {
                CardNumber = model.CardNumber,
                Valid = model.CardValid,
                State = model.CardState,
                Type = model.CardType,
                AccountId = account.Id
            };
            _context.Cards.Add(card);
            await _context.SaveChangesAsync();

            return Ok("User, Account, and Card created successfully.");
        }
    }
}
