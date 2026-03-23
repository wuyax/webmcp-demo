<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300"
  >
    <!-- Main Content Container -->
    <main class="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer
      class="w-full bg-white dark:bg-slate-950 border-t-2 border-slate-200 dark:border-slate-800 py-6"
    >
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-sm font-semibold text-slate-500 dark:text-slate-400">
          © 2026 公积金结息计算工具 · 极简高效
        </p>
      </div>
    </footer>
  </div>
</template>

<style>
/* Global Tailwind Directives are in main.css */
</style>
