<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-3">
          <div
            class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span class="text-white font-bold text-xl">🎓</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-800">Lớp Học Hạnh Phúc</h1>
            <p class="text-xs text-gray-500">Năm học 2024-2025</p>
          </div>
        </router-link>

        <!-- Mobile menu button -->
        <button @click="showMenu = !showMenu" class="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!showMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Desktop Menu -->
        <ul class="hidden md:flex items-center space-x-6">
          <li><router-link to="/" class="nav-link">🏠Trang chủ</router-link></li>
          <li><router-link to="/vinh-danh" class="nav-link">🏆Vinh danh</router-link></li>
          <li><router-link to="/thong-bao" class="nav-link">Thông báo</router-link></li>
          <li><router-link to="/hoat-dong" class="nav-link">Hoạt động</router-link></li>
          <li><router-link to="/chia-se" class="nav-link">Góc chia sẻ</router-link></li>
          <li><router-link to="/phu-huynh" class="nav-link">Phụ huynh</router-link></li>
          <li><router-link to="/truyen-thong" class="nav-link">Truyền thông</router-link></li>
          <li><router-link to="/danh-sach" class="nav-link">Danh sách</router-link></li>
        </ul>

        <div>
          <!-- User Menu -->
          <div v-if="authStore.isAuthenticated" class="relative">
            <button @click="showUserMenu = !showUserMenu"
              class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <div
                class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {{ authStore.currentUser.name.charAt(0) }}
              </div>
              <span class="text-sm font-medium">{{ authStore.currentUser.name }}</span>
            </button>

            <!-- Dropdown Menu -->
            <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              <router-link v-if="authStore.isAdmin" to="/quan-tri" @click="showUserMenu = false"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                👨‍🏫 Quản trị
              </router-link>
              <router-link v-if="authStore.isAdmin" to="/cai-dat" @click="showUserMenu = false"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                ⚙️ Cài đặt năm học
              </router-link>
              <router-link to="/doi-mat-khau" @click="showUserMenu = false"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                🔑 Đổi mật khẩu
              </router-link>
              <button @click="handleLogout" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                🚪 Đăng xuất
              </button>
            </div>
          </div>
          <div v-else>
            <router-link to="/dang-nhap"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Đăng nhập
            </router-link>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div :class="showMenu ? 'max-h-screen' : 'max-h-0'" class="md:hidden overflow-hidden transition-all duration-300">
        <ul class="pb-4 space-y-2">
          <li><router-link to="/" @click="showMenu = false" class="mobile-nav-link">🏠Trang chủ</router-link></li>
          <li><router-link to="/vinh-danh" @click="showMenu = false" class="mobile-nav-link">🏆Vinh danh</router-link>
          </li>
          <li><router-link to="/thong-bao" @click="showMenu = false" class="mobile-nav-link">📢Thông báo</router-link>
          </li>
          <li><router-link to="/hoat-dong" @click="showMenu = false" class="mobile-nav-link">Hoạt động</router-link>
          </li>
          <li><router-link to="/chia-se" @click="showMenu = false" class="mobile-nav-link">Góc chia sẻ</router-link>
          </li>
          <li><router-link to="/phu-huynh" @click="showMenu = false" class="mobile-nav-link">Phụ huynh</router-link>
          </li>
          <li><router-link to="/truyen-thong" @click="showMenu = false" class="mobile-nav-link">Truyền
              thông</router-link></li>
          <li><router-link to="/danh-sach" @click="showMenu = false" class="mobile-nav-link">👥 Danh sách
              lớp</router-link></li>

          <!-- Mobile User Menu -->
          <li v-if="authStore.isAuthenticated" class="pt-4 border-t border-gray-200 mt-4">
            <div class="px-4 py-2 text-sm font-medium text-gray-900">
              {{ authStore.currentUser.name }}
            </div>
            <router-link v-if="authStore.isAdmin" to="/quan-tri" @click="showMenu = false" class="mobile-nav-link">
              👨‍🏫 Quản trị
            </router-link>
            <router-link v-if="authStore.isAdmin" to="/cai-dat" @click="showMenu = false" class="mobile-nav-link">
              ⚙️ Cài đặt năm học
            </router-link>
            <router-link to="/doi-mat-khau" @click="showMenu = false" class="mobile-nav-link">
              🔑 Đổi mật khẩu
            </router-link>
            <button @click="handleLogout" class="w-full text-left mobile-nav-link text-red-600">
              🚪 Đăng xuất
            </button>
          </li>
          <li v-else class="pt-4 border-t border-gray-200 mt-4">
            <router-link to="/dang-nhap" @click="showMenu = false"
              class="block mx-4 text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Đăng nhập
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const showMenu = ref(false)
const showUserMenu = ref(false)

const handleLogout = () => {
  authStore.logout()
  showMenu.value = false
  showUserMenu.value = false
  router.push('/dang-nhap')
}
</script>

<style scoped>
.nav-link {
  @apply text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative;
}

.nav-link.router-link-active {
  @apply text-blue-600;
  @apply font-semibold;
}

.mobile-nav-link {
  @apply block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors duration-200;
}

.mobile-nav-link.router-link-active {
  @apply bg-blue-100 text-blue-600 font-medium;
}
</style>
