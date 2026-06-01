using Versta.Orders.Api.Contracts;

namespace Versta.Orders.Api.Validators;

public static class OrderRequestValidator
{
    public static Dictionary<string, string[]> ValidateCreate(CreateOrderRequest request)
    {
        var errors = new Dictionary<string, string[]>();

        AddRequiredError(errors, nameof(request.SenderCity), request.SenderCity, "Город отправителя обязателен.");
        AddRequiredError(errors, nameof(request.SenderAddress), request.SenderAddress, "Адрес отправителя обязателен.");
        AddRequiredError(errors, nameof(request.RecipientCity), request.RecipientCity, "Город получателя обязателен.");
        AddRequiredError(errors, nameof(request.RecipientAddress), request.RecipientAddress, "Адрес получателя обязателен.");

        if (request.WeightKg <= 0)
        {
            errors[nameof(request.WeightKg)] = ["Вес груза должен быть больше нуля."];
        }

        var pickupDateUtc = DateTime.SpecifyKind(request.PickupDate, DateTimeKind.Utc);
        if (pickupDateUtc.Date < DateTime.UtcNow.Date)
        {
            errors[nameof(request.PickupDate)] = ["Дата забора груза не может быть в прошлом."];
        }

        return errors;
    }

    public static (int Page, int PageSize) NormalizePagination(int? page, int? pageSize)
    {
        var normalizedPage = page.GetValueOrDefault(1);
        var normalizedPageSize = pageSize.GetValueOrDefault(5);

        if (normalizedPage < 1)
        {
            normalizedPage = 1;
        }

        if (normalizedPageSize < 1)
        {
            normalizedPageSize = 1;
        }

        if (normalizedPageSize > 50)
        {
            normalizedPageSize = 50;
        }

        return (normalizedPage, normalizedPageSize);
    }

    private static void AddRequiredError(
        IDictionary<string, string[]> errors,
        string key,
        string? value,
        string message)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            errors[key] = [message];
        }
    }
}
