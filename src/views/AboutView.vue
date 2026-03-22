<template>
  <div class="about-container">
    <div class="about-content glass-card">
      <h1 class="about-title">About AI Ready Web</h1>
      <p class="about-intro">
        We are building the next generation of web applications. Our platform is designed to be
        fast, modern, and ready for the future of AI.
      </p>

      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-icon">🚀</div>
          <h3>Modern Stack</h3>
          <p>Built with Vue 3, Vite, and TypeScript for the best developer experience.</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🎨</div>
          <h3>Clean Design</h3>
          <p>Beautiful glassmorphism UI that works perfectly on all devices.</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🤖</div>
          <h3>AI Integrated</h3>
          <p>Ready to integrate with modern AI tools and LLMs seamlessly.</p>
        </div>
      </div>

      <div class="cta-section">
        <button @click="visitAboutPage" class="btn-primary">Learn More</button>
      </div>

      <div class="hidden-elements" v-if="showDebug">
        <div>e.agentInvoked</div>
        <div>e.respondWith()</div>
        <form action="" @submit.prevent="submitForm">
          <input type="text" v-model="name" placeholder="Your Name" class="styled-input" />
          <button type="submit" class="btn-cta">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const name = ref('')
const showDebug = ref(false)

const visitAboutPage = () => {
  // Keeping the original tool call logic if needed
  if (window.__callTool) {
    window.__callTool('visitAboutPage', { path: '/about' })
  }
}

const submitForm = () => {
  console.log('Form submitted:', name.value)
}
</script>

<style scoped>
.about-container {
  display: flex;
  justify-content: center;
  padding: 4rem 1rem;
}

.about-content {
  max-width: 900px;
  padding: 4rem;
  text-align: center;
}

.about-title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-soft) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.about-intro {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--color-text);
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-item {
  padding: 2rem;
  border-radius: 1rem;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  transition: transform 0.2s;
}

.feature-item:hover {
  transform: translateY(-5px);
  border-color: var(--primary-soft);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-item h3 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--primary);
}

.feature-item p {
  font-size: 0.95rem;
  color: var(--color-text);
  opacity: 0.8;
}

.cta-section {
  margin-top: 2rem;
}

.hidden-elements {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px dashed var(--color-border);
  font-size: 0.8rem;
  opacity: 0.5;
}

@media (max-width: 640px) {
  .about-content {
    padding: 2.5rem 1.5rem;
  }

  .about-title {
    font-size: 2rem;
  }
}
</style>
