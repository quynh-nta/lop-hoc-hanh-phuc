<template>
  <div class="sharing-page py-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-6">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          💭 Góc chia sẻ cảm xúc
        </h1>
        <p class="text-md text-gray-600 text-xs">
            Nơi các em được tự do chia sẻ suy nghĩ, cảm xúc và những khoảnh khắc hạnh phúc
        </p>
        <div class="mt-4">
        <p class="text-md text-gray-600 text-xs">
            ✅ Được kiểm duyệt: Giáo viên sẽ xem xét trước khi hiển thị
        </p>
        <p class="text-md text-gray-600 text-xs">
            🤗 An toàn & Tự tin: Bạn có thể chọn ẩn tên khi chia sẻ
        </p>
        <p class="text-md text-gray-600 mb-8 text-xs">
            💖 Nội dung tích cực: Chia sẻ những điều tốt đẹp, ý nghĩa
        </p>
        </div>

        <button 
          @click="showSubmitForm = true"
          class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-2 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          ✍️ Hãy chia sẻ cảm xúc của bạn
        </button>
      </div>

      <!-- Filter Tabs -->
      <div class="mb-8 flex flex-wrap justify-center gap-3">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-6 py-2 rounded-full font-semibold transition-all duration-300',
            activeTab === tab.id 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
              : 'bg-white text-gray-700 hover:bg-purple-50'
          ]"
        >
          {{ tab.icon }} {{ tab.name }}
        </button>
      </div>

      <!-- Shares Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="share in filteredShares" 
          :key="share.id"
          :class="[
            ' flex flex-col bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1',
            share.status === 'pending' ? 'border-2 border-yellow-300' : ''
          ]"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-start space-x-3">
              <div :class="[
                'w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl',
                share.anonymous ? 'bg-gradient-to-br from-gray-400 to-gray-600' : 'bg-gradient-to-br from-purple-400 to-pink-400'
              ]">
                {{ share.anonymous ? '?' : share.initial }}
              </div>
              <div>
                <p class="font-semibold text-gray-800">
                  {{ share.anonymous ? 'Học sinh ẩn danh' : share.name }}
                </p>
                <p class="text-xs text-gray-500">{{ share.date }}</p>
              </div>
            </div>
            <span :class="[
              'px-3 py-1 rounded-full text-xs font-semibold',
              share.category === 'happy' ? 'bg-yellow-100 text-yellow-600' :
              share.category === 'love' ? 'bg-pink-100 text-pink-600' :
              'bg-blue-100 text-blue-600'
            ]">
              {{ getCategoryName(share.category) }}
            </span>
          </div>
          
          <div class="mb-4">
            <p class="text-gray-700 italic leading-relaxed">"{{ share.content }}"</p>
          </div>

          <div v-if="share.status === 'pending'" class="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p class="text-sm text-yellow-700 font-semibold">⏳ Đang chờ duyệt</p>
          </div>

          <div class="mt-auto flex items-center justify-between text-sm text-gray-500 mt-4">
            <button @click="handleLike(share)" class="flex items-center space-x-1 hover:text-pink-600 transition-colors">
              <span>❤️</span>
              <span>{{ share.likes }}</span>
            </button>
            <button @click="openComments(share)" class="flex items-center space-x-1 hover:text-blue-600 transition-colors">
              <span>💬</span>
              <span>{{ share.comments }} bình luận</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredShares.length === 0" class="text-center py-16">
        <div class="text-6xl mb-4">💭</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">Chưa có chia sẻ nào</h3>
        <p class="text-gray-600 mb-6">Hãy là người đầu tiên chia sẻ cảm xúc của bạn!</p>
        <button 
          @click="showSubmitForm = true"
          class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold"
        >
          Chia sẻ ngay
        </button>
      </div>
    </div>

    <!-- Submit Form Modal -->
    <FormModal v-model="showSubmitForm" title="✍️ Chia sẻ cảm xúc">
      <form @submit.prevent="submitShare" class="space-y-6">
          <!-- Name -->
          <div>
            <label class="block text-gray-700 font-semibold mb-2">
              Tên của bạn <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="formData.name"
              type="text"
              required
              placeholder="Nhập tên của bạn..."
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <!-- Anonymous Option -->
          <div class="flex items-center space-x-3">
            <input 
              v-model="formData.anonymous"
              type="checkbox"
              id="anonymous"
              class="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label for="anonymous" class="text-gray-700">
              Ẩn tên của tôi khi hiển thị
            </label>
          </div>

          <!-- Category -->
          <div>
            <label class="block text-gray-700 font-semibold mb-2">
              Chọn chủ đề <span class="text-red-500">*</span>
            </label>
            <div class="grid grid-cols-3 gap-3">
              <button 
                v-for="category in categories" 
                :key="category.id"
                type="button"
                @click="formData.category = category.id"
                :class="[
                  'p-2 rounded-lg border-2 transition-all duration-300',
                  formData.category === category.id 
                    ? 'border-purple-600 bg-purple-50' 
                    : 'border-gray-200 hover:border-purple-300'
                ]"
              >
                <div class="text-3xl mb-2">{{ category.icon }}</div>
                <div class="text-sm font-semibold text-gray-700">{{ category.name }}</div>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div>
            <label class="block text-gray-700 font-semibold mb-1">
              Nội dung chia sẻ <span class="text-red-500">*</span>
            </label>
            <textarea 
              v-model="formData.content"
              required
              rows="6"
              placeholder="Hãy chia sẻ suy nghĩ, cảm xúc của bạn... Ví dụ: 'Em rất vui khi được học trong lớp này vì...'"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          <!-- Guidelines -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-0">
            <p class="text-sm text-blue-800 font-semibold mb-2">📌 Lưu ý khi chia sẻ:</p>
            <ul class="text-sm text-blue-700 space-y-1">
              <li>• Chia sẻ những điều tích cực, lịch sự. GV sẽ xem xét trước khi hiển thị</li>
              <li>• Bạn có thể chọn ẩn tên để tự tin chia sẻ hơn</li>
            </ul>
          </div>

          <!-- Submit Button -->
          <div class="flex space-x-4 mt-2">
            <button 
              type="button"
              @click="showSubmitForm = false"
              class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
            >
              Hủy
            </button>
            <button 
              type="submit"
              :disabled="!isFormValid"
              :class="[
                'flex-1 py-3 rounded-lg font-semibold transition-all duration-300',
                isFormValid 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              Gửi chia sẻ
            </button>
          </div>
        </form>
    </FormModal>
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
    <!-- Success Modal -->
    <FormModal v-model="showSuccessModal" title="" max-width="max-w-md">
      <div class="text-center">
        <div class="text-6xl mb-4">✅</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Gửi thành công!</h3>
        <p class="text-gray-600 mb-6">
          Cảm ơn bạn đã chia sẻ! Giáo viên sẽ xem xét và phê duyệt sớm nhất.
        </p>
        <button 
          @click="showSuccessModal = false"
          class="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
        >
          Đóng
        </button>
      </div>
    </FormModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FormModal from '../components/FormModal.vue'
import CommonModal from '../components/CommonModal.vue'
import sharesData from '../data/shares.json'

const activeTab = ref('all')
const showSubmitForm = ref(false)
const showSuccessModal = ref(false)

const tabs = [
  { id: 'all', name: 'Tất cả', icon: '📚' },
  { id: 'happy', name: 'Khoảnh khắc vui', icon: '😊' },
  { id: 'love', name: 'Lời yêu thương', icon: '💖' },
  { id: 'thoughts', name: 'Suy nghĩ', icon: '💭' }
]

const categories = [
  { id: 'thoughts', name: 'Điều em muốn nói', icon: '💭' },
  { id: 'happy', name: 'Khoảnh khắc vui', icon: '😊' },
  { id: 'love', name: 'Lời yêu thương', icon: '💖' }
]

const formData = ref({
  name: '',
  anonymous: false,
  category: 'thoughts',
  content: ''
})

const shares = ref(sharesData)

const filteredShares = computed(() => {
  if (activeTab.value === 'all') {
    return shares.value.filter(s => s.status === 'approved')
  }
  return shares.value.filter(s => s.category === activeTab.value && s.status === 'approved')
})

const isFormValid = computed(() => {
  return formData.value.name.trim() !== '' && 
         formData.value.content.trim() !== '' && 
         formData.value.content.length <= 500
})

const getCategoryName = (categoryId) => {
  const category = categories.find(c => c.id === categoryId)
  return category ? category.icon + ' ' + category.name : ''
}

const submitShare = () => {
  if (!isFormValid.value) return
  
  // In a real app, this would send to backend
  const newShare = {
    id: shares.value.length + 1,
    name: formData.value.name,
    initial: formData.value.name.charAt(0).toUpperCase(),
    anonymous: formData.value.anonymous,
    content: formData.value.content,
    category: formData.value.category,
    date: 'Vừa xong',
    likes: 0,
    comments: 0,
    status: 'pending'
  }
  
  shares.value.unshift(newShare)
  
  // Reset form
  formData.value = {
    name: '',
    anonymous: false,
    category: 'thoughts',
    content: ''
  }
  
  showSubmitForm.value = false
  showSuccessModal.value = true
}

const handleLike = (share) => {
  share.likes += 1
}



const commentModalOpen = ref(false)
const currentShareId = ref(null)
const commentsData = ref({})
const newComment = ref('')
const currentComments = computed(() => {
  return commentsData.value[currentShareId.value] || []
})

const openComments = (share) => {
  currentShareId.value = share.id
  commentModalOpen.value = true

  //change commentsdata from sharesData
  
  commentsData.value[share.id] = share.commentsData
}

const addComment = () => {
  if (!newComment.value.trim()) return
  
  const announcement = announcements.value.find(a => a.id === currentAnnouncementId.value)
  if (announcement) {
    announcement.comments++
  }
  
  if (!commentsData.value[currentAnnouncementId.value]) {
    commentsData.value[currentAnnouncementId.value] = []
  }
  
  const comment = {
    id: Date.now(),
    author: 'Bạn',
    text: newComment.value,
    time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }
  
  commentsData.value[currentShareId.value].push(comment)
  newComment.value = ''
}
</script>
