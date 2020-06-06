using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistance.Migrations
{
    public partial class SeedValues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "id", "name" },
                values: new object[] { 1, "values 101" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "id", "name" },
                values: new object[] { 2, "values 102" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "id", "name" },
                values: new object[] { 3, "values 103" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "id",
                keyValue: 3);
        }
    }
}
