import { CartContainer, CartFooter, CartProduct, CartProductContainer, CloseCartButton } from "@/styles/components/cart";
import { formatPrice, formatPriceNumber } from "@/util/formatPrice";
import axios from "axios";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import closeIcon from '../assets/close.svg'

interface CartProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function Cart({ isOpen, setIsOpen }: CartProps) {
  const { cartDetails, removeItem } = useShoppingCart()

  const [isCreatingCheckoutSession, setisCreatingCheckoutSession] = useState(false)

  if(!cartDetails) return <></>

  const purchaseDetails = Object.keys(cartDetails).reduce((acc, item) => {
    const cartItem = cartDetails[item]
    acc.quantity += cartItem.quantity
    acc.total += (cartItem.price as unknown as { unit_amount: number }).unit_amount * cartItem.quantity
    acc.id = cartItem.id
    return acc
  }, { quantity: 0, total: 0, id: '' })

  async function handleBuyProducts() {
    try {
      setisCreatingCheckoutSession(true)

      const items = Object.keys(cartDetails || []).map(item => {
        if(cartDetails) {
          return cartDetails[item]
        }
      })

      
      const { data } = await axios.post('/api/checkout', {
        items,
      })
      
      const { checkoutUrl } = data

      window.location.href = checkoutUrl 
    } catch (error) {
      // Conectar com uma ferramenta de observabilidade
      setisCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <>
      {isOpen ? 
        (
          <CartContainer>
            <CloseCartButton onClick={() => setIsOpen(false)}>
              <Image src={closeIcon} alt="" />
            </CloseCartButton>

            <CartProductContainer>
              <header>
                <h1>Sacola de Compras</h1>
              </header>
              {!!cartDetails && Object.keys(cartDetails).map(item => {
                const cartItem = cartDetails[item]
                return (
                  <CartProduct key={cartItem.id}>
                    <div>
                      <Image width={102} height={93} src={cartItem?.imageUrl} alt="" />
                    </div>
                    <section>
                      <span >{cartItem.name}</span>
                      <b>{formatPrice(cartItem.price)}</b>
                      <strong>x{cartItem.quantity}</strong>
                      <a href="" onClick={() => removeItem(cartItem.id)}>Remover</a>
                    </section>
                  </CartProduct>
                )
              })}
            </CartProductContainer>

            <CartFooter>
              <div id="quantity">
                <span>Quantidade</span>
                <span>{purchaseDetails.quantity} itens</span>
              </div>
              <div id="total">
                <strong>Valor total</strong>
                <b id="total-value">{formatPriceNumber(purchaseDetails.total)}</b>
              </div>
              <button disabled={isCreatingCheckoutSession} onClick={handleBuyProducts}>
                Finalizar Compra
              </button>
            </CartFooter>
          </CartContainer>
      ): (
        <></>
      )}    
    </>
  )
}