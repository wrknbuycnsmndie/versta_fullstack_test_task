using Microsoft.EntityFrameworkCore;
using Versta.Orders.Api.Models;

namespace Versta.Orders.Api.Data;

public sealed class OrdersDbContext(DbContextOptions<OrdersDbContext> options) : DbContext(options)
{
    public DbSet<Order> Orders => Set<Order>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Order>(entity =>
        {
            entity.ToTable("Orders");

            entity.HasKey(order => order.Id);
            entity.Property(order => order.OrderNumber).HasMaxLength(21).IsRequired();
            entity.Property(order => order.SenderCity).HasMaxLength(200).IsRequired();
            entity.Property(order => order.SenderAddress).HasMaxLength(500).IsRequired();
            entity.Property(order => order.RecipientCity).HasMaxLength(200).IsRequired();
            entity.Property(order => order.RecipientAddress).HasMaxLength(500).IsRequired();
            entity.Property(order => order.WeightKg).HasColumnType("decimal(10,2)");
            entity.Property(order => order.PickupDate).IsRequired();
            entity.Property(order => order.CreatedAtUtc).IsRequired();

            entity.HasIndex(order => order.OrderNumber).IsUnique();
        });
    }
}
