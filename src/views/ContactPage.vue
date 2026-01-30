<template>
  <div class="contact-page py-16 bg-gradient-to-br from-blue-50 to-green-50">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          📞 Liên hệ
        </h1>
        <p class="text-xl text-gray-600">
          Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12 mb-16">
        <!-- Contact Info -->
        <div>
          <h2 class="text-3xl font-bold text-gray-800 mb-8">🏫 Thông tin liên hệ</h2>
          
          <!-- Class Info Card -->
          <div class="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg mb-8">
            <div class="flex items-center space-x-4 mb-6">
              <div class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl">
                🎓
              </div>
              <div>
                <h3 class="text-2xl font-bold">Lớp 6A1</h3>
                <p class="text-blue-100">Lớp Học Hạnh Phúc</p>
              </div>
            </div>
            <div class="space-y-3">
              <p class="flex items-center">
                <span class="text-2xl mr-3">🏫</span>
                <span>Trường THCS Hoài Hải</span>
              </p>
              <p class="flex items-center">
                <span class="text-2xl mr-3">📍</span>
                <span>Tổ dân phố Kim Giao Thiện, Phường Hoài Nhơn Đông, Tỉnh Gia Lai</span>
              </p>
              <p class="flex items-center">
                <span class="text-2xl mr-3">📅</span>
                <span>Năm học 2024-2025</span>
              </p>
            </div>
          </div>

          <!-- Teacher Contact -->
          <div class="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <div class="flex items-center space-x-4 mb-6">
              <div class="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                CN
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-800">Cô Đặng Xuân Tuyền</h3>
                <p class="text-gray-600">Giáo viên chủ nhiệm</p>
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-start">
                <span class="text-2xl mr-3">📧</span>
                <div>
                  <p class="text-sm text-gray-500">Email</p>
                  <a href="mailto:tuyendang@school.edu.vn" class="text-blue-600 hover:underline font-semibold">
                    tuyendang@school.edu.vn
                  </a>
                </div>
              </div>
              <div class="flex items-start">
                <span class="text-2xl mr-3">📱</span>
                <div>
                  <p class="text-sm text-gray-500">Điện thoại</p>
                  <a href="tel:0123456789" class="text-blue-600 hover:underline font-semibold">
                    0123 456 789
                  </a>
                </div>
              </div>
              <div class="flex items-start">
                <span class="text-2xl mr-3">⏰</span>
                <div>
                  <p class="text-sm text-gray-500">Giờ làm việc</p>
                  <p class="text-gray-700 font-semibold">Thứ 2 - Thứ 6: 7:00 - 17:00</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="bg-white rounded-2xl p-6 shadow-lg">
            <h3 class="text-xl font-bold text-gray-800 mb-4">🔗 Liên kết nhanh</h3>
            <div class="space-y-2">
              <router-link to="/chia-se" class="block px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 font-semibold transition-colors">
                💭 Góc chia sẻ cảm xúc
              </router-link>
              <router-link to="/phu-huynh" class="block px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-semibold transition-colors">
                👨‍👩‍👧 Kết nối phụ huynh
              </router-link>
              <router-link to="/danh-gia" class="block px-4 py-2 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 font-semibold transition-colors">
                📊 Đánh giá & Góp ý
              </router-link>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div>
          <h2 class="text-3xl font-bold text-gray-800 mb-8">💬 Gửi tin nhắn</h2>
          <form @submit.prevent="submitContact" class="bg-white rounded-2xl p-8 shadow-lg">
            <div class="space-y-6">
              <div>
                <label class="block text-gray-700 font-semibold mb-2">
                  Họ và tên <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="formData.name"
                  type="text"
                  required
                  placeholder="Nhập họ tên của bạn"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-gray-700 font-semibold mb-2">
                  Email <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="formData.email"
                  type="email"
                  required
                  placeholder="email@example.com"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-gray-700 font-semibold mb-2">
                  Số điện thoại
                </label>
                <input 
                  v-model="formData.phone"
                  type="tel"
                  placeholder="0123 456 789"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-gray-700 font-semibold mb-2">
                  Bạn là <span class="text-red-500">*</span>
                </label>
                <select 
                  v-model="formData.role"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn...</option>
                  <option value="student">Học sinh</option>
                  <option value="parent">Phụ huynh</option>
                  <option value="teacher">Giáo viên</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div>
                <label class="block text-gray-700 font-semibold mb-2">
                  Chủ đề <span class="text-red-500">*</span>
                </label>
                <select 
                  v-model="formData.subject"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn chủ đề...</option>
                  <option value="question">Câu hỏi</option>
                  <option value="feedback">Góp ý</option>
                  <option value="support">Hỗ trợ kỹ thuật</option>
                  <option value="collaboration">Hợp tác</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div>
                <label class="block text-gray-700 font-semibold mb-2">
                  Nội dung <span class="text-red-500">*</span>
                </label>
                <textarea 
                  v-model="formData.message"
                  required
                  rows="6"
                  placeholder="Nhập nội dung tin nhắn của bạn..."
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button 
                type="submit"
                class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300"
              >
                Gửi tin nhắn
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Message Banner -->
      <section class="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8 md:p-12 text-center">
        <div class="text-6xl mb-6">💙</div>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Thông điệp về Lớp Học Hạnh Phúc
        </h2>
        <div class="max-w-4xl mx-auto space-y-4 text-lg leading-relaxed">
          <p>
            Lớp 6A1 không chỉ là một lớp học thông thường, mà là một gia đình nhỏ, 
            nơi mỗi em học sinh đều được yêu thương, tôn trọng và khích lệ phát triển.
          </p>
          <p>
            Website này được tạo ra với mong muốn ghi lại những khoảnh khắc đẹp, 
            tạo không gian để các em được thể hiện bản thân, chia sẻ cảm xúc và 
            phát triển kỹ năng số một cách an toàn, tích cực.
          </p>
          <p class="font-semibold text-xl">
            ✨ Mỗi em là một ngôi sao độc đáo - Cùng nhau tỏa sáng! ✨
          </p>
        </div>
      </section>
    </div>

    <!-- Success Modal -->
    <div 
      v-if="showSuccessModal"
      @click="showSuccessModal = false"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div 
        @click.stop
        class="bg-white rounded-2xl max-w-md w-full p-8 text-center"
      >
        <div class="text-6xl mb-4">✅</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Gửi thành công!</h3>
        <p class="text-gray-600 mb-6">
          Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.
        </p>
        <button 
          @click="showSuccessModal = false"
          class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showSuccessModal = ref(false)

const formData = ref({
  name: '',
  email: '',
  phone: '',
  role: '',
  subject: '',
  message: ''
})

const submitContact = () => {
  // Handle form submission
  console.log('Form submitted:', formData.value)
  
  // Reset form
  formData.value = {
    name: '',
    email: '',
    phone: '',
    role: '',
    subject: '',
    message: ''
  }
  
  showSuccessModal.value = true
}
</script>
