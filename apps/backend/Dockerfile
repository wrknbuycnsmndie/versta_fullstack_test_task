FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY src/Versta.Orders.Api/Versta.Orders.Api.csproj src/Versta.Orders.Api/
RUN dotnet restore src/Versta.Orders.Api/Versta.Orders.Api.csproj

COPY src/Versta.Orders.Api/ src/Versta.Orders.Api/
RUN dotnet publish src/Versta.Orders.Api/Versta.Orders.Api.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

COPY --from=build /app/publish ./

ENTRYPOINT ["dotnet", "Versta.Orders.Api.dll"]
