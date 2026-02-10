<template>
  <div class="activities-page py-8 bg-gray-50">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          🎨 Hoạt động của lớp
        </h1>
        <p class="text-md text-gray-600 mb-0 text-s">
          Những khoảnh khắc đáng nhớ của chúng mình
        </p>
        <button v-if="authStore.isAdmin"
          @click="showSubmitForm = true"
          class="mt-2 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          + Tạo hoạt động mới
        </button>
      </div>

      <!-- Filter Tabs -->
      <div class="mb-8 flex flex-wrap justify-center gap-3">
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
            {{ month }}
          </option>
        </select>
      </div>

      <!-- Activities Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="activity in filteredActivities" :key="activity.id"
          class="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div class="relative">
            <img :src="activity.image" :alt="activity.title" class="w-full h-56 object-cover" />
            <div class="absolute top-4 right-4">
              <span class="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                {{ activity.category }}
              </span>
            </div>
          </div>
          <div class="px-6 pt-2">
            <h3 class="text-xl font-bold text-gray-800 mb-2">{{ activity.title }}</h3>
            <p class="text-gray-600 mb-2 line-clamp-3">{{ activity.description }}</p>

          </div>
          <div class="pb-6 px-6 mt-auto">
            <div class="flex items-center justify-between text-sm text-gray-500">
              <span>📅 {{ activity.date }}</span>
              <span>👁️ {{ activity.views }} lượt xem</span>
            </div>
            <button @click="viewActivity(activity)"
              class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors duration-300">
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredActivities.length === 0" class="text-center py-16">
        <div class="text-6xl mb-4">📭</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">Chưa có hoạt động nào</h3>
        <p class="text-gray-600">Hãy quay lại sau để xem các hoạt động mới!</p>
      </div>
    </div>

    <!-- Modal for Activity Detail -->
    <CommonModal v-model="selectedActivity" :title="selectedActivity?.title || ''" maxWidth="max-w-4xl">
      <div @click.stop class="bg-white rounded-2xl max-w-4xl w-full">
        <div class="relative rounded-t-2xl">
          <img :src="selectedActivity.image" :alt="selectedActivity.title"
            class="w-full h-96 object-cover rounded-t-2xl" />
          <button @click="selectedActivity = null"
            class="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
            ✕
          </button>
        </div>
        <div class="px-6 py-4 rounded-2xl">
          <div class="max-h-[35vh] overflow-y-auto p-0 m-0">
            <span class="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-2">
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
    </CommonModal>

    <!-- Create Activity Modal -->
    <CreateActivityModal
      v-model="showSubmitForm"
      @submit="handleCreateActivity"
    />

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import activitiesData from '../data/activities.json'
import CommonModal from '../components/CommonModal.vue'
import { useAuthStore } from '../stores/auth'
import CreateActivityModal from '../components/Modal/CreateActivityModal.vue'

const authStore = useAuthStore()
const selectedCategory = ref('all')
const selectedMonth = ref('all')
const selectedActivity = ref(null)
const showSubmitForm = ref(false)

const categories = [
  { id: 'all', name: 'Tất cả', icon: '📚' },
  { id: 'learning', name: 'Học tập', icon: '✏️' },
  { id: 'experience', name: 'Trải nghiệm', icon: '🌍' },
  { id: 'art', name: 'Văn nghệ', icon: '🎭' },
  { id: 'sports', name: 'Thể thao', icon: '⚽' },
  { id: 'life-skills', name: 'Kỹ năng sống', icon: '🛠️' }
]

const months = [
  'Tháng 9/2024', 'Tháng 10/2024', 'Tháng 11/2024', 'Tháng 12/2024',
  'Tháng 1/2025', 'Tháng 2/2025', 'Tháng 3/2025', 'Tháng 4/2025',
  'Tháng 5/2025'
]

// Load activities from JSON and update image URLs
const activities = ref(activitiesData.map(activity => ({
  ...activity,
  image: activity.image,
  gallery: activity.gallery ?? undefined
})))

const filteredActivities = computed(() => {
  let result = activities.value

  if (selectedCategory.value !== 'all') {
    result = result.filter(a => a.categoryId === selectedCategory.value)
  }

  if (selectedMonth.value !== 'all') {
    result = result.filter(a => a.month === selectedMonth.value)
  }

  return result
})

const viewActivity = (activity) => {
  selectedActivity.value = activity
}

const handleCreateActivity = (newActivity) => {
  // Chuyển đổi format ngày từ YYYY-MM-DD sang DD/MM/YYYY
  const [year, month, day] = newActivity.date.split('-')
  newActivity.date = `${day}/${month}/${year}`
  
  // Thêm hoạt động mới vào đầu danh sách
  activities.value.unshift(newActivity)
  
  // Hiển thị thông báo thành công (có thể thêm toast notification)
  console.log('Hoạt động mới đã được tạo:', newActivity)
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
