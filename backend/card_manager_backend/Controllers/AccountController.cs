using card_manager_backend.Data;
using card_manager_backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace card_manager_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly DataContext _context;

        public AccountController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("getAccounts")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccountsByUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("Invalid token");
            }

            var accounts = await _context.Accounts.Where(a => a.UserId == int.Parse(userId)).ToListAsync();

            if (!accounts.Any())
            {
                return NotFound("User has no accounts.");
            }

            return Ok( new { Accounts = accounts });
        }
    }
}
