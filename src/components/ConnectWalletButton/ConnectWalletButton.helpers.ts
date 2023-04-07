import type { Address } from 'wagmi'

export function truncateAddress(address: Address) {
  const length = address.length
  const prefix = address.slice(0, 5)
  const suffix = address.slice(length - 2, length)

  return `${prefix}...${suffix}`
}
