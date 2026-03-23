import { useInterestStore, type DepositType } from '@/stores/interest'

declare global {
  interface Navigator {
    modelContext?: {
      registerTool: (tool: any) => void
      unregisterTool: (tool: any) => void
    }
  }
}

if ('modelContext' in navigator) {
  // 获取公积金结息计算状态
  navigator.modelContext?.registerTool({
    name: 'getInterestCalculationState',
    description: '获取公积金年度结息计算的当前输入状态和所有计算结果（包括利息、总额等）',
    readOnly: true,
    inputSchema: {
      type: 'object',
      properties: {},
    },
    async execute() {
      const store = useInterestStore()
      return {
        inputs: {
          prevBalance: store.prevBalance,
          depositType: store.depositType,
          uniformDeposit: store.uniformDeposit,
          customDeposits: store.customDeposits,
        },
        results: store.calculationResult,
      }
    },
  })

  // 设置并计算公积金结息
  navigator.modelContext?.registerTool({
    name: 'calculateInterest',
    description: '通过设置输入参数（上年余额、缴存金额等）来执行公积金结息计算，并实时更新页面显示',
    readOnly: false,
    inputSchema: {
      type: 'object',
      properties: {
        prevBalance: {
          type: 'number',
          description: '上年结转余额',
        },
        depositType: {
          type: 'string',
          enum: ['uniform', 'custom'],
          description: '缴存类型：uniform (每月固定金额), custom (每月不同金额)',
        },
        uniformDeposit: {
          type: 'number',
          description: '月缴存额（仅在 depositType 为 uniform 时有效）',
        },
        customDeposits: {
          type: 'array',
          items: { type: 'number' },
          description: '每月缴存额数组（从7月开始，不足12个月将自动补0，仅在 depositType 为 custom 时有效）',
          maxItems: 12,
        },
      },
    },
    async execute(params: {
      prevBalance?: number
      depositType?: DepositType
      uniformDeposit?: number
      customDeposits?: number[]
    }) {
      const store = useInterestStore()
      
      if (params.prevBalance !== undefined) {
        store.setPrevBalance(params.prevBalance)
      }
      if (params.depositType !== undefined) {
        store.setDepositType(params.depositType)
      }
      if (params.uniformDeposit !== undefined) {
        store.setUniformDeposit(params.uniformDeposit)
      }
      if (params.customDeposits !== undefined) {
        const fullDeposits = [...params.customDeposits]
        while (fullDeposits.length < 12) {
          fullDeposits.push(0)
        }
        store.setAllCustomDeposits(fullDeposits)
      }
      
      return {
        success: true,
        message: '计算已完成，页面数据已同步更新',
        updatedInputs: {
          prevBalance: store.prevBalance,
          depositType: store.depositType,
          uniformDeposit: store.uniformDeposit,
          customDeposits: store.customDeposits,
        },
        calculationResults: store.calculationResult,
      }
    },
  })
}
