import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import {
  productValidationSchema,
  updateProductValidationSchema,
} from "./product.validation";

const createProductToDB = async (product: TProduct) => {
  const zodParsedProduct = productValidationSchema.parse(product);
  const result = await Product.create(zodParsedProduct);

  return result;
};

const getProductsFromDB = async () => {
  const result = await Product.find({});

  return result;
};

const updateProductToDB = async (
  productId: string,
  product: Partial<TProduct>
) => {
  const zodParsedUpdateProduct = updateProductValidationSchema.parse(product);
  const result = await Product.findByIdAndUpdate(
    productId,
    zodParsedUpdateProduct,
    { new: true }
  );
  return result;
};

const deleteProductFromDB = async (productId: string) => {
  const result = await Product.findOneAndDelete({ _id: productId });
  return result;
};

export const ProductService = {
  createProductToDB,
  getProductsFromDB,
  updateProductToDB,
  deleteProductFromDB,
};
