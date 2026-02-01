<template>
  <div id="app" class="min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-grow">
      <router-view />
    </main>
    <FooterSection />
    <!-- Chat List -->
    <div
      v-if="showChatList"
      class="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto"
    >
      <div class="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 class="font-semibold">Chọn người nhận</h3>
        <button @click="showChatList = false" class="text-white hover:text-gray-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="divide-y">
        <button
          v-for="contact in chatContacts"
          :key="contact.id"
          @click="openChat(contact)"
          class="w-full p-4 hover:bg-gray-50 transition-colors text-left flex items-center gap-3"
        >
          <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
            {{ contact.name.charAt(0) }}
          </div>
          <div>
            <div class="font-medium text-gray-900">{{ contact.name }}</div>
            <div class="text-sm text-gray-500">{{ contact.role }}</div>
          </div>
        </button>
      </div>
    </div>
    <!-- Chat Component -->
    <ChatComponent
      v-if="showChatBox && selectedRecipient"
      :recipient="selectedRecipient"
      @close="closeChatBox"
    />
    <!-- Floating Chat Icon -->
    <button
      @click="showChatList = true"
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
import { ref, computed } from 'vue';
import { useAuthStore } from './stores/auth';
import chatContactsData from './data/chatContacts.json';

const authStore = useAuthStore();
const showChatList = ref(false);
const showChatBox = ref(false);
const selectedRecipient = ref(null);

// Lấy danh sách chat dựa trên user hiện tại
const chatContacts = computed(() => {
  if (!authStore.currentUser) {
    return [];
  }
  return chatContactsData[authStore.currentUser.id] || [];
});

const openChat = (contact) => {
  selectedRecipient.value = {
    name: contact.name,
    gender: contact.gender
  };
  showChatList.value = false;
  showChatBox.value = true;
};

const closeChatBox = () => {
  showChatBox.value = false;
  selectedRecipient.value = null;
};
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
