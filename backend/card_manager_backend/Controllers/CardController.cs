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
    public class CardController : ControllerBase
    {
        private readonly DataContext _context;

        public CardController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("getCards")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Card>>> GetCards()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("Invalid token");
            }

            var cards = await _context.Cards
                .Where(c => c.Account.UserId == int.Parse(userId))
                .ToListAsync();

            if (!cards.Any())
            {
                return NotFound("User has no cards associated with their account.");
            }

            return Ok( new { Cards = cards });
        }
    }
}
