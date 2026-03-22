<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="hero">
    <div class="hero-content glass-card">
      <div class="badge">Next Generation</div>
      <h1 class="hero-title">Your Future with AI Ready Web</h1>
      <p class="hero-description">
        Experience the power of modern web development with a clean, fast, and AI-ready platform.
        Build your next idea with confidence.
      </p>

      <div class="hero-actions">
        <button class="btn-cta">Explore Now</button>
        <RouterLink to="/interest" class="btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-calculator"
          >
            <rect width="16" height="20" x="4" y="2" rx="2" />
            <line x1="8" x2="16" y1="6" y2="6" />
            <line x1="16" x2="16" y1="14" y2="18" />
            <path d="M16 10h.01" />
            <path d="M12 10h.01" />
            <path d="M8 10h.01" />
            <path d="M12 14h.01" />
            <path d="M8 14h.01" />
            <path d="M12 18h.01" />
            <path d="M8 18h.01" />
          </svg>
          Try Calculator
        </RouterLink>
      </div>

      <div class="hero-stats">
        <div class="stat-item">
          <div class="stat-value">100+</div>
          <div class="stat-label">Features</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">10k+</div>
          <div class="stat-label">Users</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">99.9%</div>
          <div class="stat-label">Uptime</div>
        </div>
      </div>
    </div>

    <div class="hero-decoration">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(80vh - 100px);
  position: relative;
  overflow: hidden;
  padding: 2rem 0;
}

.hero-content {
  max-width: 800px;
  padding: 4rem;
  text-align: center;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.badge {
  background-color: var(--color-background-soft);
  color: var(--primary);
  padding: 0.35rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid var(--primary-soft);
}

.hero-title {
  font-size: 3.5rem;
  line-height: 1.1;
  letter-spacing: -0.025em;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-soft) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--color-text);
  max-width: 600px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.hero-stats {
  display: flex;
  gap: 3rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--glass-border);
  width: 100%;
  justify-content: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-text);
  opacity: 0.7;
}

.hero-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
}

.circle-1 {
  width: 400px;
  height: 400px;
  background-color: var(--primary-soft);
  top: -100px;
  right: -100px;
}

.circle-2 {
  width: 300px;
  height: 300px;
  background-color: #f472b6;
  bottom: -50px;
  left: -50px;
}

.circle-3 {
  width: 250px;
  height: 250px;
  background-color: var(--cta);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.1;
}

@media (max-width: 768px) {
  .hero-content {
    padding: 2.5rem 1.5rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.1rem;
  }

  .hero-stats {
    gap: 1.5rem;
  }
}
</style>
