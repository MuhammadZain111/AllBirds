


export default async function page({params})
{

const { category } = await params;
   console.log(id);
  console.log("PARAMS:", params);
  console.log("PARAMS:", params);
  console.log("ID:", params.id);

if (!category)
{
return <h1>No ID found</h1>;
}

const product = products.find(
    (p) => String(p.category) === String(category)
  );

  console.log("PRODUCT:", product);

  if (!product) {
    return <h1>Product not found</h1>;
  }


    return <ProductCategory product={product} />;













}