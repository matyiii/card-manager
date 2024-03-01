using card_manager_backend.Models;
using card_manager_backend.Models.UserModels;
using Microsoft.EntityFrameworkCore;
using BC = BCrypt.Net.BCrypt;

namespace card_manager_backend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Vendor> Vendors { get; set; }

        //Seed DB
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, LastName = "Test", FirstName = "John", Email = "johntest@test.com", Password = BC.HashPassword("password"), CreatedAt = DateTime.UtcNow },
                new User { Id = 2, LastName = "Test", FirstName = "John2", Email = "johntest2@test.com", Password = BC.HashPassword("password"), CreatedAt = DateTime.UtcNow }
            );

            modelBuilder.Entity<Account>().HasData(
                new Account { Id = 1, Balance = 9500, Type = "Credit", UserId = 1 },
                new Account { Id = 2, Balance = 6500, Type = "Debit", UserId = 1 },
                new Account { Id = 3, Balance = 24000, Type = "Credit", UserId = 2 }
            );

            modelBuilder.Entity<Card>().HasData(
                new Card { Id = 1, CardNumber = "1122334455667782", Valid = true, State = "Active", Type = "Credit", AccountId = 1 },
                new Card { Id = 2, CardNumber = "1122334455667781", Valid = true, State = "Active", Type = "Currency", AccountId = 2 },
                new Card { Id = 3, CardNumber = "1122334455667783", Valid = true, State = "Active", Type = "Credit", AccountId = 3 }
            );
            modelBuilder.Entity<Vendor>().HasData(
                new Vendor { Id = 1, Name = "John Doe", Country = "Hungary", City = "Budapest", Street = "Arany János Street 1 3/3", ZipCode = "3100", Phone = "+36101234567", Email = "johndoe@doe.com" },
                new Vendor { Id = 2, Name = "John Doe2", Country = "Hungary", City = "Budapest", Street = "Arany János Street 1 3/4", ZipCode = "3100", Phone = "+36101234568", Email = "tesztelek@elek.com" }
            );

            modelBuilder.Entity<Transaction>().HasData(
                new Transaction { Id = 1, Date = DateTime.UtcNow, Amount = 500, Type = "Normal", CardNumber = "1022334455667781", VendorId = 1, CardId = 1 },
                new Transaction { Id = 2, Date = DateTime.UtcNow, Amount = 1000, Type = "Cancelled", CardNumber = "1022334455667781", VendorId = 2, CardId = 1 }
            );
        }
    }
}
