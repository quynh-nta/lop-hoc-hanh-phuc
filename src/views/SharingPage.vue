<template>
  <div class="sharing-page py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          💭 Góc chia sẻ cảm xúc
        </h1>
        <p class="text-xl text-gray-600 mb-6">
          Nơi các em được tự do chia sẻ suy nghĩ, cảm xúc và những khoảnh khắc hạnh phúc
        </p>
        <button 
          @click="showSubmitForm = true"
          class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          ✍️ Chia sẻ cảm xúc của bạn
        </button>
      </div>

      <!-- Info Cards -->
      <div class="grid md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white rounded-xl p-6 shadow-md text-center">
          <div class="text-4xl mb-3">🤗</div>
          <h3 class="font-bold text-gray-800 mb-2">An toàn & Tự tin</h3>
          <p class="text-sm text-gray-600">Bạn có thể chọn ẩn tên khi chia sẻ</p>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-md text-center">
          <div class="text-4xl mb-3">✅</div>
          <h3 class="font-bold text-gray-800 mb-2">Được kiểm duyệt</h3>
          <p class="text-sm text-gray-600">Giáo viên sẽ xem xét trước khi hiển thị</p>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-md text-center">
          <div class="text-4xl mb-3">💖</div>
          <h3 class="font-bold text-gray-800 mb-2">Nội dung tích cực</h3>
          <p class="text-sm text-gray-600">Chia sẻ những điều tốt đẹp, ý nghĩa</p>
        </div>
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
            'bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1',
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

          <div class="flex items-center justify-between text-sm text-gray-500 mt-4">
            <button class="flex items-center space-x-1 hover:text-pink-600 transition-colors">
              <span>❤️</span>
              <span>{{ share.likes }}</span>
            </button>
            <button class="flex items-center space-x-1 hover:text-blue-600 transition-colors">
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
    <div 
      v-if="showSubmitForm"
      @click="showSubmitForm = false"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
    >
      <div 
        @click.stop
        class="bg-white rounded-2xl max-w-2xl w-full p-8 my-8"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">✍️ Chia sẻ cảm xúc</h2>
          <button 
            @click="showSubmitForm = false"
            class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>

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
              Ẩn tên của tôi khi hiển thị (chỉ giáo viên biết)
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
                  'p-4 rounded-lg border-2 transition-all duration-300',
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
            <label class="block text-gray-700 font-semibold mb-2">
              Nội dung chia sẻ <span class="text-red-500">*</span>
            </label>
            <textarea 
              v-model="formData.content"
              required
              rows="6"
              placeholder="Hãy chia sẻ suy nghĩ, cảm xúc của bạn... Ví dụ: 'Em rất vui khi được học trong lớp này vì...'"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
            <p class="text-sm text-gray-500 mt-1">
              {{ formData.content.length }} / 500 ký tự
            </p>
          </div>

          <!-- Guidelines -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="text-sm text-blue-800 font-semibold mb-2">📌 Lưu ý khi chia sẻ:</p>
            <ul class="text-sm text-blue-700 space-y-1">
              <li>• Chia sẻ những điều tích cực, lịch sự</li>
              <li>• Không viết nội dung tiêu cực về bạn bè, giáo viên</li>
              <li>• Giáo viên sẽ xem xét trước khi hiển thị</li>
              <li>• Bạn có thể chọn ẩn tên để tự tin chia sẻ hơn</li>
            </ul>
          </div>

          <!-- Submit Button -->
          <div class="flex space-x-4">
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
      </div>
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
          Cảm ơn bạn đã chia sẻ! Giáo viên sẽ xem xét và phê duyệt sớm nhất.
        </p>
        <button 
          @click="showSuccessModal = false"
          class="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

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

const shares = ref([
  {
    id: 1,
    name: 'Nguyễn Minh An',
    initial: 'M',
    anonymous: false,
    content: 'Em rất vui khi được học trong lớp này. Thầy cô rất tốt và bạn bè thân thiện. Em cảm thấy mình được yêu thương và quan tâm mỗi ngày.',
    category: 'happy',
    date: '2 ngày trước',
    likes: 24,
    comments: 5,
    status: 'approved'
  },
  {
    id: 2,
    name: 'Học sinh ẩn danh',
    initial: '?',
    anonymous: true,
    content: 'Khoảnh khắc hạnh phúc của em là khi được cùng bạn bè làm dự án nhóm. Mọi người cùng nhau động não, chia sẻ ý tưởng và hoàn thành công việc. Em học được rất nhiều điều.',
    category: 'happy',
    date: '3 ngày trước',
    likes: 18,
    comments: 3,
    status: 'approved'
  },
  {
    id: 3,
    name: 'Học sinh ẩn danh',
    initial: '?',
    anonymous: true,
    content: 'Em muốn nói lời cảm ơn đến cô giáo đã luôn quan tâm và động viên em. Có những lúc em không tự tin, nhưng cô đã giúp em vượt qua và trở nên mạnh mẽ hơn.',
    category: 'love',
    date: '5 ngày trước',
    likes: 32,
    comments: 8,
    status: 'approved'
  },
  {
    id: 4,
    name: 'Trần Bảo An',
    initial: 'B',
    anonymous: false,
    content: 'Em nghĩ rằng lớp học là ngôi nhà thứ hai của chúng em. Ở đây, em không chỉ học kiến thức mà còn học cách làm người, cách yêu thương và chia sẻ.',
    category: 'thoughts',
    date: '1 tuần trước',
    likes: 28,
    comments: 6,
    status: 'approved'
  },
  {
    id: 5,
    name: 'Phạm Thu Hà',
    initial: 'H',
    anonymous: false,
    content: 'Cảm ơn tất cả mọi người đã luôn ủng hộ em trong cuộc thi vẽ tranh. Em rất hạnh phúc khi giành được giải nhất!',
    category: 'love',
    date: '1 tuần trước',
    likes: 45,
    comments: 12,
    status: 'approved'
  }
])

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
</script>
