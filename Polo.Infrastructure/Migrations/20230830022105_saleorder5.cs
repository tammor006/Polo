using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Polo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class saleorder5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SaleOrderId",
                table: "SaleOrderItem",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SaleOrderItem_SaleOrderId",
                table: "SaleOrderItem",
                column: "SaleOrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_SaleOrderItem_SaleOrder_SaleOrderId",
                table: "SaleOrderItem",
                column: "SaleOrderId",
                principalTable: "SaleOrder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SaleOrderItem_SaleOrder_SaleOrderId",
                table: "SaleOrderItem");

            migrationBuilder.DropIndex(
                name: "IX_SaleOrderItem_SaleOrderId",
                table: "SaleOrderItem");

            migrationBuilder.DropColumn(
                name: "SaleOrderId",
                table: "SaleOrderItem");
        }
    }
}
