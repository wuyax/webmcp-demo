<template>
  <div class="w-full">
    <!-- Page Header -->
    <header class="mb-10 lg:mb-14 border-l-8 border-primary pl-6 py-2">
      <h1 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
        公积金年度结息计算
      </h1>
      <p class="text-lg text-slate-500 dark:text-slate-400 font-medium">
        精准计算每年 6 月 30 日结算利息，让每一分收益都有迹可循
      </p>
    </header>

    <!-- 2-Column Responsive Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- Left Column: Input Form (Takes up 7 columns on LG) -->
      <div class="lg:col-span-7 space-y-8 bg-white dark:bg-slate-800 p-6 md:p-10 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-300">
        
        <!-- Input: Previous Balance -->
        <div class="space-y-3">
          <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            上年度结余 (6月30日结息后总额)
          </label>
          <div class="relative group">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-primary transition-colors text-xl">¥</span>
            <input 
              type="number" 
              v-model="prevBalance" 
              placeholder="0.00" 
              class="w-full pl-10 pr-4 py-4 rounded-xl border-2 border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-2xl focus:outline-none focus:border-primary focus:bg-white dark:focus:bg-slate-950 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
            />
          </div>
        </div>

        <!-- Input: Deposit Type Tabs -->
        <div class="space-y-3">
          <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            本年度存入方式
          </label>
          <div class="flex p-1.5 bg-slate-100 dark:bg-slate-900 rounded-xl">
            <button 
              @click="depositType = 'uniform'"
              :class="depositType === 'uniform' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'"
              class="flex-1 py-3 rounded-lg font-bold transition-all duration-200"
            >
              每月相同
            </button>
            <button 
              @click="depositType = 'custom'"
              :class="depositType === 'custom' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'"
              class="flex-1 py-3 rounded-lg font-bold transition-all duration-200"
            >
              每月不同
            </button>
          </div>
        </div>

        <!-- Uniform Deposit Input -->
        <div v-if="depositType === 'uniform'" class="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            每月固定存入金额
          </label>
          <div class="relative group">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-primary transition-colors text-xl">¥</span>
            <input 
              type="number" 
              v-model="uniformDeposit" 
              placeholder="0.00" 
              class="w-full pl-10 pr-4 py-4 rounded-xl border-2 border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-2xl focus:outline-none focus:border-primary focus:bg-white dark:focus:bg-slate-950 transition-all"
            />
          </div>
        </div>

        <!-- Custom Monthly Grid -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-300">
          <div v-for="(month, index) in months" :key="index" class="space-y-1.5">
            <label class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
              {{ month.name }}
            </label>
            <input 
              type="number" 
              v-model="customDeposits[index]" 
              placeholder="0" 
              class="w-full px-3 py-2.5 rounded-lg border-2 border-white dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:border-primary transition-all"
            />
          </div>
        </div>

        <!-- Desktop Only Rule Information -->
        <footer class="mt-12 p-6 rounded-xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-100 dark:border-amber-900/50 hidden md:block">
          <div class="flex items-center gap-2 mb-4">
            <span class="px-2.5 py-1 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 text-[10px] font-black uppercase tracking-widest">计算规则</span>
          </div>
          <ul class="space-y-3 text-sm text-amber-900/80 dark:text-amber-200/80 font-semibold list-disc pl-5 leading-relaxed">
            <li>计息年利率按 <span class="text-amber-600 dark:text-amber-400 font-black">1.5%</span> 固定利率。</li>
            <li>结算节点固定为每年 <span class="font-bold underline decoration-amber-500/50">6月30日</span>。</li>
            <li>遵循公积金中心标准算法：本金存期按月折算利息。</li>
          </ul>
        </footer>
      </div>

      <!-- Right Column: Results Sidebar (Takes up 5 columns on LG) -->
      <aside class="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
        
        <!-- Summary Dashboard -->
        <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden relative">
          <h2 class="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
             结算结果预览
          </h2>

          <div class="space-y-4">
            <!-- Mini Result Cards -->
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700">
                <p class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase mb-1">上年利息</p>
                <p class="text-lg font-bold text-slate-900 dark:text-white">¥ {{ calculationResult.prevInterest }}</p>
              </div>
              <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700">
                <p class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase mb-1">本年存入</p>
                <p class="text-lg font-bold text-slate-900 dark:text-white">¥ {{ calculationResult.totalDeposits }}</p>
              </div>
            </div>

            <!-- Focus Result Card -->
            <div class="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-100 dark:border-emerald-900/50 flex justify-between items-center group hover:scale-[1.02] transition-transform cursor-default">
              <div>
                <p class="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">本年新增存入利息</p>
                <p class="text-2xl font-black text-emerald-700 dark:text-emerald-300">¥ {{ calculationResult.depositsInterest }}</p>
              </div>
              <div class="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg text-emerald-600 dark:text-emerald-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 2v20m-5-15 5-5 5 5"/></svg>
              </div>
            </div>

              <!-- Main Totals -->
            <div class="space-y-4 pt-4">
              <div class="flex justify-between items-end p-6 bg-slate-900 dark:bg-black rounded-xl text-white shadow-lg relative overflow-hidden">
                <div class="relative z-10">
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">最终结算总利息</p>
                  <p class="text-3xl font-black text-white">¥ {{ calculationResult.totalInterest }}</p>
                </div>
                <div class="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 text-white/5 scale-150 rotate-12">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20m7-15l-7-7-7 7"/></svg>
                </div>
              </div>

              <!-- Fixed Background/Text Conflict Area -->
              <div class="flex justify-between items-center p-6 bg-gradient-to-br from-primary-dark to-cyan-900 rounded-xl text-white shadow-xl ring-2 ring-primary/20">
                <div>
                  <p class="text-[10px] font-black text-cyan-200 uppercase tracking-widest mb-1">结息后账户总额</p>
                  <p class="text-4xl font-black text-white drop-shadow-sm">¥ {{ calculationResult.finalBalance }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Only Rule Information (Shown at bottom on small screens) -->
        <footer class="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-100 dark:border-amber-900/50 md:hidden">
          <h4 class="text-sm font-black text-amber-900 dark:text-amber-100 uppercase tracking-widest mb-4">核心计息逻辑</h4>
          <p class="text-sm text-amber-900/80 dark:text-amber-200/80 font-bold leading-relaxed">
            利率统一按 1.5% 执行，每年 6 月 30 日系统自动结息入账。上年滚存本金计全年息，当年新增缴存按月折算。
          </p>
        </footer>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const prevBalance = ref<number | null>(null)
const depositType = ref<'uniform' | 'custom'>('uniform')
const uniformDeposit = ref<number | null>(null)

const months = [
  { name: '7月', approxMonths: 11 }, { name: '8月', approxMonths: 10 },
  { name: '9月', approxMonths: 9 }, { name: '10月', approxMonths: 8 },
  { name: '11月', approxMonths: 7 }, { name: '12月', approxMonths: 6 },
  { name: '1月', approxMonths: 5 }, { name: '2月', approxMonths: 4 },
  { name: '3月', approxMonths: 3 }, { name: '4月', approxMonths: 2 },
  { name: '5月', approxMonths: 1 }, { name: '6月', approxMonths: 0 },
]

const customDeposits = ref<number[]>(new Array(12).fill(null))
const annualRate = 0.015

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
</script>

<style scoped>
/* Any non-standard animations can go here */
.animate-in {
  animation-duration: 0.3s;
  animation-fill-mode: both;
}
</style>
