<template>
  <div id="app" class="min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-grow">
      <router-view />
    </main>
    <FooterSection />
    <!-- Chat Component -->
    <ChatComponent
      v-if="showChatBox"
      :recipient="{ name: 'Cô Tuyền (GVCN)', gender: 'female' }"
      @close="showChatBox = false"
    />
    <!-- Floating Chat Icon -->
    <button
      @click="showChatBox = true"
      class="p-0 bg-transparent border-0 outline-none focus:outline-none fixed bottom-6 right-6 w-16 h-16  text-white rounded-full hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-40"
      title="Chat với giáo viên"
    >
      <!-- chat icon iamge -->
       <div class="flex flex-col items-center">
        <img src="./assets/chat.png" class="" alt="Chat Icon" />
      </div>
    </button>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
import ChatComponent from './components/ChatComponent.vue';
import { ref } from 'vue';

const showChatBox = ref(false);
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
