using Microsoft.EntityFrameworkCore;
using Versta.Orders.Api.Contracts;
using Versta.Orders.Api.Data;
using Versta.Orders.Api.Models;

namespace Versta.Orders.Api.Services;

public sealed class OrdersService
{
    private readonly OrdersDbContext _dbContext;

    public OrdersService(OrdersDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PagedResponse<OrderListItemResponse>> GetOrdersAsync(
        int page,
        int pageSize,
        CancellationToken cancellationToken)
    {
        var totalCount = await _dbContext.Orders.CountAsync(cancellationToken);
        var totalPages = totalCount == 0
            ? 1
            : (int)Math.Ceiling(totalCount / (double)pageSize);
        var currentPage = page > totalPages ? totalPages : page;

        var orders = await _dbContext.Orders
            .AsNoTracking()
            .OrderByDescending(order => order.CreatedAtUtc)
            .Skip((currentPage - 1) * pageSize)
            .Take(pageSize)
            .Select(order => new OrderListItemResponse(
                order.Id,
                order.OrderNumber,
                order.SenderCity,
                order.SenderAddress,
                order.RecipientCity,
                order.RecipientAddress,
                order.WeightKg,
                order.PickupDate,
                order.CreatedAtUtc))
            .ToListAsync(cancellationToken);

        return new PagedResponse<OrderListItemResponse>(
            orders,
            currentPage,
            pageSize,
            totalCount,
            totalPages);
    }

    public async Task<OrderResponse?> GetOrderByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _dbContext.Orders
            .AsNoTracking()
            .Where(order => order.Id == id)
            .Select(order => new OrderResponse(
                order.Id,
                order.OrderNumber,
                order.SenderCity,
                order.SenderAddress,
                order.RecipientCity,
                order.RecipientAddress,
                order.WeightKg,
                order.PickupDate,
                order.CreatedAtUtc))
            .SingleOrDefaultAsync(cancellationToken);
    }

    public async Task<OrderResponse> CreateOrderAsync(
        CreateOrderRequest request,
        CancellationToken cancellationToken)
    {
        var pickupDateUtc = DateTime.SpecifyKind(request.PickupDate, DateTimeKind.Utc);

        var order = new Order
        {
            Id = Guid.NewGuid(),
            OrderNumber = GenerateOrderNumber(),
            SenderCity = request.SenderCity.Trim(),
            SenderAddress = request.SenderAddress.Trim(),
            RecipientCity = request.RecipientCity.Trim(),
            RecipientAddress = request.RecipientAddress.Trim(),
            WeightKg = decimal.Round(request.WeightKg, 2, MidpointRounding.AwayFromZero),
            PickupDate = pickupDateUtc,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.Orders.Add(order);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new OrderResponse(
            order.Id,
            order.OrderNumber,
            order.SenderCity,
            order.SenderAddress,
            order.RecipientCity,
            order.RecipientAddress,
            order.WeightKg,
            order.PickupDate,
            order.CreatedAtUtc);
    }

    private static string GenerateOrderNumber()
    {
        return $"VRS-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid():N}"[..21];
    }
}
