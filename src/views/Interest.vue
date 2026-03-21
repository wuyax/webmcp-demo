<template>
  <div class="interest-calculator">
    <div class="calculator-card">
      <h1 class="title">🏠 公积金年度结息计算工具</h1>
      <p class="subtitle">根据每年6月30日结算规则，按1.5%年利率计算利息</p>
      
      <div class="input-section">
        <label>
          <span class="label-text">上年度6月30日结息后总额度 (元)</span>
          <input 
            type="number" 
            v-model="prevBalance" 
            placeholder="请输入上一年度公积金账户总额" 
            class="styled-input"
          />
        </label>
        
        <div class="deposit-type">
          <span class="label-text">本年度每月公积金存入金额 (元)</span>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" value="uniform" v-model="depositType" />
              <span>每月存入相同金额</span>
            </label>
            <label class="radio-label">
              <input type="radio" value="custom" v-model="depositType" />
              <span>每月存入不同金额</span>
            </label>
          </div>
        </div>

        <div v-if="depositType === 'uniform'" class="uniform-input">
          <input 
            type="number" 
            v-model="uniformDeposit" 
            placeholder="请输入每月公积金存入额" 
            class="styled-input"
          />
        </div>

        <div v-else class="custom-inputs">
          <div v-for="(month, index) in months" :key="index" class="month-input">
            <span class="month-label">{{ month.name }} (存入后计息 {{ month.approxMonths }} 个月)</span>
            <input 
              type="number" 
              v-model="customDeposits[index]" 
              placeholder="存入金额" 
              class="styled-input small"
            />
          </div>
        </div>
      </div>

      <div class="result-section">
        <h2>计算结果 <span>(结算日：今年6月30日)</span></h2>
        
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">上年结余产生利息</span>
            <span class="result-value">¥ {{ calculationResult.prevInterest }}</span>
          </div>
          <div class="result-item">
            <span class="result-label">本年新增存入金额</span>
            <span class="result-value">¥ {{ calculationResult.totalDeposits }}</span>
          </div>
          <div class="result-item highlight">
            <span class="result-label">本年新增存入产生利息</span>
            <span class="result-value">¥ {{ calculationResult.depositsInterest }}</span>
          </div>
          <div class="result-item total-interest">
            <span class="result-label">今年6月30日结算总利息</span>
            <span class="result-value highlight-text">¥ {{ calculationResult.totalInterest }}</span>
          </div>
          <div class="result-item total-balance">
            <span class="result-label">结息后账户总余额</span>
            <span class="result-value">¥ {{ calculationResult.finalBalance }}</span>
          </div>
        </div>
        
        <div class="notes">
          📝 <strong>计算说明：</strong>
          <ul>
            <li>公积金按年利率 <strong>1.5%</strong> 计息，每年 <strong>6月30日</strong> 结息。</li>
            <li>上年结余存满一整年，按全年计算利息。</li>
            <li>本年各月存入额从存入日（假设每月30日）至结息日计算相应月份利息（如7月30日存入，计息11个月；次年6月30日存入，计0个月利息）。</li>
            <li>结息后账户总余额 = 上年结余 + 本年新增 + 结算总利息。</li>
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
    const deposit = depositType.value === 'uniform' 
      ? (uniformDeposit.value || 0) 
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
    prevInterest: prevInterest.toFixed(2),
    depositsInterest: depositsInterest.toFixed(2),
    totalInterest: totalInterest.toFixed(2),
    totalDeposits: totalDeposits.toFixed(2),
    finalBalance: finalBalance.toFixed(2),
  }
})
</script>

<style scoped>
.interest-calculator {
  display: flex;
  justify-content: center;
  padding: 2rem;
  background-color: var(--color-background-mute);
  min-height: 100vh;
}

.calculator-card {
  background-color: var(--color-background);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  width: 100%;
  max-width: 600px;
  border: 1px solid var(--color-border);
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
  text-align: center;
}

.subtitle {
  text-align: center;
  color: var(--color-text);
  opacity: 0.7;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.label-text {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}

.styled-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-mute);
  color: var(--color-text);
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.styled-input:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
}

.styled-input.small {
  padding: 0.5rem 0.75rem;
  font-size: 0.95rem;
}

.deposit-type {
  margin-top: 0.5rem;
}

.radio-group {
  display: flex;
  gap: 1.5rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
}

.custom-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  background: var(--color-background-soft);
  padding: 1rem;
  border-radius: 8px;
}

.month-input {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.month-label {
  font-size: 0.8rem;
  color: var(--color-text);
  opacity: 0.8;
}

.result-section {
  background-color: var(--color-background-soft);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
}

.result-section h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--color-heading);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.result-section h2 span {
  font-size: 0.85rem;
  font-weight: normal;
  color: var(--color-text);
  opacity: 0.7;
}

.result-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed var(--color-border);
}

.result-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.result-label {
  color: var(--color-text);
}

.result-value {
  font-weight: 600;
  color: var(--color-heading);
}

.highlight-text {
  color: #42b883;
  font-size: 1.4rem;
}

.total-interest {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
}

.total-balance {
  margin-top: 0.5rem;
  padding: 1rem;
  background-color: rgba(66, 184, 131, 0.1);
  border-radius: 8px;
  border: none;
}

.total-balance .result-value {
  color: #42b883;
  font-size: 1.2rem;
}

.notes {
  margin-top: 2rem;
  font-size: 0.85rem;
  color: var(--color-text);
  line-height: 1.6;
  opacity: 0.8;
}

.notes strong {
  color: var(--color-heading);
}

.notes ul {
  margin-top: 0.5rem;
  padding-left: 1.2rem;
}

.notes li {
  margin-bottom: 0.3rem;
}

/* 适配移动端 */
@media (max-width: 600px) {
  .interest-calculator {
    padding: 1rem;
  }
  
  .calculator-card {
    padding: 1.5rem;
  }
  
  .custom-inputs {
    grid-template-columns: 1fr;
  }
  
  .radio-group {
    flex-direction: column;
    gap: 0.8rem;
  }
}
</style>
