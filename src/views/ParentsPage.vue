<template>
  <div class="parents-page py-16 bg-gradient-to-br from-blue-50 to-green-50">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          👨‍👩‍👧 Kết nối phụ huynh
        </h1>
        <p class="text-xl text-gray-600">
          Cùng đồng hành trong hành trình phát triển của các em
        </p>
      </div>

      <!-- Quick Actions -->
      <div class="grid md:grid-cols-2 gap-6 mb-12">
        <div class="bg-white rounded-xl p-6 shadow-md text-center hover:shadow-xl transition-all duration-300">
          <div class="text-5xl mb-4">✍️</div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">GVCN Nhắn gửi</h3>
          <p class="text-gray-600 mb-4">Bài viết từ giáo viên</p>
          <button @click="scrollToSection('messages')" class="text-blue-600 font-semibold">
            Đọc ngay →
          </button>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-md text-center hover:shadow-xl transition-all duration-300">
          <div class="text-5xl mb-4">💬</div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Góp ý</h3>
          <p class="text-gray-600 mb-4">Ý kiến của quý phụ huynh rất quan trọng để chúng tôi cải thiện chất lượng lớp học</p>
                  <button 
          @click="showFeedbackForm = true"
          class="w-full md:w-auto mx-auto block bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all duration-300"
        >
          ✍️ Gửi góp ý của bạn
        </button>
        </div>
      </div>



      <!-- Messages from Teacher -->
      <section id="messages" class="mb-12">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">💌 Nhắn gửi từ GVCN</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div 
            v-for="message in teacherMessages" 
            :key="message.id"
            class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                CN
              </div>
              <div>
                <h4 class="font-bold text-gray-800">Cô Đặng Xuân Tuyền</h4>
                <p class="text-sm text-gray-600">GVCN Lớp 6A</p>
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">{{ message.title }}</h3>
            <p class="text-gray-700 mb-4 leading-relaxed">{{ message.content }}</p>
            <p class="text-sm text-gray-500">📅 {{ message.date }}</p>
          </div>
        </div>
      </section>
    </div>

    <!-- Feedback Form Modal -->
    <div 
      v-if="showFeedbackForm"
      @click="showFeedbackForm = false"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
    >
      <div 
        @click.stop
        class="bg-white rounded-2xl max-w-2xl w-full p-8 my-8"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">💬 Góp ý & Chia sẻ</h2>
          <button 
            @click="showFeedbackForm = false"
            class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
          >
            ✕
          </button>
        </div>

        <form @submit.prevent="submitFeedback" class="space-y-6">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">
              Họ tên phụ huynh <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="feedbackData.name"
              type="text"
              required
              placeholder="Nhập họ tên..."
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">
              Email liên hệ
            </label>
            <input 
              v-model="feedbackData.email"
              type="email"
              placeholder="email@example.com"
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">
              Loại góp ý <span class="text-red-500">*</span>
            </label>
            <select 
              v-model="feedbackData.type"
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="feedback">Góp ý chung</option>
              <option value="suggestion">Đề xuất cải tiến</option>
              <option value="appreciation">Cảm ơn/Khen ngợi</option>
              <option value="question">Thắc mắc</option>
            </select>
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">
              Nội dung <span class="text-red-500">*</span>
            </label>
            <textarea 
              v-model="feedbackData.content"
              required
              rows="6"
              placeholder="Chia sẻ ý kiến, góp ý của bạn..."
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div class="flex space-x-4">
            <button 
              type="button"
              @click="showFeedbackForm = false"
              class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold"
            >
              Hủy
            </button>
            <button 
              type="submit"
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >
              Gửi góp ý
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showFeedbackForm = ref(false)

const feedbackData = ref({
  name: '',
  email: '',
  type: 'feedback',
  content: ''
})

const teacherMessages = ref([
  {
    id: 1,
    title: 'Cảm ơn sự đồng hành',
    content: 'Quý phụ huynh thân mến, tháng vừa qua các em đã có nhiều tiến bộ đáng kể. Điều này không thể thiếu sự quan tâm, động viên của gia đình. Cô xin gửi lời cảm ơn sâu sắc đến quý phụ huynh!',
    date: '15/01/2026'
  },
  {
    id: 2,
    title: 'Một số lưu ý về học tập',
    content: 'Để các em có kết quả học tập tốt hơn, cô mong quý phụ huynh giúp các em: Đọc sách mỗi ngày ít nhất 30 phút, hoàn thành bài tập đúng hạn, và tham gia đầy đủ các hoạt động ngoại khóa.',
    date: '10/01/2026'
  },
  {
    id: 3,
    title: 'Kế hoạch tháng 2',
    content: 'Tháng 2 sắp tới, lớp sẽ tổ chức nhiều hoạt động ý nghĩa: ngày hội đọc sách, cuộc thi STEM, và chuyến tham quan tại vườn quốc gia. Cô rất mong được sự ủng hộ của quý phụ huynh.',
    date: '08/01/2026'
  },
  {
    id: 4,
    title: 'Website "Lớp học hạnh phúc"',
    content: 'Cô rất vui khi ra mắt website lớp học này. Đây là nơi để các em được thể hiện, chia sẻ và phát triển. Cô mong quý phụ huynh thường xuyên theo dõi và động viên các em!',
    date: '05/01/2026'
  }
])



const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const submitFeedback = () => {
  // Handle form submission
  alert('Cảm ơn bạn đã gửi góp ý! Chúng tôi sẽ phản hồi sớm nhất.')
  showFeedbackForm.value = false
  feedbackData.value = {
    name: '',
    email: '',
    type: 'feedback',
    content: ''
  }
}
</script>
