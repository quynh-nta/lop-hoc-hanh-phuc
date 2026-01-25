<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span class="text-white font-bold text-xl">🎓</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-800">Lớp Học Hạnh Phúc</h1>
            <p class="text-xs text-gray-500">Năm học 2024-2025</p>
          </div>
        </router-link>

        <!-- Mobile menu button -->
        <button 
          @click="showMenu = !showMenu" 
          class="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!showMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Desktop Menu -->
        <ul class="hidden md:flex items-center space-x-6">
          <li><router-link to="/" class="nav-link">Trang chủ</router-link></li>
          <li><router-link to="/thong-bao" class="nav-link">Thông báo</router-link></li>
          <li><router-link to="/hoat-dong" class="nav-link">Hoạt động</router-link></li>
          <li><router-link to="/chia-se" class="nav-link">Góc chia sẻ</router-link></li>
          <li><router-link to="/phu-huynh" class="nav-link">Phụ huynh</router-link></li>
          <li><router-link to="/truyen-thong" class="nav-link">Truyền thông</router-link></li>
          <li><router-link to="/danh-sach" class="nav-link">Danh sách</router-link></li>
        </ul>
      </div>

      <!-- Mobile Menu -->
      <div 
        :class="showMenu ? 'max-h-screen' : 'max-h-0'"
        class="md:hidden overflow-hidden transition-all duration-300"
      >
        <ul class="pb-4 space-y-2">
          <li><router-link to="/" @click="showMenu = false" class="mobile-nav-link">Trang chủ</router-link></li>
          <li><router-link to="/gioi-thieu" @click="showMenu = false" class="mobile-nav-link">Giới thiệu</router-link></li>
          <li><router-link to="/hoat-dong" @click="showMenu = false" class="mobile-nav-link">Hoạt động</router-link></li>
          <li><router-link to="/chia-se" @click="showMenu = false" class="mobile-nav-link">Góc chia sẻ</router-link></li>
          <li><router-link to="/phu-huynh" @click="showMenu = false" class="mobile-nav-link">Phụ huynh</router-link></li>
          <li><router-link to="/truyen-thong" @click="showMenu = false" class="mobile-nav-link">Truyền thông</router-link></li>
          <li><router-link to="/danh-gia" @click="showMenu = false" class="mobile-nav-link">Đánh giá</router-link></li>
          <li><router-link to="/an-toan-so" @click="showMenu = false" class="mobile-nav-link">An toàn số</router-link></li>
          <li><router-link to="/danh-sach" @click="showMenu = false" class="mobile-nav-link">👥 Danh sách lớp</router-link></li>
          <li><router-link to="/lien-he" @click="showMenu = false" class="mobile-nav-link">Liên hệ</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const showMenu = ref(false)
</script>

<style scoped>
.nav-link {
  @apply text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative;
}

.nav-link.router-link-active {
  @apply text-blue-600;
}

.nav-link.router-link-active::after {
  content: '';
  @apply absolute bottom-0 left-0 w-full h-0.5 bg-blue-600;
}

.mobile-nav-link {
  @apply block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors duration-200;
}

.mobile-nav-link.router-link-active {
  @apply bg-blue-100 text-blue-600 font-medium;
}
</style>
