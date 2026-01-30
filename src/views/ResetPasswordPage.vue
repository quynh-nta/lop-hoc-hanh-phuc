<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
    <div class="container mx-auto px-4 max-w-2xl">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-block p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
          <span class="text-5xl">🔑</span>
        </div>
        <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          Đổi mật khẩu
        </h1>
        <p class="text-gray-600 text-lg">
          Cập nhật mật khẩu của bạn để bảo vệ tài khoản
        </p>
      </div>

      <!-- Password Change Form -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <form @submit.prevent="handleChangePassword" class="space-y-6">
          <!-- Current Password -->
          <div>
            <label for="currentPassword" class="block text-sm font-semibold text-gray-700 mb-2">
              Mật khẩu hiện tại
            </label>
            <div class="relative">
              <input
                id="currentPassword"
                v-model="passwordForm.currentPassword"
                :type="showCurrentPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-12"
                placeholder="Nhập mật khẩu hiện tại"
              />
              <button
                type="button"
                @click="showCurrentPassword = !showCurrentPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {{ showCurrentPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
          </div>

          <!-- New Password -->
          <div>
            <label for="newPassword" class="block text-sm font-semibold text-gray-700 mb-2">
              Mật khẩu mới
            </label>
            <div class="relative">
              <input
                id="newPassword"
                v-model="passwordForm.newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                required
                minlength="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-12"
                placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
              />
              <button
                type="button"
                @click="showNewPassword = !showNewPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {{ showNewPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
            <div class="mt-2 space-y-1">
              <p :class="['text-xs flex items-center', passwordForm.newPassword.length >= 6 ? 'text-green-600' : 'text-gray-500']">
                <span class="mr-1">{{ passwordForm.newPassword.length >= 6 ? '✓' : '○' }}</span>
                Ít nhất 6 ký tự
              </p>
              <p :class="['text-xs flex items-center', /[A-Z]/.test(passwordForm.newPassword) ? 'text-green-600' : 'text-gray-500']">
                <span class="mr-1">{{ /[A-Z]/.test(passwordForm.newPassword) ? '✓' : '○' }}</span>
                Có chữ in hoa (khuyến nghị)
              </p>
              <p :class="['text-xs flex items-center', /[0-9]/.test(passwordForm.newPassword) ? 'text-green-600' : 'text-gray-500']">
                <span class="mr-1">{{ /[0-9]/.test(passwordForm.newPassword) ? '✓' : '○' }}</span>
                Có số (khuyến nghị)
              </p>
            </div>
          </div>

          <!-- Confirm New Password -->
          <div>
            <label for="confirmPassword" class="block text-sm font-semibold text-gray-700 mb-2">
              Xác nhận mật khẩu mới
            </label>
            <div class="relative">
              <input
                id="confirmPassword"
                v-model="passwordForm.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-12"
                placeholder="Nhập lại mật khẩu mới"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {{ showConfirmPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
            <p v-if="passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword" class="text-xs text-red-600 mt-2">
              ⚠️ Mật khẩu xác nhận không khớp
            </p>
            <p v-else-if="passwordForm.confirmPassword && passwordForm.newPassword === passwordForm.confirmPassword" class="text-xs text-green-600 mt-2">
              ✓ Mật khẩu khớp
            </p>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <p class="text-red-600 text-sm flex items-center">
              <span class="mr-2">❌</span>
              {{ errorMessage }}
            </p>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-4">
            <p class="text-green-600 text-sm flex items-center">
              <span class="mr-2">✅</span>
              {{ successMessage }}
            </p>
          </div>

          <!-- Buttons -->
          <div class="flex space-x-4">
            <button
              type="button"
              @click="goBack"
              class="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
            >
              ← Quay lại
            </button>
            <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isLoading">🔄 Đổi mật khẩu</span>
              <span v-else>Đang xử lý...</span>
            </button>
          </div>
        </form>

        <!-- Security Tips -->
        <div class="mt-8 pt-8 border-t border-gray-200">
          <h3 class="font-bold text-gray-800 mb-4 flex items-center">
            <span class="mr-2">💡</span>
            Lưu ý bảo mật
          </h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li class="flex items-start">
              <span class="mr-2 text-blue-600">•</span>
              <span>Mật khẩu nên có ít nhất 6 ký tự, kết hợp chữ cái, số và ký tự đặc biệt</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 text-blue-600">•</span>
              <span>Không sử dụng thông tin cá nhân dễ đoán như ngày sinh, số điện thoại</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 text-blue-600">•</span>
              <span>Không chia sẻ mật khẩu với người khác</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 text-blue-600">•</span>
              <span>Nên đổi mật khẩu định kỳ (3-6 tháng một lần)</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 text-blue-600">•</span>
              <span>Đăng xuất sau khi sử dụng trên máy tính chung</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)

const isFormValid = computed(() => {
  return (
    passwordForm.value.currentPassword &&
    passwordForm.value.newPassword &&
    passwordForm.value.confirmPassword &&
    passwordForm.value.newPassword.length >= 6 &&
    passwordForm.value.newPassword === passwordForm.value.confirmPassword
  )
})

const handleChangePassword = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isLoading.value = true

  try {
    // Validate form
    if (passwordForm.value.newPassword.length < 6) {
      errorMessage.value = 'Mật khẩu mới phải có ít nhất 6 ký tự!'
      isLoading.value = false
      return
    }

    if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
      errorMessage.value = 'Mật khẩu xác nhận không khớp!'
      isLoading.value = false
      return
    }

    // Simulate API call (in real app, call backend)
    await new Promise(resolve => setTimeout(resolve, 1000))

    // In real app, verify current password with backend
    // For demo, just show success
    successMessage.value = 'Đổi mật khẩu thành công! Đang chuyển hướng...'

    // Reset form
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }

    // Redirect after success
    setTimeout(() => {
      router.push('/')
    }, 2000)
  } catch (error) {
    errorMessage.value = 'Đã có lỗi xảy ra. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
