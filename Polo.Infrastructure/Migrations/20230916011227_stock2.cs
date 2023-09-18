using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Polo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class stock2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MeasureQuantity",
                table: "Stock",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MeasureQuantity",
                table: "Stock");
        }
    }
}
