<template>
  <div class="activities-page py-8 bg-gray-50">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          📢 Thông báo
        </h1>
        <p class="text-s text-gray-600">Cập nhật những thông tin mới nhất từ lớp học và nhà trường</p>
        <button v-if="authStore.isAdmin"
          @click="showSubmitForm = true"
          class="mt-2 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          + Tạo thông báo mới
        </button>
      </div>

      <!-- Filter Tabs -->
      <div class="mb-4 flex flex-wrap justify-center gap-3">
        <button v-for="category in categories" :key="category.id" @click="selectedCategory = category.id" :class="[
          'px-6 py-2 rounded-full font-semibold transition-all duration-300',
          selectedCategory === category.id
            ? 'bg-blue-600 text-white shadow-lg'
            : 'bg-white text-gray-700 hover:bg-blue-50'
        ]">
          {{ category.icon }} {{ category.name }}
        </button>
      </div>

      <!-- Month Filter -->
      <div class="mb-8 flex justify-center">
        <select v-model="selectedMonth"
          class="px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="all">Tất cả các tháng</option>
          <option v-for="month in months" :key="month" :value="month">
            Tháng {{ month }}
          </option>
        </select>
      </div>

      <!-- Activities Grid -->
      <div class="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        <div v-for="announcement in filteredAnnouncements" :key="announcement.id"
          class="flex flex-col p-4 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div :class="[
                'min-w-fit p-1 rounded-full flex items-center justify-center text-2xl',
                announcement.priority === 'high' ? 'bg-red-100' :
                  announcement.priority === 'medium' ? 'bg-yellow-100' :
                    'bg-blue-100'
              ]">
                {{ announcement.icon }}
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-800">{{ announcement.title }}</h3>
                <p class="text-sm text-gray-500">{{ announcement.date }}</p>
              </div>
            </div>
            <span :class="[
              'min-w-fit px-3 py-1 rounded-full text-xs font-semibold',
              announcement.priority === 'high' ? 'bg-red-100 text-red-600' :
                announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-blue-100 text-blue-600'
            ]">
              {{ getPriorityText(announcement.priority) }}
            </span>
          </div>
          <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ announcement.content }}</p>
          <div v-if="announcement.attachments" class="mt-4 flex flex-wrap gap-2">
            <a v-for="(file, index) in announcement.attachments" :key="index" href="#"
              class="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
              <span>📎</span>
              <span class="text-sm">{{ file }}</span>
            </a>
          </div>
          <div class="mt-auto flex items-center justify-between text-sm text-gray-500 pt-4">

            <button @click="openComments(announcement)"
              class="flex items-center space-x-1 hover:text-blue-600 transition-colors">
              <span>💬</span>
              <span>{{ announcement.comments }} bình luận</span>
            </button>
            <div class="flex flex-row gap-2">
              <button @click="handleLike(announcement.id)"
                class="flex items-center space-x-1 hover:text-pink-600 transition-colors">
                <span>❤️</span>
                <span>{{ announcement.likes }}</span>
              </button>
               | 
              <Tooltip :title="`${announcement.likes} người thích`" position="top">
                <template #trigger>
                  <span>Xem</span>
                </template>
                <template #content>
                  <div v-if="likesData[announcement.id]?.length" class="space-y-2">
                    <div v-for="like in likesData[announcement.id]" :key="like.id" class="flex items-center gap-2 py-1">
                      <div
                        class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                        {{ like.charAt(0) }}
                      </div>
                      <span class="text-sm text-gray-700">{{ like }}</span>
                    </div>
                  </div>
                  <div v-else class="text-sm text-gray-500 text-center py-2">
                    Chưa có ai thích bài viết này
                  </div>
                </template>
              </Tooltip>
            </div>

          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredAnnouncements.length === 0" class="text-center py-16">
        <div class="text-6xl mb-4">📭</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">Chưa có thông báo nào</h3>
        <p class="text-gray-600">Hãy quay lại sau để xem các thông báo mới!</p>
      </div>
    </div>

    <!-- Modal for Activity Detail -->
    <div v-if="selectedActivity" @click="selectedActivity = null"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div @click.stop class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="relative">
          <img :src="selectedActivity.image" :alt="selectedActivity.title" class="w-full h-96 object-cover" />
          <button @click="selectedActivity = null"
            class="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
            ✕
          </button>
        </div>
        <div class="p-8">
          <span class="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            {{ selectedActivity.category }}
          </span>
          <h2 class="text-3xl font-bold text-gray-800 mb-4">{{ selectedActivity.title }}</h2>
          <p class="text-gray-600 mb-4">📅 {{ selectedActivity.date }} | 👁️ {{ selectedActivity.views }} lượt xem</p>
          <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ selectedActivity.fullDescription }}</p>

          <!-- Image Gallery -->
          <div v-if="selectedActivity.gallery" class="mt-8">
            <h3 class="text-xl font-bold text-gray-800 mb-4">📸 Thư viện ảnh</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <img v-for="(img, index) in selectedActivity.gallery" :key="index" :src="img"
                class="w-full h-48 object-cover rounded-lg hover:opacity-75 transition-opacity cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Comment Modal -->
    <CommonModal v-model="commentModalOpen" title="💬 Bình luận" maxWidth="max-w-2xl">
      <!-- Modal Header -->
      <div
        class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <h3 class="text-xl font-bold">💬 Bình luận</h3>
        <button @click="commentModalOpen = false"
          class="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
          ✕
        </button>
      </div>

      <!-- Comments List -->
      <div class="flex-1 overflow-y-auto p-6 space-y-4">
        <div v-for="comment in currentComments" :key="comment.id" class="flex space-x-3 p-4 bg-gray-50 rounded-lg">
          <div
            class="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
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
          <input v-model="newComment" @keypress.enter="addComment" type="text" placeholder="Viết bình luận..."
            class="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button @click="addComment" :disabled="!newComment.trim()" :class="[
            'px-6 py-3 rounded-full font-semibold transition-all duration-300',
            newComment.trim()
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]">
            Gửi
          </button>
        </div>
      </div>
    </CommonModal>

    <!-- Create Notify Modal -->
    <CreateNotifyModal
      v-model="showSubmitForm"
      @submit="handleCreateNotify"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CommonModal from '../components/CommonModal.vue'
import announcementsData from '../data/announcements.json'
import Tooltip from '../components/Tooltip.vue'
import { useAuthStore } from '../stores/auth'
import CreateNotifyModal from '../components/Modal/CreateNotifyModal.vue'

const authStore = useAuthStore()
const selectedCategory = ref('all')
const selectedMonth = ref('all')
const selectedActivity = ref(null)
const commentModalOpen = ref(false)
const currentAnnouncementId = ref(null)
const newComment = ref('')
const commentsData = ref({})
const likesData = ref({})

const showSubmitForm = ref(false)
announcementsData.forEach(announcement => {
  if (announcement.likesData) {
    likesData.value[announcement.id] = announcement.likesData
  }
})

const categories = [
  { id: 'all', name: 'Tất cả', icon: '📚' },
  { id: 'high', name: 'Quan trọng', icon: '🚨' },
  { id: 'medium', name: 'Trung bình', icon: '⚠️' },
  { id: 'normal', name: 'Thông thường', icon: 'ℹ️' }
]

const months = [
  '9/2024', '10/2024', '11/2024', '12/2024',
  '1/2025', '2/2025', '3/2025', '4/2025',
  '5/2025'
]

const getPriorityText = (priority) => {
  const map = {
    high: 'Quan trọng',
    medium: 'Trung bình',
    normal: 'Thông thường'
  }
  return map[priority] || 'Thông thường'
}
const filteredAnnouncements = computed(() => {
  let result = announcements.value

  if (selectedCategory.value !== 'all') {
    result = result.filter(a => a.categoryId === selectedCategory.value)
  }

  if (selectedMonth.value !== 'all') {
    result = result.filter(a => 
  {
    const [day, month, year] = a.date.split(' ')[0].split('/').map(Number)
    const announcementMonth = `${month}/${year}`
    return announcementMonth === selectedMonth.value
  })
  }

  return result
})

const handleLike = (announcementId) => {
  const announcement = announcements.value.find(a => a.id === announcementId)
  if (announcement) {
    announcement.likes++
  }
}

const openComments = (announcement) => {
  currentAnnouncementId.value = announcement.id
  commentModalOpen.value = true
  commentsData.value[currentAnnouncementId.value] = announcement.commentsData || []
}

const currentComments = computed(() => {
  return commentsData.value[currentAnnouncementId.value] || []
})

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
    time: new Date().toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  commentsData.value[currentAnnouncementId.value].push(comment)
  newComment.value = ''
}

const announcements = ref(announcementsData)

const handleCreateNotify = (newNotification) => {
  //format dd/mm/yyyy HH:MM
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  newNotification.date = `${day}/${month}/${year} ${hours}:${minutes}`

  // Xóa trường time khỏi object
  delete newNotification.time
  
  // Thêm thông báo mới vào đầu danh sách
  announcements.value.unshift(newNotification)
  
  // Hiển thị thông báo thành công (có thể thêm toast notification)
  console.log('Thông báo mới đã được tạo:', newNotification)
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
