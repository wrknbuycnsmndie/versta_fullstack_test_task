using Versta.Orders.Api.Contracts;
using Versta.Orders.Api.Validators;

namespace Versta.Orders.Api.Tests.Validators;

public sealed class OrderRequestValidatorTests
{
    [Fact]
    public void ValidateCreate_ReturnsErrors_ForInvalidRequest()
    {
        var request = new CreateOrderRequest(
            " ",
            "",
            null!,
            " ",
            0,
            DateTime.UtcNow.AddDays(-1));

        var errors = OrderRequestValidator.ValidateCreate(request);

        Assert.Equal(6, errors.Count);
        Assert.Contains(nameof(request.SenderCity), errors.Keys);
        Assert.Contains(nameof(request.SenderAddress), errors.Keys);
        Assert.Contains(nameof(request.RecipientCity), errors.Keys);
        Assert.Contains(nameof(request.RecipientAddress), errors.Keys);
        Assert.Contains(nameof(request.WeightKg), errors.Keys);
        Assert.Contains(nameof(request.PickupDate), errors.Keys);
    }

    [Theory]
    [InlineData(null, null, 1, 5)]
    [InlineData(0, 0, 1, 1)]
    [InlineData(-2, 100, 1, 50)]
    [InlineData(3, 10, 3, 10)]
    public void NormalizePagination_NormalizesValues(
        int? page,
        int? pageSize,
        int expectedPage,
        int expectedPageSize)
    {
        var result = OrderRequestValidator.NormalizePagination(page, pageSize);

        Assert.Equal(expectedPage, result.Page);
        Assert.Equal(expectedPageSize, result.PageSize);
    }
}
