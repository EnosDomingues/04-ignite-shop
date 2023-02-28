import { styled } from "..";

export const CartContainer = styled('main', {
  backgroundColor: '$gray800',
  width: '30rem',
  height: '100vh',
  position: 'absolute',
  zIndex: 11,
  right: 0,
  overflow: 'auto',

  display: 'flex',
  flexDirection: 'column',
})

export const CartProductContainer = styled('div', {
  h1: {
    fontSize: '$lg',
    padding: '1rem 3rem',
  },

  overflow: 'auto',
})

export const CloseCartButton = styled('button', {
  alignSelf: 'end',
  lineHeight: 0,
  cursor: 'pointer',
  border: 0,
  background: 'transparent',
  margin: '1.5rem',

  width: '1.5rem',
  height: '1.5rem',
})

export const CartFooter = styled('footer', {
  marginTop: 'auto',
  display: 'flex',
  flexDirection: 'column',
  padding: '3rem 3rem 3rem 3rem',

  button: {
    marginTop: '3.5625rem',
    background: '$green500',
    width: '100%',
    border: 0,
    height: '4.3125rem',
    cursor: 'pointer',
    borderRadius: 8,
    fontWeight: 'bold',
    fontSize: '$md',
    color: 'white',
  },

  'div[id=quantity]': {
    fontSize: '$sm',
    display: 'flex',
    fontHeight: 1.6,
    justifyContent: 'space-between',
  },

  'div[id=total]': {
    marginTop: '1rem',
    fontSize: '$md',
    display: 'flex',
    fontHeight: 1.6,
    justifyContent: 'space-between',

    'b[id=total-value]': {
      fontSize: '$xl',
      fontHeight: 1.6,
    }
  },
})

export const CartProduct = styled('div', {
  width: '100%',
  padding: '1rem 3rem',
  color: '$gray100',
  display: 'flex',

  '& > div': {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    marginRight: '1.25rem',
  },

  span: {
    fontSize: '$md',
    display: 'block',
    marginBottom: '2px',
    lineHeight: 1.6,
  },

  strong: {
    fontSize: '$md',
    marginLeft: '2rem',
    lineHeight: 1.6,
  },

  a: {
    fontSize: '$md',
    color: '$green500',
    textDecoration: 'none',
    display: 'block',
    marginTop: '0.5rem',
  },
  
  section: {
    width: '100%',
  },

  b: {
    fontSize: '$md',
    color: '$gray300',
    marginRight: '1rem',
    lineHeight: 1.6,
  },
})