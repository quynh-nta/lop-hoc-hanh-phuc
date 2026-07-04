<template>
  <div class="home-page">
    <!-- Hero Section with Slideshow -->
    <section class="relative h-[600px] overflow-hidden">
      <div v-for="(image, index) in heroImages" :key="index"
        :class="['absolute inset-0 transition-opacity duration-1000', currentSlide === index ? 'opacity-100' : 'opacity-0']">
        <img :src="image.url" :alt="image.title" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
      </div>

      <div class="absolute inset-0 flex items-center">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl text-white space-y-6">
            <h1 class="text-5xl md:text-6xl font-bold animate-fade-in">
              🌟 Lớp Học Hạnh Phúc 6A1
            </h1>
            <p class="text-xl md:text-2xl animate-fade-in-delay">
              Nơi mỗi khoảnh khắc đều tràn đầy niềm vui và ý nghĩa
            </p>
            <div class="flex flex-wrap gap-4 animate-fade-in-delay-2">
              <router-link to="/hoat-dong"
                class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                Xem hoạt động
              </router-link>
              <router-link to="/chia-se"
                class="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
                Chia sẻ cảm xúc
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Slideshow Controls -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        <button v-for="(_, index) in heroImages" :key="index" @click="currentSlide = index"
          :class="['w-3 h-3 rounded-full transition-all duration-300', currentSlide === index ? 'bg-white w-8' : 'bg-white/50']"></button>
      </div>
    </section>

    <!-- Welcome Message -->
    <section class="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center space-y-6">
          <h2 class="text-4xl font-bold text-gray-800">
            💙 Chào mừng đến với lớp chúng mình!
          </h2>
          <p class="text-xl text-gray-600 leading-relaxed">
            Đây là không gian ghi lại những khoảnh khắc đẹp, những hoạt động ý nghĩa
            và những câu chuyện cảm động của chúng ta. Mỗi em học sinh đều là một ngôi sao
            tỏa sáng, và cùng nhau, chúng ta tạo nên một bầu trời đầy hạnh phúc!
          </p>
        </div>
      </div>
    </section>
    <div class="w-full flex justify-center">
      <div class="max-w-5xl w-full">
        <!-- Announcements Section -->
        <section id="announcements" class="mb-12 mt-16 px-4">
          <h1
            class="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-blue-400  dark:text-gray-200">
            📢 Thông báo
            <p class="text-md text-gray-600 mb-8 text-xs">
              Cập nhật những thông tin mới nhất từ lớp học và nhà trường
            </p>
          </h1>

          <div class="space-y-6">
            <div v-for="announcement in announcements" :key="announcement.id"
              class="bg-white rounded-xl p-6 border border-gray-300 transition-shadow duration-300">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <div :class="[
                    'w-12 h-12 rounded-full flex items-center justify-center text-2xl',
                    announcement.priority === 'high' ? 'bg-red-100' :
                      announcement.priority === 'medium' ? 'bg-yellow-100' :
                        'bg-blue-100'
                  ]">
                    {{ announcement.icon }}
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-800">{{ announcement.title }}</h3>
                    <p class="text-sm text-gray-500">{{ announcement.date }} | {{ announcement.period }}</p>
                  </div>
                </div>
                <span :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
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
            </div>
          </div>
          <div class="text-center mt-6">
            <router-link to="/thong-bao"
              class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
              Xem tất cả thông báo
            </router-link>
          </div>
        </section>
    <!-- Latest Activities -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-blue-400  dark:text-gray-200">
          📸 Hoạt động mới nhất
          <p class="text-md text-gray-600 mb-8 text-xs">
            Những khoảnh khắc đáng nhớ từ các hoạt động gần đây của lớp chúng ta
          </p>
        </h1>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="activity in latestActivities" :key="activity.id"
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <img :src="activity.image" :alt="activity.title" class="w-full h-48 object-cover" />
            <div class="p-6">
              <span class="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full mb-3">
                {{ activity.category }}
              </span>
              <h3 class="text-xl font-semibold mb-2 text-gray-800">{{ activity.title }}</h3>
              <p class="text-gray-600 mb-4">{{ activity.description }}</p>
              <p class="text-sm text-gray-500">📅 {{ activity.date }}</p>
            </div>
          </div>
        </div>
        <div class="text-center mt-12">
          <router-link to="/hoat-dong"
            class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
            Xem tất cả hoạt động
          </router-link>
        </div>
      </div>
    </section>

    <!-- Sharing Corner Preview -->
    <section class="py-16">
      <div class="container mx-auto px-4">
          <h1
            class="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-blue-400  dark:text-gray-200">
            💭 Góc chia sẻ cảm xúc
            <p class="text-md text-gray-600 mb-8 text-xs">
              Những suy nghĩ và cảm xúc chân thành từ các em
            </p>
          </h1>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="share in recentShares" :key="share.id"
            class="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300">
            <div class="flex items-start space-x-3 mb-4">
              <div
                class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                {{ share.anonymous ? '?' : share.initial }}
              </div>
              <div>
                <p class="font-semibold text-gray-800">{{ share.name }}</p>
                <p class="text-xs text-gray-500">{{ share.date }}</p>
              </div>
            </div>
            <p class="text-gray-700 italic">"{{ share.content }}"</p>
          </div>
        </div>

        <div class="text-center mt-12">
          <router-link to="/chia-se"
            class="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
            Chia sẻ cảm xúc của bạn
          </router-link>
        </div>
      </div>
    </section>
      </div>
    </div>
    <!-- Quick Links -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
          🔗 Truy cập nhanh
        </h2>
        <div class="grid md:grid-cols-4 gap-6">
          <router-link v-for="link in quickLinks" :key="link.path" :to="link.path"
            class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center group">
            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {{ link.icon }}
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ link.title }}</h3>
            <p class="text-sm text-gray-600">{{ link.description }}</p>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import heroImagesData from '../data/heroImages.json'
import announcementsData from '../data/announcements.json'

const currentSlide = ref(0)
let slideInterval

const heroImages = heroImagesData

const latestActivities = [
  {
    id: 1,
    title: 'Tham quan bảo tàng',
    description: 'Chuyến đi thú vị đến bảo tàng lịch sử, các em học hỏi được nhiều điều bổ ích.',
    image: '/Activities/bao_tang_quang_trung_du_lich_thu_duc_6.png',
    category: 'Trải nghiệm',
    date: '15/01/2026'
  },
  {
    id: 2,
    title: 'Ngày hội văn nghệ',
    description: 'Các em thể hiện tài năng ca hát, múa hát và kể chuyện.',
    image: '/Activities/vannghe.png',
    category: 'Văn nghệ',
    date: '10/01/2026',
  },
  {
    id: 3,
    title: 'Giải bóng đá mini liên lớp',
    description: 'Đội bóng lớp 6A1 vô địch giải bóng đá mini cấp trường.',
    image: '/Activities/soccer.jpg',
    category: 'Thể thao',
    date: '08/01/2026',
  }
]

const recentShares = [
  {
    id: 1,
    name: 'Học sinh ẩn danh',
    initial: '?',
    anonymous: true,
    content: 'Em rất vui khi được học trong lớp này. Thầy cô rất tốt và bạn bè thân thiện.',
    date: 'hơn 1 năm trước'
  },
  {
    id: 2,
    name: 'Minh An',
    initial: 'M',
    anonymous: false,
    content: 'Khoảnh khắc hạnh phúc của em là khi được cùng bạn bè làm dự án nhóm.',
    date: 'hơn 1 năm trước'
  },
  {
    id: 3,
    name: 'Học sinh ẩn danh',
    initial: '?',
    anonymous: true,
    content: 'Em muốn nói lời cảm ơn đến cô giáo đã luôn quan tâm và động viên em.',
    date: 'hơn 1 năm trước'
  }
]

const quickLinks = [
  {
    path: '/gioi-thieu',
    icon: '📖',
    title: 'Giới thiệu lớp',
    description: 'Tìm hiểu về lớp chúng mình'
  },
  {
    path: '/phu-huynh',
    icon: '👨‍👩‍👧',
    title: 'Kết nối phụ huynh',
    description: 'Thông tin dành cho phụ huynh'
  },
  {
    path: '/truyen-thong',
    icon: '📹',
    title: 'CLB Truyền thông',
    description: 'Sản phẩm của học sinh'
  },
  {
    path: '/danh-gia',
    icon: '📊',
    title: 'Đánh giá',
    description: 'Góp ý và khảo sát'
  }
]

const getPriorityText = (priority) => {
  const map = {
    high: 'Quan trọng',
    medium: 'Trung bình',
    normal: 'Thông thường'
  }
  return map[priority] || 'Thông thường'
}

const announcements = ref(announcementsData.slice(0, 3))

onMounted(() => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % heroImages.length
  }, 5000)
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-fade-in-delay {
  animation: fade-in 0.8s ease-out 0.2s both;
}

.animate-fade-in-delay-2 {
  animation: fade-in 0.8s ease-out 0.4s both;
}
</style>
