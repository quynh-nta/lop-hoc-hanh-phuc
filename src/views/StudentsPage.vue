<template>
  <div class="students-page py-8 bg-gradient-to-br from-blue-50 to-purple-50">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-0">
          👥 Danh sách lớp học
        </h1>
        <p class="text-xxs text-gray-600">
          33 học sinh và 33 phụ huynh của lớp 6A1
        </p>
      </div>

      <!-- Stats -->
      <div class="grid md:grid-cols-4 gap-6 mb-12">
        <div class="bg-white rounded-xl p-6 shadow-md text-center">
          <div class="text-4xl mb-2">👨‍🎓</div>
          <p class="text-3xl font-bold text-blue-600">{{ numberMale }}</p>
          <p class="text-gray-600">Nam</p>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-md text-center">
          <div class="text-4xl mb-2">👩‍🎓</div>
          <p class="text-3xl font-bold text-pink-600">{{ numberFemale }}</p>
          <p class="text-gray-600">Nữ</p>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-md text-center">
          <div class="text-4xl mb-2">⭐</div>
          <p class="text-3xl font-bold text-yellow-600">{{ numberExcellent }}</p>
          <p class="text-gray-600">Học sinh giỏi</p>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-md text-center">
          <div class="text-4xl mb-2">🏆</div>
          <p class="text-3xl font-bold text-green-600">0</p>
          <p class="text-gray-600">Có giải thưởng</p>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="mb-8 bg-white rounded-xl p-6 shadow-md">
        <div class="grid md:grid-cols-4 gap-4 mb-4">
          <div>
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="🔍 Tìm kiếm theo tên..."
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <select 
              v-model="filterGender"
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>
          <div>
            <select 
              v-model="filterGroup"
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả tổ</option>
              <option value="1">Tổ 1</option>
              <option value="2">Tổ 2</option>
              <option value="3">Tổ 3</option>
              <option value="4">Tổ 4</option>
            </select>
          </div>
          <div>
            <select 
              v-model="sortBy"
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sắp xếp theo tên</option>
              <option value="number">Theo số báo danh</option>
              <option value="achievement">Theo thành tích</option>
              <option value="points">Theo điểm tuần</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Students List -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="student in filteredStudents" 
          :key="student.id"
          class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          <div class="p-6 flex flex-col h-full">
            <span v-if="student.position" class="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold text-center mb-2">
                    👑 {{ student.position }}
                  </span>
            <!-- Student Info -->
            <div class="flex items-start space-x-4 mb-4">
              <div :class="[
                'w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl',
                student.gender === 'male' ? 'bg-gradient-to-br from-blue-400 to-blue-600' : 'bg-gradient-to-br from-pink-400 to-pink-600'
              ]">
                {{ student.name.charAt(0) }}
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-800">{{ student.name }}</h3>
                <p class="text-sm text-gray-500">SBD: {{ student.number }} • Tổ {{ student.group }}</p>
                <div class="flex items-center flex-wrap gap-2 mt-1">
                  <span :class="[
                    'px-2 py-1 rounded-full text-xs font-semibold',
                    student.gender === 'male' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
                  ]">
                    {{ student.gender === 'male' ? '👨‍🎓 Nam' : '👩‍🎓 Nữ' }}
                  </span>
                  <span v-if="student.isExcellent" class="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs font-semibold">
                    ⭐ Xuất sắc
                  </span>
                  <span class="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">
                    ⭐ {{ student.weeklyPoints }} điểm
                  </span>
                </div>
              </div>
            </div>

            <!-- Achievements -->
            <div v-if="student.achievements.length > 0" class="mb-4">
              <p class="text-sm font-semibold text-gray-700 mb-2">🏆 Thành tích:</p>
              <div class="space-y-1">
                <p 
                  v-for="(achievement, index) in student.achievements" 
                  :key="index"
                  class="text-sm text-gray-600"
                >
                  • {{ achievement }}
                </p>
              </div>
            </div>

            <!-- Parent Info -->
            <div class="border-t pt-4">
              <p class="text-sm font-semibold text-gray-700 mb-2">👨‍👩‍👧 Phụ huynh:</p>
              <div class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">Bố:</span>
                  <span class="font-semibold text-gray-800">{{ student.parent.father }}</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">Mẹ:</span>
                  <span class="font-semibold text-gray-800">{{ student.parent.mother }}</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">📱 SĐT:</span>
                  <a :href="`tel:${student.parent.phone}`" class="font-semibold text-blue-600 hover:underline">
                    {{ student.parent.phone }}
                  </a>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="mt-auto flex flex-col space-y-2 mt-4 relative">
              <div
                v-if="showChatPersons === student.id"
                class="w-60 bg-white rounded-lg shadow-2xl z-50 absolute bottom-12 left-0"
              >
                <div class="bg-blue-600 text-white p-2 rounded-t-lg flex justify-between items-center">
                  <h3 class="font-semibold">Chọn người chat</h3>
                  <button @click="showChatPersons = null">
                    ❌
                  </button>
                </div>
                <div class="divide-y">
                  <button
                    @click="startChat(student)"
                    class="p-2"
                  >
                    Chat với học sinh
                  </button>
                  <button
                    @click="startChatParent(student.parent)"
                    class="w-full p-2 text-left"
                  >
                    Chat với phụ huynh
                  </button>
                </div>
              </div>
              <div class="flex space-x-2">
                <button 
                  @click="showChatPersons = showChatPersons === student.id ? null : student.id"
                  class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-1"
                >
                  <span>💬</span>
                  <span>Chat</span>
                </button>
                <button 
                  @click="viewProfile(student)"
                  class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-colors"
                >
                  👤 Hồ sơ
                </button>
              </div>
              <button 
                v-if="canSetPoints"
                @click="openPointsModal(student)"
                class="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-2 rounded-lg font-semibold transition-colors"
              >
                ⭐ Chấm điểm tuần
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredStudents.length === 0" class="text-center py-16">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy kết quả</h3>
        <p class="text-gray-600">Thử tìm kiếm với từ khóa khác</p>
      </div>
    </div>

    <!-- Chat Modal -->
    <ChatComponent 
      v-if="showChat"
      :recipient="selectedChatPerson"
      @close="showChat = false"
    />

    <!-- Profile Modal -->
    <div 
      v-if="showProfile"
      @click="showProfile = false"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div 
        @click.stop
        class="bg-white rounded-2xl max-w-2xl w-full p-8"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">👤 Hồ sơ học sinh</h2>
          <button 
            @click="showProfile = false"
            class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
          >
            ✕
          </button>
        </div>
        <div v-if="selectedStudent" class="space-y-4">
          <div class="text-center mb-6">
            <div :class="[
              'w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-4xl mx-auto mb-4',
              selectedStudent.gender === 'male' ? 'bg-gradient-to-br from-blue-400 to-blue-600' : 'bg-gradient-to-br from-pink-400 to-pink-600'
            ]">
              {{ selectedStudent.name.charAt(0) }}
            </div>
            <h3 class="text-2xl font-bold text-gray-800">{{ selectedStudent.name }}</h3>
            <p class="text-gray-600">Số báo danh: {{ selectedStudent.number }}</p>
          </div>
          
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-blue-50 rounded-lg p-4">
              <p class="text-sm text-gray-600 mb-1">Ngày sinh</p>
              <p class="font-semibold text-gray-800">{{ selectedStudent.dob }}</p>
            </div>
            <div class="bg-purple-50 rounded-lg p-4">
              <p class="text-sm text-gray-600 mb-1">Giới tính</p>
              <p class="font-semibold text-gray-800">{{ selectedStudent.gender === 'male' ? 'Nam' : 'Nữ' }}</p>
            </div>
            <div class="bg-green-50 rounded-lg p-4">
              <p class="text-sm text-gray-600 mb-1">Học lực</p>
              <p class="font-semibold text-gray-800">{{ selectedStudent.isExcellent ? 'Xuất sắc' : 'Khá' }}</p>
            </div>
            <div class="bg-yellow-50 rounded-lg p-4">
              <p class="text-sm text-gray-600 mb-1">Hạnh kiểm</p>
              <p class="font-semibold text-gray-800">Tốt</p>
            </div>
            <div class="bg-orange-50 rounded-lg p-4">
              <p class="text-sm text-gray-600 mb-1">Tổ</p>
              <p class="font-semibold text-gray-800">Tổ {{ selectedStudent.group }}</p>
            </div>
            <div class="bg-indigo-50 rounded-lg p-4">
              <p class="text-sm text-gray-600 mb-1">Chức vụ</p>
              <p class="font-semibold text-gray-800">{{ selectedStudent.position || 'Không có' }}</p>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-sm text-gray-600 mb-2">📧 Email</p>
            <p class="font-semibold text-gray-800">{{ selectedStudent.email }}</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-sm text-gray-600 mb-2">🏠 Địa chỉ</p>
            <p class="font-semibold text-gray-800">{{ selectedStudent.address }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Points Modal -->
    <div 
      v-if="showPointsModal"
      @click="showPointsModal = false"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div 
        @click.stop
        class="bg-white rounded-2xl max-w-md w-full p-8"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">⭐ Chấm điểm tuần</h2>
          <button 
            @click="showPointsModal = false"
            class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
          >
            ✕
          </button>
        </div>
        <div v-if="selectedStudent" class="space-y-4">
          <div class="text-center mb-4">
            <div :class="[
              'w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-3',
              selectedStudent.gender === 'male' ? 'bg-gradient-to-br from-blue-400 to-blue-600' : 'bg-gradient-to-br from-pink-400 to-pink-600'
            ]">
              {{ selectedStudent.name.charAt(0) }}
            </div>
            <h3 class="text-xl font-bold text-gray-800">{{ selectedStudent.name }}</h3>
            <p class="text-gray-600">Tổ {{ selectedStudent.group }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Điểm tuần này (0-100)
            </label>
            <input 
              v-model.number="weeklyPointsInput"
              type="number"
              min="0"
              max="100"
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-center text-2xl font-bold"
              placeholder="85"
            />
          </div>

          <div class="bg-blue-50 rounded-lg p-4">
            <p class="text-sm text-gray-600 mb-2">💡 Hướng dẫn chấm điểm:</p>
            <ul class="text-xs text-gray-600 space-y-1">
              <li>• 90-100: Xuất sắc</li>
              <li>• 80-89: Giỏi</li>
              <li>• 70-79: Khá</li>
              <li>• 60-69: Trung bình</li>
            </ul>
          </div>

          <div class="flex space-x-3">
            <button 
              @click="showPointsModal = false"
              class="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
            >
              Hủy
            </button>
            <button 
              @click="saveWeeklyPoints"
              class="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-colors"
            >
              Lưu điểm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ChatComponent from '../components/ChatComponent.vue'
import { useAuthStore } from '../stores/auth'
import studentsData from '../data/students.json'

const authStore = useAuthStore()
const searchQuery = ref('')
const filterGender = ref('all')
const filterGroup = ref('all')
const sortBy = ref('number')
const showChat = ref(false)
const showProfile = ref(false)
const showPointsModal = ref(false)
const selectedStudent = ref(null)
const weeklyPointsInput = ref(0)
const showChatPersons = ref(null)
const selectedChatPerson = ref(null)

// Load students from localStorage first, fallback to JSON file
const loadStudents = () => {
  const localData = localStorage.getItem('students')
  if (localData) {
    try {
      if (JSON.parse(localData).length > 0) {
        return JSON.parse(localData)
      } else {
        return studentsData
      }
    } catch (e) {
    }
  }
  return studentsData
}

const students = ref(loadStudents())
const numberMale = computed(() => students.value.filter(s => s.gender === 'male').length)
const numberFemale = computed(() => students.value.filter(s => s.gender === 'female').length)
const numberExcellent = computed(() => students.value.filter(s => s.isExcellent).length)

const filteredStudents = computed(() => {
  let result = students.value

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(s => 
      s.name.toLowerCase().includes(query) ||
      s.number.includes(query) ||
      s.parent.father.toLowerCase().includes(query) ||
      s.parent.mother.toLowerCase().includes(query)
    )
  }

  // Filter by gender
  if (filterGender.value !== 'all') {
    result = result.filter(s => s.gender === filterGender.value)
  }

  // Filter by group
  if (filterGroup.value !== 'all') {
    result = result.filter(s => s.group === parseInt(filterGroup.value))
  }

  // Sort
  if (sortBy.value === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name, 'vi'))
  } else if (sortBy.value === 'number') {
    result.sort((a, b) => parseInt(a.number) - parseInt(b.number))
  } else if (sortBy.value === 'achievement') {
    result.sort((a, b) => b.achievements.length - a.achievements.length)
  } else if (sortBy.value === 'points') {
    result.sort((a, b) => (b.weeklyPoints || 0) - (a.weeklyPoints || 0))
  }

  return result
})

// Check if current user can set weekly points (teacher or student with position)
const canSetPoints = computed(() => {
  if (authStore.isAdmin) return true
  if (authStore.isAuthenticated && authStore.currentUser) {
    // Find current user in students list
    const currentStudent = students.value.find(s => s.name === authStore.currentUser.name)
    return currentStudent && currentStudent.position && currentStudent.position.trim() !== ''
  }
  return false
})

const startChat = (person) => {
  selectedChatPerson.value = person
  showChat.value = true
  showChatPersons.value = null
}

const startChatParent = (person) => {
  selectedChatPerson.value = {
    name: person.father,
    gender: 'male' // default
  }
  showChat.value = true
  showChatPersons.value = null
}

const viewProfile = (student) => {
  selectedStudent.value = student
  showProfile.value = true
}

const openPointsModal = (student) => {
  selectedStudent.value = student
  weeklyPointsInput.value = student.weeklyPoints || 0
  showPointsModal.value = true
}

const saveWeeklyPoints = () => {
  if (selectedStudent.value && weeklyPointsInput.value >= 0 && weeklyPointsInput.value <= 100) {
    // Find and update student
    const studentIndex = students.value.findIndex(s => s.id === selectedStudent.value.id)
    if (studentIndex !== -1) {
      students.value[studentIndex].weeklyPoints = weeklyPointsInput.value
      selectedStudent.value.weeklyPoints = weeklyPointsInput.value
    }
    showPointsModal.value = false
    // In a real app, you would save this to a backend/database
    alert(`Đã lưu điểm ${weeklyPointsInput.value} cho ${selectedStudent.value.name}`)
  }
}
</script>
