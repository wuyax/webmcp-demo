declare global {
  interface Navigator {
    modelContext?: {
      registerTool: (tool: any) => void
      unregisterTool: (tool: any) => void
    }
  }
}

if ('modelContext' in navigator) {
  navigator.modelContext?.registerTool({
    name: 'visitAboutPage', // 工具名（camelCase）
    description: '访问关于页面',
    readOnly: true, // true = 只读，无需用户确认
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: '页面路径',
        },
      },
    },
    async execute(params: { path: string }) {
      return visitAboutPage(params.path)
    },
  })
}

const visitAboutPage = async (path: string) => {
  window.location.href = path
  return { success: true }
}
