import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export type DepositType = 'uniform' | 'custom'

export const useInterestStore = defineStore('interest', () => {
  const prevBalance = ref<number | null>(null)
  const depositType = ref<DepositType>('uniform')
  const uniformDeposit = ref<number | null>(null)
  const customDeposits = ref<number[]>(new Array(12).fill(null))
  const annualRate = 0.015

  const months = [
    { name: '7月', approxMonths: 11 }, { name: '8月', approxMonths: 10 },
    { name: '9月', approxMonths: 9 }, { name: '10月', approxMonths: 8 },
    { name: '11月', approxMonths: 7 }, { name: '12月', approxMonths: 6 },
    { name: '1月', approxMonths: 5 }, { name: '2月', approxMonths: 4 },
    { name: '3月', approxMonths: 3 }, { name: '4月', approxMonths: 2 },
    { name: '5月', approxMonths: 1 }, { name: '6月', approxMonths: 0 },
  ]

  const calculationResult = computed(() => {
    const prevBal = prevBalance.value || 0
    const prevInterest = prevBal * annualRate
    let depositsInterest = 0
    let totalDeposits = 0
    
    for (let i = 0; i < 12; i++) {
      const deposit = depositType.value === 'uniform' 
        ? (uniformDeposit.value || 0) 
        : Number(customDeposits.value[i] || 0)
      totalDeposits += deposit
      const monthsRemaining = months[i].approxMonths
      depositsInterest += deposit * annualRate * (monthsRemaining / 12)
    }
    
    const totalInterest = prevInterest + depositsInterest
    const finalBalance = prevBal + totalDeposits + totalInterest
    
    const format = (val: number) => val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    
    return {
      prevInterest: format(prevInterest),
      depositsInterest: format(depositsInterest),
      totalInterest: format(totalInterest),
      totalDeposits: format(totalDeposits),
      finalBalance: format(finalBalance),
    }
  })

  function setPrevBalance(value: number | null) {
    prevBalance.value = value
  }

  function setDepositType(type: DepositType) {
    depositType.value = type
  }

  function setUniformDeposit(value: number | null) {
    uniformDeposit.value = value
  }

  function setCustomDeposit(index: number, value: number | null) {
    if (index >= 0 && index < 12) {
      customDeposits.value[index] = value
    }
  }

  function setAllCustomDeposits(values: (number | null)[]) {
    if (values.length === 12) {
      customDeposits.value = values
    }
  }

  return {
    prevBalance,
    depositType,
    uniformDeposit,
    customDeposits,
    annualRate,
    months,
    calculationResult,
    setPrevBalance,
    setDepositType,
    setUniformDeposit,
    setCustomDeposit,
    setAllCustomDeposits,
  }
})
