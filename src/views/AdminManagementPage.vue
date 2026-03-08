<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
          👥 Quản Trị Lớp Học
        </h1>
        <p class="text-gray-600 text-lg">
          Lịch luân chuyển quản trị viên và ban biên tập theo tháng
        </p>
      </div>

      <!-- Navigation -->
      <div class="flex items-center justify-center gap-4 mb-8">
        <button
          @click="previousMonth"
          :disabled="currentMonthIndex === 0"
          class="px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium text-gray-700 hover:text-indigo-600"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Trước
        </button>
        
        <div class="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold text-lg shadow-lg">
          {{ rotationData[currentMonthIndex].month }}
        </div>

        <button
          @click="nextMonth"
          :disabled="currentMonthIndex === rotationData.length - 1"
          class="px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-started transition-all duration-200 flex items-center gap-2 font-medium text-gray-700 hover:text-indigo-600"
        >
          Sau
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Current Month Info -->
      <div class="max-w-5xl mx-auto">
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Administrators -->
          <div class="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                👨‍💼
              </div>
              <h2 class="text-2xl font-bold text-gray-800">Quản trị viên</h2>
            </div>
            <ul class="space-y-3">
              <li 
                v-for="(admin, index) in rotationData[currentMonthIndex].administrators" 
                :key="index"
                class="flex items-start gap-3 p-3 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
              >
                <span class="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {{ index + 1 }}
                </span>
                <span class="text-gray-700 font-medium">{{ admin }}</span>
              </li>
            </ul>
          </div>

          <!-- Editorial Board -->
          <div class="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl">
                ✍️
              </div>
              <h2 class="text-2xl font-bold text-gray-800">Ban biên tập</h2>
            </div>
            <ul class="space-y-3">
              <li 
                v-for="(editor, index) in rotationData[currentMonthIndex].editorialBoard" 
                :key="index"
                class="flex items-start gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors duration-200"
              >
                <span class="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {{ index + 1 }}
                </span>
                <span class="text-gray-700 font-medium">{{ editor }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Info Box -->
        <div class="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 shadow-xl text-white">
          <div class="flex items-start gap-4">
            <div class="text-3xl">ℹ️</div>
            <div>
              <h3 class="text-xl font-bold mb-2">Về việc luân chuyển</h3>
              <p class="text-indigo-100 leading-relaxed">
                Việc luân chuyển quản trị viên và ban biên tập giúp các em có cơ hội tham gia quản lý lớp học,
                phát triển kỹ năng lãnh đạo và trách nhiệm. Mỗi tháng sẽ có một nhóm khác nhau đảm nhiệm vai trò này.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentMonthIndex = ref(0)

const rotationData = [
  {
    month: 'Tháng 9/2024',
    administrators: [
      'Cô Đặng Thị Xuân Tuyền',
      'Nguyễn An An',
      'Nguyễn Đức An',
      'Hồ Hoàng Anh'
    ],
    editorialBoard: [
      'Ngô Phạm Quỳnh Anh',
      'Phạm Huỳnh Xuân Duy',
      'Trần Hữu Duy',
      'Trương Quý Duy',
      'Võ Nguyễn Tuyền Duyên'
    ]
  },
  {
    month: 'Tháng 10/2024',
    administrators: [
      'Cô Đặng Thị Xuân Tuyền',
      'Ngô Phạm Quỳnh Anh',
      'Phạm Huỳnh Xuân Duy',
      'Trần Hữu Duy'
    ],
    editorialBoard: [
      'Lê Nguyễn Gia Đạt',
      'Lê Huỳnh Khánh Đoan',
      'Trần Quốc Hảo',
      'Nguyễn Dư Gia Hân',
      'Trần Phi Hoàng'
    ]
  },
  {
    month: 'Tháng 11/2024',
    administrators: [
      'Cô Đặng Thị Xuân Tuyền',
      'Trần Quốc Hảo',
      'Nguyễn Dư Gia Hân',
      'Trần Phi Hoàng'
    ],
    editorialBoard: [
      'Nguyễn An An',
      'Nguyễn Đức An',
      'Hồ Hoàng Anh',
      'Lê Nguyễn Gia Huy',
      'Phạm Hoàng Gia Huy'
    ]
  },
  {
    month: 'Tháng 12/2024',
    administrators: [
      'Cô Đặng Thị Xuân Tuyền',
      'Lê Nguyễn Gia Đạt',
      'Lê Huỳnh Khánh Đoan',
      'Lê Nguyễn Gia Huy'
    ],
    editorialBoard: [
      'Trần Nguyễn Gia Hưng',
      'Nguyễn Hoàn Khôi',
      'Hồ Quốc Kiệt',
      'Võ Trần Tuệ Lâm',
      'Lê La Khánh Ly'
    ]
  },
  {
    month: 'Tháng 1/2025',
    administrators: [
      'Cô Đặng Thị Xuân Tuyền',
      'Trần Nguyễn Gia Hưng',
      'Nguyễn Hoàn Khôi',
      'Hồ Quốc Kiệt'
    ],
    editorialBoard: [
      'Nguyễn Ngọc Kiều Ly',
      'Võ Trần Hoàng Mỹ',
      'La Nguyễn Xuân Nghi',
      'Phan Thị Mỹ Ngoan',
      'Trần Huỳnh Khải Nguyên'
    ]
  },
  {
    month: 'Tháng 2/2025',
    administrators: [
      'Cô Đặng Thị Xuân Tuyền',
      'Nguyễn Ngọc Kiều Ly',
      'Võ Trần Hoàng Mỹ',
      'La Nguyễn Xuân Nghi'
    ],
    editorialBoard: [
      'Nguyễn Phan Khôi Nguyên',
      'Trương Yến Nhi',
      'Nguyễn Hằng Ni',
      'Nguyễn Trần Kiều Oanh',
      'Trần Như Quỳnh'
    ]
  },
  {
    month: 'Tháng 3/2025',
    administrators: [
      'Cô Đặng Thị Xuân Tuyền',
      'Nguyễn Phan Khôi Nguyên',
      'Trương Yến Nhi',
      'Nguyễn Hằng Ni'
    ],
    editorialBoard: [
      'Văn Nhật Thu Thảo',
      'Nguyễn Thị Thu Thảo',
      'Võ Lê Anh Thư',
      'Lê Nguyễn Gia Huy',
      'Phạm Hoàng Gia Huy'
    ]
  },
  {
    month: 'Tháng 4/2025',
    administrators: [
      'Cô Đặng Thị Xuân Tuyền',
      'Văn Nhật Thu Thảo',
      'Nguyễn Thị Thu Thảo',
      'Võ Lê Anh Thư'
    ],
    editorialBoard: [
      'Nguyễn Hằng Ni',
      'Nguyễn Trần Kiều Oanh',
      'Hồ Quốc Kiệt',
      'Võ Trần Tuệ Lâm',
      'Lê La Khánh Ly'
    ]
  },
  {
    month: 'Tháng 5/2025',
    administrators: [
      'Cô Đặng Thị Xuân Tuyền',
      'Phạm Hoàng Gia Huy',
      'Nguyễn Trần Kiều Oanh',
      'Trần Như Quỳnh'
    ],
    editorialBoard: [
      'Ngô Phạm Quỳnh Anh',
      'Phạm Huỳnh Xuân Duy',
      'Trần Hữu Duy',
      'Nguyễn Dư Gia Hân',
      'Trần Phi Hoàng'
    ]
  }
]

const nextMonth = () => {
  if (currentMonthIndex.value < rotationData.length - 1) {
    currentMonthIndex.value++
  }
}

const previousMonth = () => {
  if (currentMonthIndex.value > 0) {
    currentMonthIndex.value--
  }
}
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
