export function formatPrice(price: any) {
  return new Intl.NumberFormat('de', {
    style: 'currency',
    currency: 'EUR',
  }).format(price.unit_amount as number / 100)
}

export function formatPriceNumber(price: any) {
  return new Intl.NumberFormat('de', {
    style: 'currency',
    currency: 'EUR',
  }).format(price / 100)
}