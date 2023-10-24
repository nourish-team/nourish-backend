import { Request, Response } from 'express';
import productService from '../service/product.service';

export default {
  async getProductByName(req: Request, res: Response) {
    try {
      const { brand } = req.params;
      const allBrandProduct = await productService.getProductByName(brand);
      if (allBrandProduct.length > 0) {
        res.status(200).send(allBrandProduct);
      } else {
        res.status(400).send("Brand doesn't exist in database");
      }
    } catch (error) {
      console.log(error);
    }
  },

  async getProductById(req: Request, res: Response) {
    try {
      const idParam = req.params.id;
      const id = parseInt(idParam, 10);
      const product = await productService.getProductById(id);
      if (product) {
        res.status(200).send(product);
      } else {
        res.status(400).send("Product doesn't exist in database");
      }
    } catch (error) {
      console.log(error);
    }
  },
};
