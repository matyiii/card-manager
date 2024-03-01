using System.ComponentModel.DataAnnotations;

namespace card_manager_backend.Models
{
    public class Vendor
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        //Address(es)
        public string Country { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }
        public string Street { get; set; }

        //Contacts
        public string Phone { get; set; }
        public string Email { get; set; }
    }
}
