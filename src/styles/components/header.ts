import { styled } from "..";

export const HeaderConteiner = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',

  button: {
    width: '3rem',
    height: '3rem',
    lineHeight: 0,
    background: '$gray800',
    border: 0,
    cursor: 'pointer',
    borderRadius: 6,
    position: 'relative',

    image: {
      with: '1.5rem',
      height: '1.5rem',
    },

    span: {
      position: 'absolute',
      background: '$green500',
      height: '1.5rem',
      width: '1.5rem',
      fontWeight: 'bold',
      color: '$gray100',
      border: '3px solid $gray900',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', 

      top: 0,
      right: 0,
      transform: 'translate(40%, -40%)',
      borderRadius: '50%',
    },
  }
})