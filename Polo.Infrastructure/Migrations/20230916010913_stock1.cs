using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Polo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class stock1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stock_Product_ProductId",
                table: "Stock");

            migrationBuilder.DropIndex(
                name: "IX_Stock_ProductId",
                table: "Stock");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Stock");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Stock",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Stock");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "Stock",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Stock_ProductId",
                table: "Stock",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Stock_Product_ProductId",
                table: "Stock",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
