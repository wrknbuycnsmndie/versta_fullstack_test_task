namespace Versta.Orders.Api.Contracts;

public sealed record CreateOrderRequest(
    string SenderCity,
    string SenderAddress,
    string RecipientCity,
    string RecipientAddress,
    decimal WeightKg,
    DateTime PickupDate);
