import { useInterestStore } from '@/stores/interest'

declare global {
  interface Window {
    __AI_TOOLS__: any
    __callTool: any
  }
}

window.__AI_TOOLS__ = {
  version: '1.2.0',
  tools: [
    {
      name: 'get_interest_calculation_state',
      description: '获取公积金年度结息计算的当前输入状态和所有计算结果',
      parameters: {},
    },
    {
      name: 'calculate_interest',
      description: '执行公积金年度结息计算并更新显示',
      parameters: {
        prevBalance: {
          type: 'number',
          description: '上年结转余额',
        },
        depositType: {
          type: 'string',
          enum: ['uniform', 'custom'],
          description: '缴存类型：uniform (固定金额), custom (每月不同)',
        },
        uniformDeposit: {
          type: 'number',
          description: '月缴存额',
        },
        customDeposits: {
          type: 'array',
          items: { type: 'number' },
          description: '每月缴存额数组（从7月开始，自动补0）',
        },
      },
    },
  ],
}

window.__callTool = async (toolName: string, args: any) => {
  const store = useInterestStore()

  switch (toolName) {
    case 'get_interest_calculation_state':
      return {
        inputs: {
          prevBalance: store.prevBalance,
          depositType: store.depositType,
          uniformDeposit: store.uniformDeposit,
          customDeposits: store.customDeposits,
        },
        results: store.calculationResult,
      }
    case 'calculate_interest':
      if (args.prevBalance !== undefined) store.setPrevBalance(args.prevBalance)
      if (args.depositType !== undefined) store.setDepositType(args.depositType)
      if (args.uniformDeposit !== undefined) store.setUniformDeposit(args.uniformDeposit)
      if (args.customDeposits !== undefined) {
        const fullDeposits = [...args.customDeposits]
        while (fullDeposits.length < 12) {
          fullDeposits.push(0)
        }
        store.setAllCustomDeposits(fullDeposits)
      }
      return {
        success: true,
        inputs: {
          prevBalance: store.prevBalance,
          depositType: store.depositType,
          uniformDeposit: store.uniformDeposit,
          customDeposits: store.customDeposits,
        },
        results: store.calculationResult,
      }
    default:
      return { error: `Unknown tool: ${toolName}` }
  }
}
