using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Polo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class productItem1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MeasureQty",
                table: "ProductItem",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Qty",
                table: "ProductItem",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MeasureQty",
                table: "ProductItem");

            migrationBuilder.DropColumn(
                name: "Qty",
                table: "ProductItem");
        }
    }
}
