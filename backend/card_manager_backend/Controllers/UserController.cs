using card_manager_backend.Data;
using card_manager_backend.Models.UserModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using BC = BCrypt.Net.BCrypt;

namespace card_manager_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly string _jwtSecret;

        public UserController(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _jwtSecret = configuration["Jwt:Secret"];
        }


        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> RegisterUser(Registration model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the email is already in use
            if (await _context.Users.AnyAsync(u => u.Email == model.Email))
            {
                return Conflict("Email address is already in use");
            }

            // Hash the password
            string hashedPassword = BC.HashPassword(model.Password);

            var user = new User
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Password = hashedPassword,
                LastLogin = null,
                CreatedAt = DateTime.UtcNow,
                PasswordLastChanged = null
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { user.Email });
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(Login model)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);

            if (user == null || !BC.Verify(model.Password, user.Password))
            {
                return Unauthorized("Invalid email or password");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            user.LastLogin = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(new { Token = tokenString, user.Email });
        }

        [HttpGet("getUserData")]
        [Authorize]
        public async Task<ActionResult<object>> GetUserData()
        {
            // Get the user's ID from the JWT token
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("Invalid token");
            }

            // Find the user in the database
            return await _context.Users.Where(u => u.Id == int.Parse(userId)).Select(u => new
            {
                u.Id,
                u.FirstName,
                u.LastName,
                u.Email,
                LastLogin = u.LastLogin.HasValue ? u.LastLogin.Value.ToString("yyyy-MM-dd HH:mm:ss") : null,
                CreatedAt = u.CreatedAt.ToString("yyyy-MM-dd HH:mm:ss"),
                PasswordLastChanged = u.PasswordLastChanged.HasValue ? u.PasswordLastChanged.Value.ToString("yyyy-MM-dd HH:mm:ss") : null,
            }).FirstAsync();
        }

        [HttpPatch("updateName")]
        [Authorize]
        public async Task<IActionResult> UpdateName(UpdateName model)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("Invalid token");
            }

            // Find the user in the database
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == int.Parse(userId));
            if (user == null)
            {
                return NotFound("User not found");
            }

            // Update the user's first and last name
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;

            try
            {
                await _context.SaveChangesAsync();
                return Ok("Profile updated successfully");
            }
            catch (Exception e)
            {
                return StatusCode(500, $"An error occurred while updating the profile: {e.Message}");
            }
        }

        [HttpPost("changePassword")]
        [Authorize]
        public async Task<IActionResult> ChangePassword(ChangePassword model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("Invalid token");
            }

            // Find the user in the database
            var user = await _context.Users.FindAsync(int.Parse(userId));

            if (user == null)
            {
                return NotFound("User not found");
            }

            // Verify the current password
            if (!BC.Verify(model.CurrentPassword, user.Password))
            {
                return BadRequest("Incorrect current password");
            }

            // Hash the new password
            string hashedPassword = BC.HashPassword(model.NewPassword);

            // Update the user's password
            user.Password = hashedPassword;
            user.PasswordLastChanged = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { PasswordLastChange = user.PasswordLastChanged.Value.ToString("yyyy-MM-dd HH:mm:ss") });
        }

        [HttpPost("logout")]
        [Authorize]
        public IActionResult Logout()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("Invalid token");
            }

            // Authentication is stateless, and the client is responsible for discarding the token.
            return Ok("Logout successful");
        }

        [HttpPost("passwordReset")]
        [AllowAnonymous]
        public async Task<IActionResult> RequestPasswordReset(PasswordReset model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Find the user by email
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);

            if (user == null)
            {
                return NotFound("The provided email address is not registered with us");
            }

            // Generate a password reset token
            var token = Guid.NewGuid().ToString();

            // Set the password reset token and its expiration time for the user
            user.PasswordResetToken = token;
            user.PasswordResetTokenExpiry = DateTime.UtcNow.AddHours(1);

            await _context.SaveChangesAsync();

            // Send an email with the password reset link to the user
            //await SendPasswordResetEmail(user.Email, token);

            return Ok("A password reset link has been sent.");
        }

        private async Task SendPasswordResetEmail(string email, string token)
        {
            var mailMessage = new MailMessage
            {
                Subject = "Password Reset",
                Body = $"Click the following link to reset your password: https://cardmanager.com/reset-password?token={token}",
                IsBodyHtml = true
            };

            mailMessage.To.Add(email);

            using var smtpClient = new SmtpClient("smtp.example.com")
            {
                Credentials = new System.Net.NetworkCredential("your_smtp_username", "your_smtp_password"),
                EnableSsl = true,
                Port = 587
            };

            await smtpClient.SendMailAsync(mailMessage);
        }
    }
}
