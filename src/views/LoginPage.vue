<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
      <!-- Left side - Branding -->
      <div class="bg-gradient-to-br from-blue-600 to-purple-600 p-8 md:w-1/2 flex flex-col justify-center text-white">
        <div class="text-center space-y-4">
          <h1 class="text-4xl md:text-5xl font-bold">🌟</h1>
          <h2 class="text-3xl font-bold">Lớp Học Hạnh Phúc</h2>
          <p class="text-blue-100 text-lg">
            Nơi mỗi khoảnh khắc đều tràn đầy niềm vui và ý nghĩa
          </p>
          <div class="pt-8 space-y-2">
            <div class="flex items-center justify-center space-x-2">
              <span class="text-2xl">👨‍🏫</span>
              <span>Giáo viên</span>
            </div>
            <div class="flex items-center justify-center space-x-2">
              <span class="text-2xl">👨‍👩‍👧</span>
              <span>Phụ huynh</span>
            </div>
            <div class="flex items-center justify-center space-x-2">
              <span class="text-2xl">👨‍🎓</span>
              <span>Học sinh</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right side - Login Form -->
      <div class="p-8 md:w-1/2">
        <div class="mb-8">
          <h3 class="text-3xl font-bold text-gray-800 mb-2">Đăng nhập</h3>
          <p class="text-gray-600">Chào mừng bạn trở lại!</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Role Selection -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">
              Bạn là:
            </label>
            <div class="grid grid-cols-3 gap-3">
              <button
                type="button"
                @click="selectedRole = 'admin'"
                :class="[
                  'p-4 rounded-xl border-2 transition-all duration-300',
                  selectedRole === 'admin'
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300'
                ]"
              >
                <div class="text-3xl mb-2">👨‍🏫</div>
                <div class="text-xs font-semibold">Giáo viên</div>
              </button>
              <button
                type="button"
                @click="selectedRole = 'parent'"
                :class="[
                  'p-4 rounded-xl border-2 transition-all duration-300',
                  selectedRole === 'parent'
                    ? 'border-purple-600 bg-purple-50 shadow-md'
                    : 'border-gray-200 hover:border-purple-300'
                ]"
              >
                <div class="text-3xl mb-2">👨‍👩‍👧</div>
                <div class="text-xs font-semibold">Phụ huynh</div>
              </button>
              <button
                type="button"
                @click="selectedRole = 'student'"
                :class="[
                  'p-4 rounded-xl border-2 transition-all duration-300',
                  selectedRole === 'student'
                    ? 'border-green-600 bg-green-50 shadow-md'
                    : 'border-gray-200 hover:border-green-300'
                ]"
              >
                <div class="text-3xl mb-2">👨‍🎓</div>
                <div class="text-xs font-semibold">Học sinh</div>
              </button>
            </div>
          </div>

          <!-- Username -->
          <div>
            <label for="username" class="block text-sm font-semibold text-gray-700 mb-2">
              Tên đăng nhập
            </label>
            <input
              id="username"
              v-model="username"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Nhập tên đăng nhập"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
              Mật khẩu
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
            {{ errorMessage }}
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isLoading">Đăng nhập</span>
            <span v-else>Đang đăng nhập...</span>
          </button>
        </form>

        <!-- Demo Accounts -->
        <div class="mt-8 pt-8 border-t border-gray-200">
          <p class="text-sm text-gray-600 mb-4 font-semibold">Tài khoản demo:</p>
          <div class="space-y-2 text-xs text-gray-500">
            <div class="flex items-center justify-between bg-gray-50 p-2 rounded">
              <span>👨‍🏫 Giáo viên:</span>
              <code class="bg-white px-2 py-1 rounded">DangTuyen / admin123</code>
            </div>
            <div class="flex items-center justify-between bg-gray-50 p-2 rounded">
              <span>👨‍👩‍👧 Phụ huynh:</span>
              <code class="bg-white px-2 py-1 rounded">phminhan / parent123</code>
            </div>
            <div class="flex items-center justify-between bg-gray-50 p-2 rounded">
              <span>👨‍🎓 Học sinh:</span>
              <code class="bg-white px-2 py-1 rounded">minhan / minhan123</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const selectedRole = ref('admin')
const username = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  errorMessage.value = ''
  isLoading.value = true

  try {
    const result = authStore.login(username.value, password.value)
    
    if (result.success) {
      // Check if role matches
      if (result.user.role !== selectedRole.value) {
        errorMessage.value = 'Vui lòng chọn đúng vai trò của bạn'
        authStore.logout()
        isLoading.value = false
        return
      }

      // Redirect based on role
      setTimeout(() => {
        if (result.user.role === 'admin') {
          router.push('/quan-tri')
        } else {
          router.push('/')
        }
      }, 500)
    } else {
      errorMessage.value = result.message
    }
  } catch (error) {
    errorMessage.value = 'Đã có lỗi xảy ra. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
