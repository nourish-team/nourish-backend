console.log("Hello TS file ran");

import * as fs from "fs";
import csv from "csv-parser";

import { prisma, products } from "./utils/db.server";

async function seedDatabase(): Promise<void> {
  try {
    const japanTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Tokyo",
    });
    const csvFiles: string[] = [
      "./prisma/seeds/data/AB1.csv",
      "./prisma/seeds/data/AB2.csv",
      "./prisma/seeds/data/Prod1.csv",
      "./prisma/seeds/data/Prod2.csv",
      "./prisma/seeds/data/red1.csv",
    ];
    for (const file of csvFiles) {
      const data: products[] = [];
      fs.createReadStream(file)
        .pipe(csv())
        .on("data", (row: any) => data.push(row))
        .on("end", async () => {
          for (const row of data) {
            const newData: Omit<products, "id"> = {
              brand: row["brand"].toLowerCase(),
              product_name: row["product_name"].toLowerCase(),
              ingredients: row["ingredients"],
              created_at: japanTime,
              updated_at: japanTime,
            };
            await prisma.products.create({
              data: newData,
            });
          }
        });
    }
    console.log("Database seeding completed");
  } catch (error) {
    console.error("Error occurred during database seeding", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
