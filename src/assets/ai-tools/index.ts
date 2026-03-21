declare global {
  interface Window {
    __AI_TOOLS__: any
    __callTool: any
  }
}

window.__AI_TOOLS__ = {
  version: '1.0.0',
  tools: [
    {
      name: 'visit_about_page',
      description: '访问关于页面',
      parameters: {
        path: {
          type: 'string',
          description: '页面路径',
        },
        required: ['path'],
      },
    },
  ],
}

window.__callTool = async (toolName: string, args: any) => {
  const tool = window.__AI_TOOLS__.tools.find((t: any) => t.name === toolName)
  if (!tool) return { error: `Unknown tool: ${toolName}` }

  switch (toolName) {
    case 'visit_about_page':
      return visitAboutPage(args.path)
    default:
      return { error: `Unknown tool: ${toolName}` }
  }
}

const visitAboutPage = async (path: string) => {
  window.location.href = path
  return { success: true }
}
