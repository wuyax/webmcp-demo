# AI-Ready Web: WebMCP Demonstration Project

This project is a technical demonstration of **WebMCP (Model Context Protocol for Web)**. While it features a functional Housing Provident Fund (公积金) interest calculator, its primary purpose is to showcase how AI agents can interact with, read from, and control a modern web application in real-time.

## 🌟 The WebMCP Vision

WebMCP allows an AI model to treat your web application as a set of structured tools. Instead of just "looking" at the page, the AI can:
1.  **Read State**: Understand the current data inside your Vue/Pinia store.
2.  **Execute Logic**: Trigger complex calculations or business rules defined in your code.
3.  **Update UI**: Modify the application state, causing immediate reactive changes that the user can see.

## 🛠️ How it Works

The project integrates WebMCP through two layers:

### 1. The Reactive Core (Vue 3 + Pinia)
The application state is centralized in `src/stores/interest.ts`. This ensures that when an AI tool modifies a value, the entire UI responds instantly through Vue's reactivity system.

### 2. The WebMCP Bridge (`src/assets/ai-tools/webmcp.ts`)
We register specialized tools into the browser's `navigator.modelContext`, making them available to WebMCP-compatible AI agents:

*   **`getInterestCalculationState`**: Allows the AI to "peek" into the calculator to see what the user has entered and what the current results are.
*   **`calculateInterest`**: A high-level tool that the AI calls to perform "What-if" analysis or help the user fill out the form using natural language.

## 🚀 Key Features Demonstrated

-   **Natural Language Control**: "Set my balance to 50k and assume I deposit 2k monthly." The AI uses `calculateInterest` to manipulate the UI for the user.
-   **Robust Data Handling**: The bridge includes logic to pad partial data (e.g., if the AI only provides 3 months of deposits, the code automatically fills the rest with 0).
-   **Synchronized Context**: The AI always has access to the *real* results calculated by the app's internal logic, ensuring 100% accuracy in its responses.

## 💻 Development Setup

### Project Setup
```sh
pnpm install
```

### Compile and Hot-Reload for Development
```sh
pnpm dev
```

### Build for Production
```sh
pnpm build
```

---

*Note: This project is intended for developers looking to understand the future of AI-native web applications.*
