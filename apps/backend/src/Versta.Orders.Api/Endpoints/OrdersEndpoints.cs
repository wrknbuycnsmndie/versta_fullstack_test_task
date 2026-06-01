using Microsoft.AspNetCore.Http.HttpResults;
using Versta.Orders.Api.Contracts;
using Versta.Orders.Api.Services;
using Versta.Orders.Api.Validators;

namespace Versta.Orders.Api.Endpoints;

public static class OrdersEndpoints
{
    public static IEndpointRouteBuilder MapOrdersEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints.MapGroup("/api/orders");

        group.MapGet("/", GetOrders).WithName("GetOrders");
        group.MapGet("/{id:guid}", GetOrderById).WithName("GetOrderById");
        group.MapPost("/", CreateOrder).WithName("CreateOrder");

        return endpoints;
    }

    private static async Task<Ok<PagedResponse<OrderListItemResponse>>> GetOrders(
        int? page,
        int? pageSize,
        OrdersService ordersService,
        CancellationToken cancellationToken)
    {
        var pagination = OrderRequestValidator.NormalizePagination(page, pageSize);
        var response = await ordersService.GetOrdersAsync(
            pagination.Page,
            pagination.PageSize,
            cancellationToken);

        return TypedResults.Ok(response);
    }

    private static async Task<Results<Ok<OrderResponse>, NotFound>> GetOrderById(
        Guid id,
        OrdersService ordersService,
        CancellationToken cancellationToken)
    {
        var order = await ordersService.GetOrderByIdAsync(id, cancellationToken);

        return order is null
            ? TypedResults.NotFound()
            : TypedResults.Ok(order);
    }

    private static async Task<Results<Created<OrderResponse>, ValidationProblem>> CreateOrder(
        CreateOrderRequest request,
        OrdersService ordersService,
        CancellationToken cancellationToken)
    {
        var validationErrors = OrderRequestValidator.ValidateCreate(request);
        if (validationErrors.Count > 0)
        {
            return TypedResults.ValidationProblem(validationErrors);
        }

        var response = await ordersService.CreateOrderAsync(request, cancellationToken);

        return TypedResults.Created($"/api/orders/{response.Id}", response);
    }
}
