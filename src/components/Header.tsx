import Image from 'next/image'
import logoImage from '../assets/logo.svg'
import cartIcon from '../assets/cart.svg'
import { useShoppingCart } from 'use-shopping-cart'
import { HeaderConteiner } from '@/styles/components/header'
import { Dispatch, SetStateAction } from 'react'


interface HeaderProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function Header({ setIsOpen }: HeaderProps) {
  const { cartDetails } = useShoppingCart()
  
  
  return (
    <HeaderConteiner>
      <Image src={logoImage} alt="" />
      
      <button onClick={() => setIsOpen(true)}>
        <Image src={cartIcon} alt="" />
        <span>
          {!!cartDetails && Object.keys(cartDetails).length}
        </span>
      </button>
    </HeaderConteiner>
  )
}