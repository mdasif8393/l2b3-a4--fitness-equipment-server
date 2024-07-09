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

const getProductsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  const productSearchableFields = ["name"];

  let searchTerm = "";

  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchQuery = Product.find({
    $or: productSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  // Filtering
  const excludeFields = ["searchTerm", "sort"];
  excludeFields.forEach((el) => delete queryObj[el]);

  const filterQuery = searchQuery.find(queryObj);

  let sort = "price";
  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = await filterQuery.sort(sort);

  return sortQuery;
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
