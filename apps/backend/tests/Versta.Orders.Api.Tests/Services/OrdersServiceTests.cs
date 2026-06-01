using Versta.Orders.Api.Contracts;
using Versta.Orders.Api.Data;
using Versta.Orders.Api.Models;
using Versta.Orders.Api.Services;

namespace Versta.Orders.Api.Tests.Services;

public sealed class OrdersServiceTests
{
    [Fact]
    public async Task CreateOrderAsync_TrimsRoundsAndPersistsOrder()
    {
        using var dbFactory = new TestOrdersDbFactory();
        await using var dbContext = dbFactory.CreateDbContext();
        var service = new OrdersService(dbContext);

        var request = new CreateOrderRequest(
            " Москва ",
            " Тверская, 1 ",
            " Казань ",
            " Баумана, 2 ",
            10.126m,
            new DateTime(2026, 6, 10));

        var response = await service.CreateOrderAsync(request, CancellationToken.None);
        var savedOrder = await dbContext.Orders.FindAsync(response.Id);

        Assert.NotNull(savedOrder);
        Assert.Equal("Москва", savedOrder.SenderCity);
        Assert.Equal("Тверская, 1", savedOrder.SenderAddress);
        Assert.Equal("Казань", savedOrder.RecipientCity);
        Assert.Equal("Баумана, 2", savedOrder.RecipientAddress);
        Assert.Equal(10.13m, savedOrder.WeightKg);
        Assert.StartsWith("VRS-", savedOrder.OrderNumber);
        Assert.Equal(DateTimeKind.Utc, savedOrder.PickupDate.Kind);
    }

    [Fact]
    public async Task GetOrdersAsync_ReturnsRequestedPage_AndOrdersAreSortedByCreatedAtDescending()
    {
        using var dbFactory = new TestOrdersDbFactory();
        await using var dbContext = dbFactory.CreateDbContext();
        SeedOrders(dbContext, 7);
        var service = new OrdersService(dbContext);

        var response = await service.GetOrdersAsync(2, 3, CancellationToken.None);

        Assert.Equal(2, response.Page);
        Assert.Equal(3, response.PageSize);
        Assert.Equal(7, response.TotalCount);
        Assert.Equal(3, response.TotalPages);
        Assert.Equal(3, response.Items.Count);

        var orderNumbers = response.Items.Select(order => order.OrderNumber).ToArray();
        Assert.Equal(["ORDER-4", "ORDER-3", "ORDER-2"], orderNumbers);
    }

    [Fact]
    public async Task GetOrdersAsync_ClampsPageToLastAvailablePage()
    {
        using var dbFactory = new TestOrdersDbFactory();
        await using var dbContext = dbFactory.CreateDbContext();
        SeedOrders(dbContext, 6);
        var service = new OrdersService(dbContext);

        var response = await service.GetOrdersAsync(99, 4, CancellationToken.None);

        Assert.Equal(2, response.Page);
        Assert.Equal(2, response.Items.Count);
    }

    [Fact]
    public async Task GetOrderByIdAsync_ReturnsNull_WhenOrderDoesNotExist()
    {
        using var dbFactory = new TestOrdersDbFactory();
        await using var dbContext = dbFactory.CreateDbContext();
        var service = new OrdersService(dbContext);

        var response = await service.GetOrderByIdAsync(Guid.NewGuid(), CancellationToken.None);

        Assert.Null(response);
    }

    private static void SeedOrders(OrdersDbContext dbContext, int count)
    {
        var createdAt = new DateTime(2026, 6, 1, 12, 0, 0, DateTimeKind.Utc);

        var orders = Enumerable.Range(1, count)
            .Select(index => new Order
            {
                Id = Guid.NewGuid(),
                OrderNumber = $"ORDER-{index}",
                SenderCity = $"Sender {index}",
                SenderAddress = $"Sender address {index}",
                RecipientCity = $"Recipient {index}",
                RecipientAddress = $"Recipient address {index}",
                WeightKg = index,
                PickupDate = createdAt.AddDays(index),
                CreatedAtUtc = createdAt.AddMinutes(index)
            });

        dbContext.Orders.AddRange(orders);
        dbContext.SaveChanges();
    }
}
