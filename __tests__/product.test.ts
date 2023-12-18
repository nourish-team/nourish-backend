import prismaMock from '../singleton';
import productModel from '../src/model/product.model';

const japanTime = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Tokyo',
});

describe('getProductByName', () => {
  it('Should return products of a specific brand', async () => {
    const brandName = 'fancy';
    const productList = [
      {
        id: 7,
        brand: 'fancy',
        product_name: 'smells nice',
        ingredients: ['lotion', 'smell'],
        created_at: japanTime,
        updated_at: japanTime,
      },
      {
        id: 42,
        brand: 'fancy',
        product_name: 'lip fruit',
        ingredients: ['fruit', 'lips'],
        created_at: japanTime,
        updated_at: japanTime,
      },
    ];

    prismaMock.products.findMany.mockResolvedValueOnce(productList);

    const products = await productModel.getProductByName(brandName);
    expect(products[0]).toHaveProperty('brand', brandName);
    expect(products[1]).toHaveProperty('brand', brandName);
    expect(products).toStrictEqual(productList);
  });
});

describe('getProductById', () => {
  it('Should return a single product with a specific id', async () => {
    const id = 7;

    const lotion = {
      id: 7,
      brand: 'fancy',
      product_name: 'smells nice',
      ingredients: ['lotion', 'smell'],
      created_at: japanTime,
      updated_at: japanTime,
    };

    prismaMock.products.findFirst.mockResolvedValueOnce(lotion);

    const product = await productModel.getProductById(id);
    expect(product).toHaveProperty('id', id);
  });

  it('Should return a brand name and product name', async () => {
    const id = 42;

    const lipStuff = {
      id: 42,
      brand: 'fancy',
      product_name: 'lip fruit',
      ingredients: ['fruit', 'lips'],
      created_at: japanTime,
      updated_at: japanTime,
    };

    prismaMock.products.findFirst.mockResolvedValueOnce(lipStuff);

    const product = await productModel.getProductById(id);
    expect(product).toHaveProperty('id', id);
    expect(product).toHaveProperty('brand');
    expect(product).toHaveProperty('product_name');
  });
});
