<template>
  <div class="parents-page py-8 bg-gradient-to-br from-blue-50 to-green-50">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          👨‍👩‍👧 Kết nối phụ huynh
        </h1>
        <p class="text-s text-gray-600">Cùng đồng hành trong hành trình phát triển của các em</p>
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
                <h4 class="font-bold text-gray-800">Cô Đặng Thị Xuân Tuyền</h4>
                <p class="text-sm text-gray-600">GVCN Lớp 6A1</p>
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">{{ message.title }}</h3>
            <p class="text-gray-700 mb-4 leading-relaxed">{{ message.content }}</p>

            <div class="mt-auto flex items-center justify-between text-sm text-gray-500 mt-4">
              <div class="flex items-center space-x-1 hover:text-pink-600 transition-colors">
            <p class="text-sm text-gray-500">📅 {{ message.date }}</p>
              </div>
              <button @click="openComments(message)" class="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                <span>💬</span>
                <span>{{ message.comments }} bình luận</span>
              </button>
          </div>
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
              SĐT liên hệ
            </label>
            <input 
              v-model="feedbackData.phone"
              type="tel"
              placeholder="0123 456 789"
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
     <CommonModal
      v-model="commentModalOpen"
      title="💬 Bình luận"
      maxWidth="max-w-2xl" >
      <!-- Modal Header -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <h3 class="text-xl font-bold">💬 Bình luận</h3>
          <button
            @click="commentModalOpen = false"
            class="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        <!-- Comments List -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4">
          <div
            v-for="comment in currentComments"
            :key="comment.id"
            class="flex space-x-3 p-4 bg-gray-50 rounded-lg"
          >
            <div class="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
              {{ comment.author.charAt(0) }}
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between mb-1">
                <h4 class="font-bold text-gray-800">{{ comment.author }}</h4>
                <span class="text-xs text-gray-500">{{ comment.time }}</span>
              </div>
              <p class="text-gray-700">{{ comment.text }}</p>
            </div>
          </div>
          <div v-if="currentComments.length === 0" class="text-center py-8 text-gray-500">
            <div class="text-4xl mb-2">💬</div>
            <p>Chưa có bình luận nào. Hãy là người đầu tiên!</p>
          </div>
        </div>

        <!-- Add Comment Input -->
        <div class="p-4 border-t">
          <div class="flex space-x-3">
            <input
              v-model="newComment"
              @keypress.enter="addComment"
              type="text"
              placeholder="Viết bình luận..."
              class="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              @click="addComment"
              :disabled="!newComment.trim()"
              :class="[
                'px-6 py-3 rounded-full font-semibold transition-all duration-300',
                newComment.trim()
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              Gửi
            </button>
          </div>
        </div>
    </CommonModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import teacherMessagesData from '../data/teacherMessages.json'
import CommonModal from '../components/CommonModal.vue'

const showFeedbackForm = ref(false)

const feedbackData = ref({
  name: '',
  phone: '',
  type: 'feedback',
  content: ''
})

const teacherMessages = ref(teacherMessagesData)



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
    phone: '',
    type: 'feedback',
    content: ''
  }
}

const newComment = ref('')

const commentModalOpen = ref(false)
const currentShareId = ref(null)
const commentsData = ref({})
const currentComments = computed(() => {
  return commentsData.value[currentShareId.value] || []
})
const openComments = (message) => {
  currentShareId.value = message.id
  commentModalOpen.value = true

  commentsData.value[message.id] = message.commentsData || []
}

const addComment = () => {
  if (!newComment.value.trim()) return

  const newCommentObj = {
    id: Date.now(),
    author: feedbackData.value.name,
    text: newComment.value,
    time: new Date().toLocaleString()
  }

  commentsData.value[currentShareId.value].push(newCommentObj)
  newComment.value = ''
}
</script>
