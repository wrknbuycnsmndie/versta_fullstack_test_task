namespace Versta.Orders.Api.Contracts;

public sealed record OrderListItemResponse(
    Guid Id,
    string OrderNumber,
    string SenderCity,
    string SenderAddress,
    string RecipientCity,
    string RecipientAddress,
    decimal WeightKg,
    DateTime PickupDate,
    DateTime CreatedAtUtc);
