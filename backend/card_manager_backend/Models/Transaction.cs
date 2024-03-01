using System.ComponentModel.DataAnnotations;
using System.Numerics;

namespace card_manager_backend.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Amount { get; set; }
        public string Type { get; set; }
        public string CardNumber { get; set; }

        public int VendorId { get; set; }
        //Transaction must have a Vendor
        public Vendor Vendor { get; set; }
        public int CardId { get; set; }

        //Transcation must have a Card
        public Card Card { get; set; } = null!;
    }
}
