import { stripe } from "@/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import Stripe from "stripe"
import { useShoppingCart } from "use-shopping-cart"
import { formatPrice } from "@/util/formatPrice";

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    description: string
    defaultPriceId: string 
    sku: string
    currency: string
  }
}

export default function Product({ product }: ProductProps ) {
  const { addItem } = useShoppingCart()

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt=""/>
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{formatPrice(product.price)}</span>

          <p>{product.description}</p>

          <button onClick={() => addItem(product, { count: 1 })}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      { params: { id: 'prod_NQITdNiCxlQ1FO' } },
      { params: { id: 'prod_NQITNym72fLWhV' } },
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params?.id;

  if(!productId) {
    return {
      props: {},
      revalidate: 60 * 60 * 1 // 1 hour
    }
  }

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        currency: 'EUR',
        price,
        description: product.description,
        defaultPriceId: price.id,
        sku: product.id,
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }
}