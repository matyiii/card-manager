using card_manager_backend.Data;
using card_manager_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace card_manager_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly DataContext _context;

        public TransactionController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("getTranscations")]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("Invalid token");
            }

            var transactions = await _context.Transactions
                .Where(t => t.Card.Account.UserId == int.Parse(userId))
                .ToListAsync();

            if (!transactions.Any())
            {
                return NotFound("User has no transcations associated with their account.");
            }

            return Ok( new { Transcations = transactions });
        }
    }
}
