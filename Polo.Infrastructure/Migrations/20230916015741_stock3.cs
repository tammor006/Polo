using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Polo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class stock3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Stock");

            migrationBuilder.AlterColumn<float>(
                name: "Quantity",
                table: "Stock",
                type: "real",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<float>(
                name: "Qty",
                table: "PurchaseItem",
                type: "real",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<float>(
                name: "Total",
                table: "PurchaseItem",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Total",
                table: "PurchaseItem");

            migrationBuilder.AlterColumn<int>(
                name: "Quantity",
                table: "Stock",
                type: "int",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Stock",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<int>(
                name: "Qty",
                table: "PurchaseItem",
                type: "int",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");
        }
    }
}
