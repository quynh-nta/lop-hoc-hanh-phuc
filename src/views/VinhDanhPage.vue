<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-4">
        <h1 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          🏆 Bảng Vinh Danh
        </h1>
        <p class="text-gray-600 text-lg">
          Tôn vinh những học sinh xuất sắc của lớp
        </p>
      </div>

      <!-- Tabs -->
      <div class="flex justify-center mb-8">
        <div class="inline-flex rounded-lg bg-white shadow-md p-1">
          <button
            @click="activeTab = 'weekly'"
            :class="[
              'px-6 py-3 rounded-lg font-medium transition-all duration-200',
              activeTab === 'weekly'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            📅 Theo tuần
          </button>
          <button
            @click="activeTab = 'monthly'"
            :class="[
              'px-6 py-3 rounded-lg font-medium transition-all duration-200',
              activeTab === 'monthly'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            📆 Theo tháng
          </button>
        </div>
      </div>

      <!-- Navigation Controls -->
      <div class="flex items-center justify-center gap-4 mb-4">
        <button
          @click="previousPeriod"
          :disabled="currentWeekIndex === 0 && activeTab === 'weekly' || currentMonthIndex === 0 && activeTab === 'monthly'"
          class="px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Trước
        </button>
        
        <div class="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium">
          {{ activeTab === 'weekly' ? `${currentWeekIndex + 1}/${topStudentsData.weekly.length}` : `${currentMonthIndex + 1}/${topStudentsData.monthly.length}` }}
        </div>

        <button
          @click="nextPeriod"
          :disabled="currentWeekIndex === topStudentsData.weekly.length - 1 && activeTab === 'weekly' || currentMonthIndex === topStudentsData.monthly.length - 1 && activeTab === 'monthly'"
          class="px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600"
        >
          Sau
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Weekly Content -->
      <div v-if="activeTab === 'weekly'" class="flex justify-center">
        <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-6xl">
          <h2 class="text-2xl font-bold text-center mb-[80px] text-gray-800">
            {{ topStudentsData.weekly[currentWeekIndex].week }}
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Top 2 -->
            <div class="relative order-2 md:order-1">
              <div class="bg-gradient-to-br from-gray-300 to-gray-500 rounded-2xl p-6 shadow-xl">
                <div class="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div class="bg-gray-400 rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg border-4 border-white">
                    🥈
                  </div>
                </div>
                <div class="text-center mt-4">
                  <div class="text-5xl mb-3">{{ topStudentsData.weekly[currentWeekIndex].topStudents[1].avatar }}</div>
                  <h3 class="text-lg font-bold text-white mb-2">{{ topStudentsData.weekly[currentWeekIndex].topStudents[1].name }}</h3>
                  <div class="bg-white/30 backdrop-blur-sm rounded-lg px-3 py-2">
                    <span class="text-white font-bold text-xl">{{ topStudentsData.weekly[currentWeekIndex].topStudents[1].points }}</span>
                    <span class="text-gray-100 text-xs ml-1">điểm</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Top 1 (Larger) -->
            <div class="relative order-1 md:order-2">
              <div class="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-8 transform md:-translate-y-12 shadow-2xl">
                <div class="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <div class="bg-yellow-500 rounded-full w-20 h-20 flex items-center justify-center text-4xl shadow-lg border-4 border-white">
                    🥇
                  </div>
                </div>
                <div class="text-center mt-8">
                  <div class="text-7xl mb-6">{{ topStudentsData.weekly[currentWeekIndex].topStudents[0].avatar }}</div>
                  <h3 class="text-2xl font-bold text-white mb-3">{{ topStudentsData.weekly[currentWeekIndex].topStudents[0].name }}</h3>
                  <div class="bg-white/30 backdrop-blur-sm rounded-lg px-4 py-3">
                    <span class="text-white font-bold text-3xl">{{ topStudentsData.weekly[currentWeekIndex].topStudents[0].points }}</span>
                    <span class="text-yellow-100 text-base ml-1">điểm</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Top 3 -->
            <div class="relative order-3 md:order-3">
              <div class="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-6 shadow-xl">
                <div class="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div class="bg-orange-500 rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg border-4 border-white">
                    🥉
                  </div>
                </div>
                <div class="text-center mt-4">
                  <div class="text-5xl mb-3">{{ topStudentsData.weekly[currentWeekIndex].topStudents[2].avatar }}</div>
                  <h3 class="text-lg font-bold text-white mb-2">{{ topStudentsData.weekly[currentWeekIndex].topStudents[2].name }}</h3>
                  <div class="bg-white/30 backdrop-blur-sm rounded-lg px-3 py-2">
                    <span class="text-white font-bold text-xl">{{ topStudentsData.weekly[currentWeekIndex].topStudents[2].points }}</span>
                    <span class="text-orange-100 text-xs ml-1">điểm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Monthly Content -->
      <div v-if="activeTab === 'monthly'" class="flex justify-center">
        <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-6xl">
          <h2 class="text-2xl font-bold text-center mb-[80px] text-gray-800">
            {{ topStudentsData.monthly[currentMonthIndex].month }}
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Top 2 -->
            <div class="relative order-2 md:order-1">
              <div class="bg-gradient-to-br from-gray-300 to-gray-500 rounded-2xl p-6 shadow-xl">
                <div class="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div class="bg-gray-400 rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg border-4 border-white">
                    🥈
                  </div>
                </div>
                <div class="text-center mt-4">
                  <div class="text-5xl mb-3">{{ topStudentsData.monthly[currentMonthIndex].topStudents[1].avatar }}</div>
                  <h3 class="text-lg font-bold text-white mb-2">{{ topStudentsData.monthly[currentMonthIndex].topStudents[1].name }}</h3>
                  <div class="bg-white/30 backdrop-blur-sm rounded-lg px-3 py-2 mb-3">
                    <span class="text-white font-bold text-xl">{{ topStudentsData.monthly[currentMonthIndex].topStudents[1].points }}</span>
                    <span class="text-gray-100 text-xs ml-1">điểm</span>
                  </div>
                  <p class="text-gray-100 text-sm leading-relaxed mb-3">{{ topStudentsData.monthly[currentMonthIndex].topStudents[1].achievement }}</p>
                  <div class="flex flex-wrap justify-center gap-2">
                    <span
                      v-for="(award, i) in topStudentsData.monthly[currentMonthIndex].topStudents[1].awards"
                      :key="i"
                      class="bg-white/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full"
                    >
                      {{ award }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Top 1 (Larger) -->
            <div class="relative order-1 md:order-2">
              <div class="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-8 transform md:-translate-y-12 shadow-2xl">
                <div class="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <div class="bg-yellow-500 rounded-full w-20 h-20 flex items-center justify-center text-4xl shadow-lg border-4 border-white">
                    🥇
                  </div>
                </div>
                <div class="text-center mt-8">
                  <div class="text-7xl mb-6">{{ topStudentsData.monthly[currentMonthIndex].topStudents[0].avatar }}</div>
                  <h3 class="text-2xl font-bold text-white mb-3">{{ topStudentsData.monthly[currentMonthIndex].topStudents[0].name }}</h3>
                  <div class="bg-white/30 backdrop-blur-sm rounded-lg px-4 py-3 mb-4">
                    <span class="text-white font-bold text-3xl">{{ topStudentsData.monthly[currentMonthIndex].topStudents[0].points }}</span>
                    <span class="text-yellow-100 text-base ml-1">điểm</span>
                  </div>
                  <p class="text-yellow-50 text-sm leading-relaxed mb-3">{{ topStudentsData.monthly[currentMonthIndex].topStudents[0].achievement }}</p>
                  <div class="flex flex-wrap justify-center gap-2">
                    <span
                      v-for="(award, i) in topStudentsData.monthly[currentMonthIndex].topStudents[0].awards"
                      :key="i"
                      class="bg-white/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full"
                    >
                      {{ award }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Top 3 -->
            <div class="relative order-3 md:order-3">
              <div class="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-6 shadow-xl">
                <div class="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div class="bg-orange-500 rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg border-4 border-white">
                    🥉
                  </div>
                </div>
                <div class="text-center mt-4">
                  <div class="text-5xl mb-3">{{ topStudentsData.monthly[currentMonthIndex].topStudents[2].avatar }}</div>
                  <h3 class="text-lg font-bold text-white mb-2">{{ topStudentsData.monthly[currentMonthIndex].topStudents[2].name }}</h3>
                  <div class="bg-white/30 backdrop-blur-sm rounded-lg px-3 py-2 mb-3">
                    <span class="text-white font-bold text-xl">{{ topStudentsData.monthly[currentMonthIndex].topStudents[2].points }}</span>
                    <span class="text-orange-100 text-xs ml-1">điểm</span>
                  </div>
                  <p class="text-orange-50 text-sm leading-relaxed mb-3">{{ topStudentsData.monthly[currentMonthIndex].topStudents[2].achievement }}</p>
                  <div class="flex flex-wrap justify-center gap-2">
                    <span
                      v-for="(award, i) in topStudentsData.monthly[currentMonthIndex].topStudents[2].awards"
                      :key="i"
                      class="bg-white/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full"
                    >
                      {{ award }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Motivational Quote -->
      <div class="mt-12 text-center">
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-xl text-white">
          <p class="text-2xl font-bold mb-2">✨ Chúc mừng các bạn! ✨</p>
          <p class="text-lg opacity-90">
            "Thành công không phải là chìa khóa của hạnh phúc. Hạnh phúc chính là chìa khóa của thành công."
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import topStudentsData from '../data/topStudents.json'

const activeTab = ref('weekly')
const currentWeekIndex = ref(0)
const currentMonthIndex = ref(0)

const nextPeriod = () => {
  if (activeTab.value === 'weekly') {
    if (currentWeekIndex.value < topStudentsData.weekly.length - 1) {
      currentWeekIndex.value++
    }
  } else {
    if (currentMonthIndex.value < topStudentsData.monthly.length - 1) {
      currentMonthIndex.value++
    }
  }
}

const previousPeriod = () => {
  if (activeTab.value === 'weekly') {
    if (currentWeekIndex.value > 0) {
      currentWeekIndex.value--
    }
  } else {
    if (currentMonthIndex.value > 0) {
      currentMonthIndex.value--
    }
  }
}
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
