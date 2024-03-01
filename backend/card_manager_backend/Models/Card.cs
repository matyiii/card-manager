using System.ComponentModel.DataAnnotations;

namespace card_manager_backend.Models
{
    public class Card
    {
        [Key]
        public int Id { get; set; }
        public string CardNumber { get; set; }
        public bool Valid { get; set; }
        public string State { get; set; }
        public string Type { get; set; }
        public int AccountId { get; set; }

        //Card has to belong to an Account
        public Account Account { get; set; } = null!;

        //Card may has many Transcation
        public ICollection<Transaction>? Transactions { get; set; }
    }
}
