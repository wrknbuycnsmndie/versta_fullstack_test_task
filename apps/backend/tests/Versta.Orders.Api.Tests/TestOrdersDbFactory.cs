using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Versta.Orders.Api.Data;

namespace Versta.Orders.Api.Tests;

internal sealed class TestOrdersDbFactory : IDisposable
{
    private readonly SqliteConnection _connection;

    public TestOrdersDbFactory()
    {
        _connection = new SqliteConnection("Data Source=:memory:");
        _connection.Open();
    }

    public OrdersDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<OrdersDbContext>()
            .UseSqlite(_connection)
            .Options;

        var dbContext = new OrdersDbContext(options);
        dbContext.Database.EnsureCreated();

        return dbContext;
    }

    public void Dispose()
    {
        _connection.Dispose();
    }
}
