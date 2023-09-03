using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Polo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class saleattrubutes6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SaleItemAtrributes_SaleOrder_SaleOrderId",
                table: "SaleItemAtrributes");

            migrationBuilder.RenameColumn(
                name: "SaleOrderId",
                table: "SaleItemAtrributes",
                newName: "SaleOrderItemId");

            migrationBuilder.RenameIndex(
                name: "IX_SaleItemAtrributes_SaleOrderId",
                table: "SaleItemAtrributes",
                newName: "IX_SaleItemAtrributes_SaleOrderItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_SaleItemAtrributes_SaleOrderItem_SaleOrderItemId",
                table: "SaleItemAtrributes",
                column: "SaleOrderItemId",
                principalTable: "SaleOrderItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SaleItemAtrributes_SaleOrderItem_SaleOrderItemId",
                table: "SaleItemAtrributes");

            migrationBuilder.RenameColumn(
                name: "SaleOrderItemId",
                table: "SaleItemAtrributes",
                newName: "SaleOrderId");

            migrationBuilder.RenameIndex(
                name: "IX_SaleItemAtrributes_SaleOrderItemId",
                table: "SaleItemAtrributes",
                newName: "IX_SaleItemAtrributes_SaleOrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_SaleItemAtrributes_SaleOrder_SaleOrderId",
                table: "SaleItemAtrributes",
                column: "SaleOrderId",
                principalTable: "SaleOrder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
