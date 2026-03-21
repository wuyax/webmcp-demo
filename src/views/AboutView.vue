<template>
  <div class="about">
    <h1>This is an about page</h1>

    <button @click="visitAboutPage">访问关于页面</button>

    <div>e.agentInvoked</div>
    <div>e.respondWith()</div>
    <form action="" toolName="submitForm" toolDescription="提交表单">
      <input type="text" v-model="name" name="name" toolName="name" toolDescription="姓名" />
      <button type="submit" toolName="submit" toolDescription="提交">提交</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const name = ref('')
const visitAboutPage = () => {
  window.__callTool('visitAboutPage', { path: '/about' })
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
}
</style>
