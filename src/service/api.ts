import { ProductItemType } from '../components/types'


export const getProducts = async (): Promise<ProductItemType[]> =>
  (await (await fetch('https://fakestoreapi.com/products')).json());

export const getSingleProduct = async (id: number): Promise<ProductItemType[]> =>
  (await (await fetch(`https://fakestoreapi.com/products/${id}`)).json());

// const log = getSingleProduct(1)
// console.log(log + "single product")
export const getSingleProduct2 = async (id: number) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  return res.json()
}

export async function getSingleP(id: number): Promise<ProductItemType[]> {
  return await (await fetch(`https://fakestoreapi.com/products/${id}`)).json()
}
// const getSingleProduct = React.useCallback(async (): Promise<SingleProductProps> => {
//   return (await (await fetch(`https://fakestoreapi.com/products/${pageId}`)).json())
// }, [pageId]);
