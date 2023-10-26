import { prisma } from '../utils/db.server';

export default {
  async getProductByName(brand: string) {
    const allBrandProduct = await prisma.products.findMany({
      where: {
        brand,
      },
      select: {
        id: true,
        brand: true,
        product_name: true,
      },
    });
    return allBrandProduct;
  },

  async getProductById(id: number) {
    console.log(id);
    const product = await prisma.products.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        brand: true,
        product_name: true,
      },
    });
    return product;
  },
};
