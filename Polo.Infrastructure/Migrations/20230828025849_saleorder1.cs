using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Polo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class saleorder1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SaleOrder_Customer_CustomersId",
                table: "SaleOrder");

            migrationBuilder.DropIndex(
                name: "IX_SaleOrder_CustomersId",
                table: "SaleOrder");

            migrationBuilder.DropColumn(
                name: "CustomersId",
                table: "SaleOrder");

            migrationBuilder.CreateIndex(
                name: "IX_SaleOrder_CustomerId",
                table: "SaleOrder",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_SaleOrder_Customer_CustomerId",
                table: "SaleOrder",
                column: "CustomerId",
                principalTable: "Customer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SaleOrder_Customer_CustomerId",
                table: "SaleOrder");

            migrationBuilder.DropIndex(
                name: "IX_SaleOrder_CustomerId",
                table: "SaleOrder");

            migrationBuilder.AddColumn<int>(
                name: "CustomersId",
                table: "SaleOrder",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SaleOrder_CustomersId",
                table: "SaleOrder",
                column: "CustomersId");

            migrationBuilder.AddForeignKey(
                name: "FK_SaleOrder_Customer_CustomersId",
                table: "SaleOrder",
                column: "CustomersId",
                principalTable: "Customer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
