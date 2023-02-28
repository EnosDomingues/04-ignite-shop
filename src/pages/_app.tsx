import { globalStyles } from '@/styles/global'
import { Container } from '@/styles/pages/app'
import type { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart'

import { Header } from '@/components/Header'
import { Cart } from '@/components/Cart'
import { useState } from 'react'

globalStyles()

const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
const cancelUrl = `${process.env.NEXT_URL}/`

export default function App({ Component, pageProps }: AppProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <Container>
      <CartProvider
        mode="payment"
        cartMode="client-only"
        stripe={String(process.env.STRIPE_PUBLIC_KEY)}
        successUrl={successUrl}
        cancelUrl={cancelUrl}
        currency="EUR"
        shouldPersist
      >
        <Header setIsOpen={setIsOpen}/>

        <Cart isOpen={isOpen} setIsOpen={setIsOpen} />

        <Component {...pageProps} />
      </CartProvider>
    </Container>
  )
}
