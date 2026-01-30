<template>
  <div class="admin-page py-16 bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="mb-8 border border-gray-200 bg-white rounded-xl p-4">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">🔐 Trang quản trị</h1>
        <p class="text-gray-600">Quản lý nội dung và phê duyệt bài viết</p>
                <!-- Stats Cards -->
        <div class="grid md:grid-cols-4 gap-6 mt-4">
          <div class="bg-white rounded-xl p-6 border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm mb-1">Chờ duyệt</p>
                <p class="text-3xl font-bold text-orange-600">{{ pendingCount }}</p>
              </div>
              <div class="text-4xl">⏳</div>
            </div>
          </div>
          <div class="bg-white rounded-xl p-6 border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm mb-1">Đã duyệt</p>
                <p class="text-3xl font-bold text-green-600">{{ approvedCount }}</p>
              </div>
              <div class="text-4xl">✅</div>
            </div>
          </div>
          <div class="bg-white rounded-xl p-6 border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm mb-1">Đã từ chối</p>
                <p class="text-3xl font-bold text-red-600">{{ rejectedCount }}</p>
              </div>
              <div class="text-4xl">❌</div>
            </div>
          </div>
          <div class="bg-white rounded-xl p-6 border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm mb-1">Hoạt động</p>
                <p class="text-3xl font-bold text-blue-600">{{ activitiesCount }}</p>
              </div>
              <div class="text-4xl">📸</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Admin Dashboard (if logged in) -->
      <div>


        <!-- Tabs -->
        <div class="mb-6 flex flex-wrap gap-3">
          <button 
            v-for="tab in adminTabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-2 rounded-lg font-semibold transition-colors',
              activeTab === tab.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-blue-50'
            ]"
          >
            {{ tab.icon }} {{ tab.name }}
          </button>
        </div>

        <!-- Pending Approvals -->
        <div v-if="activeTab === 'pending'" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="item in pendingItems" 
            :key="item.id"
            class="bg-white rounded-xl p-6 shadow-md"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-start space-x-3">
                <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {{ item.author.charAt(0) }}
                </div>
                <div>
                  <h3 class="font-bold text-gray-800">{{ item.author }}</h3>
                  <p class="text-sm text-gray-500">{{ item.date }} | {{ item.type }}</p>
                </div>
              </div>
              <span class="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                Chờ duyệt
              </span>
            </div>
            <p class="text-gray-700 mb-4 italic">"{{ item.content }}"</p>
            <div class="flex space-x-3">
              <button 
                @click="approveItem(item.id)"
                class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors"
              >
                ✓ Phê duyệt
              </button>
              <button 
                @click="rejectItem(item.id)"
                class="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-colors"
              >
                ✕ Từ chối
              </button>
            </div>
          </div>
          <div v-if="pendingItems.length === 0" class="text-center py-12">
            <div class="text-6xl mb-4">✅</div>
            <p class="text-xl text-gray-600">Không có nội dung chờ duyệt</p>
          </div>
        </div>

        <!-- Approved Content -->
        <div v-if="activeTab === 'approved'" class="space-y-4">
          <div 
            v-for="item in approvedItems" 
            :key="item.id"
            class="bg-white rounded-xl p-6 shadow-md"
          >
          </div>
        </div>
        <!-- Đã từ chối -->
        <div v-if="activeTab === 'rejected'" class="space-y-4">
          <div 
            v-for="item in rejectedItems" 
            :key="item.id"
            class="bg-white rounded-xl p-6 shadow-md"
          >
          </div>
        </div>

        <!-- Settings -->
        <div v-if="activeTab === 'settings'" class="space-y-4">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">⚙️ Cài đặt</h2>
          <div class="bg-white rounded-xl p-6 shadow-md">
            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">Thông tin lớp</h3>
                <p class="text-gray-600">Cập nhật thông tin cơ bản về lớp học</p>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">Phân quyền</h3>
                <p class="text-gray-600">Quản lý quyền truy cập và sử dụng</p>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">Bảo mật</h3>
                <p class="text-gray-600">Cài đặt bảo mật và kiểm duyệt nội dung</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('pending')

const adminTabs = [
  { id: 'pending', name: 'Chờ duyệt', icon: '⏳' },
  { id: 'approved', name: 'Đã duyệt', icon: '✅' },
  { id: 'rejected', name: 'Đã từ chối', icon: '❌' },
  { id: 'settings', name: 'Cài đặt', icon: '⚙️' }
]

const pendingItems = ref([
  {
    id: 1,
    author: 'Nguyễn Minh An',
    content: 'Em rất vui khi được tham gia chuyến tham quan hôm nay. Em học được rất nhiều điều bổ ích.',
    date: 'Vừa xong',
    type: 'Chia sẻ cảm xúc'
  },
  {
    id: 2,
    author: 'Học sinh ẩn danh',
    content: 'Em muốn cảm ơn cô vì đã luôn quan tâm và giúp đỡ em trong học tập.',
    date: '5 phút trước',
    type: 'Chia sẻ cảm xúc'
  }
])

const pendingCount = computed(() => pendingItems.value.length)
const approvedCount = ref(45)
const rejectedCount = ref(3)
const activitiesCount = ref(12)

const approveItem = (id) => {
  pendingItems.value = pendingItems.value.filter(item => item.id !== id)
  approvedCount.value++
  alert('Đã phê duyệt!')
}

const rejectItem = (id) => {
  if (confirm('Bạn có chắc muốn từ chối nội dung này?')) {
    pendingItems.value = pendingItems.value.filter(item => item.id !== id)
    alert('Đã từ chối!')
  }
}
</script>
