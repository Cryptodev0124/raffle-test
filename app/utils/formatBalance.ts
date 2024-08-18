export function formatEthAmount(value: number, decimals: number = 18): number {
    try {
    //   const bigintValue = BigInt(value)
    //   const factor = BigInt(10 ** decimals)
      const integralPart = value / 10 ** decimals
    //   const fractionalPart = bigintValue % factor
    //   const fractionalAsString = fractionalPart.toString().padStart(decimals, '0') // Ensure 18 decimal places
  
      // Combine integral and fractional parts and convert to a floating-point number
      return Number(integralPart.toString())
    } catch (e) {
      return 0
    }
  }