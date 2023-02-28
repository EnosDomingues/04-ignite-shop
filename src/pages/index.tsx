import { HomeContainer, Product } from "@/styles/pages/home";
import { GetStaticProps } from "next";
import { useKeenSlider } from 'keen-slider/react'
import { stripe } from "@/lib/stripe";
import cartIcon from '../assets/cart2.svg'

import Image from "next/image";

import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe";
import Link from "next/link";
import Head from "next/head";
import { useShoppingCart } from "use-shopping-cart";
import { formatPrice } from "@/util/formatPrice";

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
    currency: string
    sku: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const { addItem, cartDetails } = useShoppingCart()

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48, 
    }
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => (
          <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height={480} alt="" />

              <footer onClick={(e) => e.preventDefault()}>
                <div>
                  <strong>{product.name}</strong>
                  <span>{formatPrice(product.price)}</span>
                </div>
                <button onClick={() => addItem(product, { count: 1 })}>
                  <Image src={cartIcon} alt="" />
                </button>
              </footer>
            </Product>
          </Link>
        ))}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })
  
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    const formattedPrice = new Intl.NumberFormat('de', {
      style: 'currency',
      currency: 'EUR',
    }).format(price.unit_amount as number / 100)

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price,
      currency: 'EUR',
      sku: product.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, //2 hours
  }
}