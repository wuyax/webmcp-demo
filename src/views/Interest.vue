<template>
  <div class="interest-calculator">
    <div class="calculator-card glass-card">
      <div class="header">
        <h1 class="title">公积金年度结息计算工具</h1>
        <p class="subtitle">根据每年6月30日结算规则，按1.5%年利率计算利息</p>
      </div>

      <div class="input-section">
        <div class="input-group">
          <label class="label-text">上年度6月30日结息后总额度 (元)</label>
          <div class="input-with-icon">
            <span class="currency-icon">¥</span>
            <input
              type="number"
              v-model="prevBalance"
              placeholder="请输入上一年度公积金账户总额"
              class="styled-input"
            />
          </div>
        </div>

        <div class="deposit-type">
          <span class="label-text">本年度每月公积金存入金额 (元)</span>
          <div class="radio-group">
            <label class="radio-label" :class="{ active: depositType === 'uniform' }">
              <input type="radio" value="uniform" v-model="depositType" />
              <span>每月存入相同金额</span>
            </label>
            <label class="radio-label" :class="{ active: depositType === 'custom' }">
              <input type="radio" value="custom" v-model="depositType" />
              <span>每月存入不同金额</span>
            </label>
          </div>
        </div>

        <div v-if="depositType === 'uniform'" class="uniform-input">
          <div class="input-with-icon">
            <span class="currency-icon">¥</span>
            <input
              type="number"
              v-model="uniformDeposit"
              placeholder="请输入每月公积金存入额"
              class="styled-input"
            />
          </div>
        </div>

        <div v-else class="custom-inputs">
          <div v-for="(month, index) in months" :key="index" class="month-input">
            <span class="month-label">{{ month.name }}</span>
            <input
              type="number"
              v-model="customDeposits[index]"
              placeholder="金额"
              class="styled-input small"
            />
          </div>
        </div>
      </div>

      <div class="result-section">
        <div class="result-header">
          <h2>计算结果</h2>
          <span class="settlement-date">结算日：今年6月30日</span>
        </div>

        <div class="result-grid">
          <div class="result-row">
            <span class="result-label">上年结余产生利息</span>
            <span class="result-value">¥ {{ calculationResult.prevInterest }}</span>
          </div>
          <div class="result-row">
            <span class="result-label">本年新增存入金额</span>
            <span class="result-value">¥ {{ calculationResult.totalDeposits }}</span>
          </div>
          <div class="result-row highlight">
            <span class="result-label">本年新增存入产生利息</span>
            <span class="result-value">¥ {{ calculationResult.depositsInterest }}</span>
          </div>

          <div class="total-display">
            <div class="total-item">
              <span class="total-label">结算总利息</span>
              <span class="total-value highlight-text"
                >¥ {{ calculationResult.totalInterest }}</span
              >
            </div>
            <div class="total-item primary-display">
              <span class="total-label">结息后账户总余额</span>
              <span class="total-value large">¥ {{ calculationResult.finalBalance }}</span>
            </div>
          </div>
        </div>

        <div class="notes-card">
          <div class="notes-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            计算说明
          </div>
          <ul>
            <li>公积金按年利率 <strong>1.5%</strong> 计息，每年 <strong>6月30日</strong> 结息。</li>
            <li>上年结余存满一整年，按全年计算利息。</li>
            <li>本年各月存入额从存入日（假设每月30日）至结息日计算相应月份利息。</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const prevBalance = ref<number | null>(null)
const depositType = ref<'uniform' | 'custom'>('uniform')
const uniformDeposit = ref<number | null>(null)

// 结算周期：从7月到次年6月
const months = [
  { name: '7月', approxMonths: 11 },
  { name: '8月', approxMonths: 10 },
  { name: '9月', approxMonths: 9 },
  { name: '10月', approxMonths: 8 },
  { name: '11月', approxMonths: 7 },
  { name: '12月', approxMonths: 6 },
  { name: '1月', approxMonths: 5 },
  { name: '2月', approxMonths: 4 },
  { name: '3月', approxMonths: 3 },
  { name: '4月', approxMonths: 2 },
  { name: '5月', approxMonths: 1 },
  { name: '6月', approxMonths: 0 },
]

const customDeposits = ref<number[]>(new Array(12).fill(null))

const annualRate = 0.015

const calculationResult = computed(() => {
  const prevBal = prevBalance.value || 0

  // 上期结余的利息（存满一年）
  const prevInterest = prevBal * annualRate

  // 本期缴存的利息
  let depositsInterest = 0
  let totalDeposits = 0

  for (let i = 0; i < 12; i++) {
    const deposit =
      depositType.value === 'uniform'
        ? uniformDeposit.value || 0
        : Number(customDeposits.value[i] || 0)

    totalDeposits += deposit

    // 每月30日存入，当年利息按月计算：存入额 * 年利率 * (计息月数 / 12)
    const monthsRemaining = months[i].approxMonths
    const interestForThisMonth = deposit * annualRate * (monthsRemaining / 12)
    depositsInterest += interestForThisMonth
  }

  const totalInterest = prevInterest + depositsInterest
  const finalBalance = prevBal + totalDeposits + totalInterest

  return {
    prevInterest: prevInterest.toLocaleString('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    depositsInterest: depositsInterest.toLocaleString('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    totalInterest: totalInterest.toLocaleString('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    totalDeposits: totalDeposits.toLocaleString('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    finalBalance: finalBalance.toLocaleString('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  }
})
</script>

<style scoped>
.interest-calculator {
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
  min-height: 80vh;
}

.calculator-card {
  padding: 3rem;
  width: 100%;
  max-width: 700px;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-soft) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: var(--color-text);
  opacity: 0.7;
  font-size: 1rem;
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.label-text {
  font-weight: 600;
  color: var(--color-heading);
  font-size: 0.95rem;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.currency-icon {
  position: absolute;
  left: 1rem;
  color: var(--primary);
  font-weight: 700;
}

.styled-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  color: var(--color-text);
  font-size: 1rem;
  transition: all 0.2s;
}

.styled-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(8, 145, 178, 0.1);
  background-color: white;
}

.styled-input.small {
  padding: 0.625rem 0.75rem;
  font-size: 0.9rem;
}

.radio-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 0.5rem;
}

.radio-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.radio-label input {
  display: none;
}

.radio-label:hover {
  border-color: var(--primary-soft);
}

.radio-label.active {
  border-color: var(--primary);
  background-color: rgba(8, 145, 178, 0.05);
  color: var(--primary);
  box-shadow: var(--shadow-sm);
}

.custom-inputs {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.02);
  border: 1px dashed var(--color-border);
}

.month-input {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.month-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text);
  opacity: 0.8;
}

.result-section {
  border-top: 1px solid var(--color-border);
  padding-top: 2.5rem;
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.result-header h2 {
  font-size: 1.5rem;
  margin: 0;
}

.settlement-date {
  font-size: 0.875rem;
  color: var(--color-text);
  opacity: 0.6;
}

.result-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.result-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border);
}

.result-row:last-of-type {
  border-bottom: none;
}

.result-label {
  color: var(--color-text);
  opacity: 0.8;
}

.result-value {
  font-weight: 600;
  color: var(--color-heading);
}

.total-display {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.total-item {
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: var(--color-background-soft);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.primary-display {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-soft) 100%);
  color: white;
}

.primary-display .total-label {
  color: rgba(255, 255, 255, 0.8);
}

.primary-display .total-value {
  color: white;
}

.total-label {
  font-size: 0.875rem;
  font-weight: 600;
}

.total-value {
  font-size: 1.25rem;
  font-weight: 700;
}

.total-value.large {
  font-size: 1.75rem;
}

.highlight-text {
  color: var(--cta);
}

.notes-card {
  margin-top: 2.5rem;
  padding: 1.25rem;
  border-radius: 0.75rem;
  background-color: #fffbeb;
  border: 1px solid #fef3c7;
  color: #92400e;
}

.notes-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.notes-card ul {
  padding-left: 1.5rem;
  margin: 0;
  font-size: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

@media (max-width: 640px) {
  .calculator-card {
    padding: 1.5rem;
  }

  .total-display {
    grid-template-columns: 1fr;
  }

  .radio-group {
    grid-template-columns: 1fr;
  }
}
</style>
