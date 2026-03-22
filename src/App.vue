<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="navbar-wrapper">
    <nav class="navbar glass-card">
      <div class="nav-brand">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="32" height="32" />
        <span class="brand-name">AI Ready Web</span>
      </div>

      <div class="nav-links">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
        <RouterLink to="/interest" class="nav-link">Calculator</RouterLink>
      </div>

      <div class="nav-actions">
        <button class="btn-primary">Get Started</button>
      </div>
    </nav>
  </header>

  <main class="content-container">
    <RouterView />
  </main>
</template>

<style scoped>
.navbar-wrapper {
  position: sticky;
  top: 1.5rem;
  z-index: 100;
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  width: 100%;
  max-width: 1000px;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-name {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--primary);
  letter-spacing: -0.025em;
}

.nav-links {
  display: flex;
  gap: 0.5rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  color: var(--color-text);
  transition: all 0.2s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--primary);
}

.nav-link.router-link-active {
  color: var(--primary);
  background-color: var(--color-background-mute);
}

.nav-actions {
  display: none;
}

.content-container {
  padding-bottom: 4rem;
}

@media (min-width: 768px) {
  .nav-actions {
    display: block;
  }
}

@media (max-width: 640px) {
  .brand-name {
    display: none;
  }

  .navbar {
    padding: 0.5rem 1rem;
  }

  .nav-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }
}
</style>
