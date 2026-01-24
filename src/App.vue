<template>
  <div id="app" class="min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-grow">
      <router-view />
    </main>
    <FooterSection />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Work Sans', sans-serif;
}
</style>
