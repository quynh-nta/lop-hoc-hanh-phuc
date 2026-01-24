<template>
  <div class="students-page py-16 bg-gradient-to-br from-blue-50 to-purple-50">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          👥 Danh sách lớp học
        </h1>
        <p class="text-xl text-gray-600">
          35 học sinh và 35 phụ huynh của lớp 5A
        </p>
      </div>

      <!-- Stats -->
      <div class="grid md:grid-cols-4 gap-6 mb-12">
        <div class="bg-white rounded-xl p-6 shadow-md text-center">
          <div class="text-4xl mb-2">👨‍🎓</div>
          <p class="text-3xl font-bold text-blue-600">18</p>
          <p class="text-gray-600">Nam</p>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-md text-center">
          <div class="text-4xl mb-2">👩‍🎓</div>
          <p class="text-3xl font-bold text-pink-600">17</p>
          <p class="text-gray-600">Nữ</p>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-md text-center">
          <div class="text-4xl mb-2">⭐</div>
          <p class="text-3xl font-bold text-yellow-600">12</p>
          <p class="text-gray-600">Học sinh giỏi</p>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-md text-center">
          <div class="text-4xl mb-2">🏆</div>
          <p class="text-3xl font-bold text-green-600">8</p>
          <p class="text-gray-600">Có giải thưởng</p>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="mb-8 bg-white rounded-xl p-6 shadow-md">
        <div class="grid md:grid-cols-3 gap-4">
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
              v-model="sortBy"
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sắp xếp theo tên</option>
              <option value="number">Theo số báo danh</option>
              <option value="achievement">Theo thành tích</option>
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
          <div class="p-6">
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
                <p class="text-sm text-gray-500">SBD: {{ student.number }}</p>
                <div class="flex items-center space-x-2 mt-1">
                  <span :class="[
                    'px-2 py-1 rounded-full text-xs font-semibold',
                    student.gender === 'male' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
                  ]">
                    {{ student.gender === 'male' ? '👨‍🎓 Nam' : '👩‍🎓 Nữ' }}
                  </span>
                  <span v-if="student.isExcellent" class="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs font-semibold">
                    ⭐ Xuất sắc
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
            <div class="flex space-x-2 mt-4">
              <button 
                @click="startChat(student)"
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
      :recipient="selectedStudent"
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ChatComponent from '../components/ChatComponent.vue'

const searchQuery = ref('')
const filterGender = ref('all')
const sortBy = ref('name')
const showChat = ref(false)
const showProfile = ref(false)
const selectedStudent = ref(null)

const students = ref([
  {
    id: 1,
    name: 'Nguyễn Minh An',
    number: '01',
    gender: 'male',
    dob: '15/03/2015',
    email: 'minhan@student.edu.vn',
    address: '123 Lý Thường Kiệt, Q.10, TP.HCM',
    isExcellent: true,
    achievements: ['Giải Nhất Toán', 'Giải Nhì Văn'],
    parent: {
      father: 'Nguyễn Văn A',
      mother: 'Trần Thị B',
      phone: '0123456789'
    }
  },
  {
    id: 2,
    name: 'Trần Bảo An',
    number: '02',
    gender: 'female',
    dob: '22/05/2015',
    email: 'baoan@student.edu.vn',
    address: '456 Nguyễn Huệ, Q.1, TP.HCM',
    isExcellent: true,
    achievements: ['Giải Nhất Vẽ tranh', 'Học sinh giỏi'],
    parent: {
      father: 'Trần Văn C',
      mother: 'Lê Thị D',
      phone: '0987654321'
    }
  },
  {
    id: 3,
    name: 'Lê Quỳnh Anh',
    number: '03',
    gender: 'female',
    dob: '10/08/2015',
    email: 'quynhanh@student.edu.vn',
    address: '789 Trần Hưng Đạo, Q.5, TP.HCM',
    isExcellent: false,
    achievements: ['Giải Ba Toán'],
    parent: {
      father: 'Lê Văn E',
      mother: 'Phạm Thị F',
      phone: '0369258147'
    }
  },
  {
    id: 4,
    name: 'Phạm Tuấn Anh',
    number: '04',
    gender: 'male',
    dob: '05/12/2014',
    email: 'tuananh@student.edu.vn',
    address: '321 Võ Văn Tần, Q.3, TP.HCM',
    isExcellent: true,
    achievements: ['Giải Nhất STEM', 'Giải Nhì Tin học'],
    parent: {
      father: 'Phạm Văn G',
      mother: 'Nguyễn Thị H',
      phone: '0147258369'
    }
  },
  {
    id: 5,
    name: 'Hoàng Mai Linh',
    number: '05',
    gender: 'female',
    dob: '18/06/2015',
    email: 'mailinh@student.edu.vn',
    address: '654 Lê Lợi, Q.1, TP.HCM',
    isExcellent: false,
    achievements: ['Giải Khuyến khích Văn'],
    parent: {
      father: 'Hoàng Văn I',
      mother: 'Đỗ Thị K',
      phone: '0258147369'
    }
  },
  {
    id: 6,
    name: 'Nguyễn Đức Thắng',
    number: '06',
    gender: 'male',
    dob: '28/09/2015',
    email: 'ducthang@student.edu.vn',
    address: '987 Hai Bà Trưng, Q.3, TP.HCM',
    isExcellent: true,
    achievements: ['Giải Nhì Thể thao', 'Học sinh tiêu biểu'],
    parent: {
      father: 'Nguyễn Văn L',
      mother: 'Vũ Thị M',
      phone: '0369147258'
    }
  },
  {
    id: 7,
    name: 'Phạm Thu Hà',
    number: '07',
    gender: 'female',
    dob: '14/04/2015',
    email: 'thuha@student.edu.vn',
    address: '147 Pasteur, Q.1, TP.HCM',
    isExcellent: true,
    achievements: ['Giải Nhất Vẽ tranh toàn quốc'],
    parent: {
      father: 'Phạm Văn N',
      mother: 'Lý Thị O',
      phone: '0741852963'
    }
  },
  {
    id: 8,
    name: 'Trần Minh Khoa',
    number: '08',
    gender: 'male',
    dob: '03/11/2015',
    email: 'minhkhoa@student.edu.vn',
    address: '258 Nguyễn Thái Học, Q.1, TP.HCM',
    isExcellent: false,
    achievements: [],
    parent: {
      father: 'Trần Văn P',
      mother: 'Hoàng Thị Q',
      phone: '0852963741'
    }
  }
])

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

  // Sort
  if (sortBy.value === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name, 'vi'))
  } else if (sortBy.value === 'number') {
    result.sort((a, b) => parseInt(a.number) - parseInt(b.number))
  } else if (sortBy.value === 'achievement') {
    result.sort((a, b) => b.achievements.length - a.achievements.length)
  }

  return result
})

const startChat = (student) => {
  selectedStudent.value = student
  showChat.value = true
}

const viewProfile = (student) => {
  selectedStudent.value = student
  showProfile.value = true
}
</script>
