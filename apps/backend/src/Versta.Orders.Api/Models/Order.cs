namespace Versta.Orders.Api.Models;

public sealed class Order
{
    public Guid Id { get; set; }
    public string OrderNumber { get; set; } = string.Empty;
    public string SenderCity { get; set; } = string.Empty;
    public string SenderAddress { get; set; } = string.Empty;
    public string RecipientCity { get; set; } = string.Empty;
    public string RecipientAddress { get; set; } = string.Empty;
    public decimal WeightKg { get; set; }
    public DateTime PickupDate { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
