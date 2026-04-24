import {productsCategory} from '@/app/data/products'
import ProductCategory  from './ProductCategory'



export default async function page({params})
{

const { category } = await params;
 
  console.log(category);
  console.log("PARAMS:", params);
  console.log("PARAMS:", params);
  console.log("params:", params.category);

if (!category)
{
return <h1>No Category found</h1>;
}

const product = productsCategory.filter(
    (p) => String(p.category) === String(category)
  );

  console.log("PRODUCT:", product);

  if (!product) {
    return <h1>Product not found</h1>;
  }


    return <ProductCategory product={product} />;













}