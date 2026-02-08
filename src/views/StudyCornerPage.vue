<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            📚 Góc Học Tập
          </h1>
          <p class="text-xl text-blue-100">
            Nơi các bạn học sinh chia sẻ và giúp đỡ nhau trong học tập
          </p>
          <p class="text-sm text-blue-200 mt-2">
            "Một mình đi nhanh, cùng nhau đi xa" - Hãy cùng nhau vượt qua mọi khó khăn!
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-5xl mx-auto">
        
        <!-- Action Bar -->
        <div class="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-4 w-full sm:w-auto">
            <!-- Filter by Subject -->
            <select 
              v-model="selectedSubject" 
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tất cả môn học</option>
              <option value="Toán học">Toán học</option>
              <option value="Tiếng Việt">Tiếng Việt</option>
              <option value="Tiếng Anh">Tiếng Anh</option>
              <option value="Khoa học">Khoa học</option>
              <option value="Lịch sử">Lịch sử</option>
              <option value="Địa lý">Địa lý</option>
            </select>

            <!-- Filter by Status -->
            <select 
              v-model="selectedStatus" 
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tất cả</option>
              <option value="unsolved">Chưa giải quyết</option>
              <option value="solved">Đã giải quyết</option>
            </select>
          </div>

          <!-- Create Post Button -->
          <button
            @click="showCreateModal = true"
            class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span class="text-xl">✏️</span> Đăng Câu Hỏi
          </button>
        </div>

        <!-- Stats Bar -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm">Tổng câu hỏi</p>
                <p class="text-2xl font-bold text-gray-800">{{ studyPosts.length }}</p>
              </div>
              <div class="text-4xl">📝</div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm">Đã giải quyết</p>
                <p class="text-2xl font-bold text-green-600">{{ solvedCount }}</p>
              </div>
              <div class="text-4xl">✅</div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm">Cần giúp đỡ</p>
                <p class="text-2xl font-bold text-orange-600">{{ unsolvedCount }}</p>
              </div>
              <div class="text-4xl">❓</div>
            </div>
          </div>
        </div>

        <!-- Posts List -->
        <div v-if="filteredPosts.length === 0" class="text-center py-16">
          <div class="text-6xl mb-4">📭</div>
          <p class="text-gray-500 text-lg">Chưa có câu hỏi nào trong mục này</p>
        </div>

        <div v-else class="space-y-6">
          <div
            v-for="post in filteredPosts"
            :key="post.id"
            class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <!-- Post Header -->
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {{ getInitial(post.studentName) }}
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800">{{ post.studentName }}</h3>
                    <p class="text-sm text-gray-500">{{ formatTime(post.timestamp) }}</p>
                  </div>
                </div>
                <span 
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-semibold',
                    post.solved 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  ]"
                >
                  {{ post.solved ? '✓ Đã giải quyết' : '? Cần giúp đỡ' }}
                </span>
              </div>

              <!-- Subject Badge -->
              <span class="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-3">
                {{ post.subject }}
              </span>

              <!-- Post Title -->
              <h2 class="text-xl font-bold text-gray-800 mb-3">
                {{ post.title }}
              </h2>

              <!-- Post Content -->
              <p class="text-gray-700 mb-4 leading-relaxed">
                {{ post.content }}
              </p>

              <!-- Post Image -->
              <div v-if="post.image" class="mb-4">
                <img :src="post.image" alt="Post image" class="rounded-lg max-w-full h-auto" />
              </div>

              <!-- Post Actions -->
              <div class="flex items-center space-x-6 text-gray-600 border-t pt-4">
                <button 
                  @click="toggleLike(post)"
                  class="flex items-center space-x-2 hover:text-red-500 transition-colors"
                >
                  <svg class="w-5 h-5" :class="post.isLiked ? 'fill-red-500 text-red-500' : 'fill-none'" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{{ post.likes }} Thích</span>
                </button>

                <button 
                  @click="toggleComments(post)"
                  class="flex items-center space-x-2 hover:text-blue-500 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{{ post.comments.length }} Bình luận</span>
                </button>

                <button 
                  v-if="!post.solved"
                  @click="markAsSolved(post)"
                  class="flex items-center space-x-2 hover:text-green-500 transition-colors ml-auto"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Đánh dấu đã giải quyết</span>
                </button>
              </div>
            </div>

            <!-- Comments Section -->
            <div v-if="post.showComments" class="bg-gray-50 border-t">
              <div class="p-6">
                <!-- Existing Comments -->
                <div v-if="post.comments.length > 0" class="space-y-4 mb-4">
                  <div
                    v-for="comment in post.comments"
                    :key="comment.id"
                    class="flex space-x-3"
                  >
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                      {{ getInitial(comment.userName) }}
                    </div>
                    <div class="flex-1 bg-white rounded-lg p-4 shadow-sm">
                      <div class="flex items-center justify-between mb-2">
                        <h4 class="font-semibold text-gray-800">{{ comment.userName }}</h4>
                        <span class="text-xs text-gray-500">{{ formatTime(comment.timestamp) }}</span>
                      </div>
                      <p class="text-gray-700">{{ comment.content }}</p>
                    </div>
                  </div>
                </div>

                <!-- Add Comment -->
                <div class="flex space-x-3">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-sm">
                    B
                  </div>
                  <div class="flex-1">
                    <textarea
                      v-model="post.newComment"
                      placeholder="Viết câu trả lời hoặc gợi ý của bạn..."
                      rows="3"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    ></textarea>
                    <button
                      @click="addComment(post)"
                      :disabled="!post.newComment || !post.newComment.trim()"
                      class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Gửi câu trả lời
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Post Modal -->
    <CreateStudyPostModal 
      :show="showCreateModal" 
      @close="showCreateModal = false"
      @submit="handleNewPost"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CreateStudyPostModal from '../components/Modal/CreateStudyPostModal.vue'
import studyPostsData from '../data/studyPosts.json'

const studyPosts = ref(studyPostsData.map(post => ({
  ...post,
  isLiked: false,
  showComments: false,
  newComment: ''
})))

const showCreateModal = ref(false)
const selectedSubject = ref('')
const selectedStatus = ref('')

// Computed properties
const filteredPosts = computed(() => {
  return studyPosts.value.filter(post => {
    const subjectMatch = !selectedSubject.value || post.subject === selectedSubject.value
    const statusMatch = !selectedStatus.value || 
      (selectedStatus.value === 'solved' && post.solved) ||
      (selectedStatus.value === 'unsolved' && !post.solved)
    return subjectMatch && statusMatch
  })
})

const solvedCount = computed(() => {
  return studyPosts.value.filter(post => post.solved).length
})

const unsolvedCount = computed(() => {
  return studyPosts.value.filter(post => !post.solved).length
})

// Methods
const getInitial = (name) => {
  if (!name) return '?'
  // Lấy chữ cái đầu của tên (phần cuối cùng)
  const nameParts = name.trim().split(' ')
  return nameParts[nameParts.length - 1].charAt(0).toUpperCase()
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    return `${diffInMinutes} phút trước`
  } else if (diffInHours < 24) {
    return `${diffInHours} giờ trước`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} ngày trước`
  }
}

const toggleLike = (post) => {
  post.isLiked = !post.isLiked
  post.likes += post.isLiked ? 1 : -1
}

const toggleComments = (post) => {
  post.showComments = !post.showComments
}

const addComment = (post) => {
  if (!post.newComment || !post.newComment.trim()) return

  const newComment = {
    id: post.comments.length + 1,
    userName: "Bạn",
    content: post.newComment.trim(),
    timestamp: new Date().toISOString()
  }

  post.comments.push(newComment)
  post.newComment = ''
}

const markAsSolved = (post) => {
  if (confirm('Bạn chắc chắn đã hiểu và giải quyết được vấn đề này?')) {
    post.solved = true
  }
}

const handleNewPost = (newPost) => {
  studyPosts.value.unshift({
    ...newPost,
    isLiked: false,
    showComments: false,
    newComment: ''
  })
  showCreateModal.value = false
}
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
