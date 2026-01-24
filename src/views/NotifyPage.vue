<template>
  <div class="activities-page py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          🎨 Hoạt động của lớp
        </h1>
        <p class="text-xl text-gray-600">Những khoảnh khắc đáng nhớ của chúng mình</p>
      </div>

      <!-- Filter Tabs -->
      <div class="mb-8 flex flex-wrap justify-center gap-3">
        <button 
          v-for="category in categories" 
          :key="category.id"
          @click="selectedCategory = category.id"
          :class="[
            'px-6 py-2 rounded-full font-semibold transition-all duration-300',
            selectedCategory === category.id 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'bg-white text-gray-700 hover:bg-blue-50'
          ]"
        >
          {{ category.icon }} {{ category.name }}
        </button>
      </div>

      <!-- Month Filter -->
      <div class="mb-8 flex justify-center">
        <select 
          v-model="selectedMonth"
          class="px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tất cả các tháng</option>
          <option v-for="month in months" :key="month" :value="month">
            {{ month }}
          </option>
        </select>
      </div>

      <!-- Activities Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="activity in filteredActivities" 
          :key="activity.id"
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <div class="relative">
            <img :src="activity.image" :alt="activity.title" class="w-full h-56 object-cover" />
            <div class="absolute top-4 right-4">
              <span class="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                {{ activity.category }}
              </span>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-2">{{ activity.title }}</h3>
            <p class="text-gray-600 mb-4 line-clamp-3">{{ activity.description }}</p>
            <div class="flex items-center justify-between text-sm text-gray-500">
              <span>📅 {{ activity.date }}</span>
              <span>👁️ {{ activity.views }} lượt xem</span>
            </div>
            <button 
              @click="viewActivity(activity)"
              class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors duration-300"
            >
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
    <div 
      v-if="selectedActivity"
      @click="selectedActivity = null"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div 
        @click.stop
        class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div class="relative">
          <img :src="selectedActivity.image" :alt="selectedActivity.title" class="w-full h-96 object-cover" />
          <button 
            @click="selectedActivity = null"
            class="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
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
              <img 
                v-for="(img, index) in selectedActivity.gallery" 
                :key="index"
                :src="img" 
                class="w-full h-48 object-cover rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedCategory = ref('all')
const selectedMonth = ref('all')
const selectedActivity = ref(null)

const categories = [
  { id: 'all', name: 'Tất cả', icon: '📚' },
  { id: 'learning', name: 'Học tập', icon: '✏️' },
  { id: 'experience', name: 'Trải nghiệm', icon: '🌍' },
  { id: 'art', name: 'Văn nghệ', icon: '🎭' },
  { id: 'sports', name: 'Thể thao', icon: '⚽' },
  { id: 'life-skills', name: 'Kỹ năng sống', icon: '🛠️' }
]

const months = [
  'Tháng 1/2026', 'Tháng 2/2026', 'Tháng 3/2026', 'Tháng 4/2026',
  'Tháng 5/2026', 'Tháng 6/2026', 'Tháng 7/2026', 'Tháng 8/2026',
  'Tháng 9/2025', 'Tháng 10/2025', 'Tháng 11/2025', 'Tháng 12/2025'
]

const activities = ref([
  {
    id: 1,
    title: 'Tham quan bảo tàng lịch sử',
    description: 'Chuyến đi thú vị đến bảo tàng, các em được tìm hiểu về lịch sử dân tộc.',
    fullDescription: `Hôm nay, cả lớp chúng mình đã có một chuyến tham quan vô cùng ý nghĩa tại Bảo tàng Lịch sử Việt Nam. 

Các em được nghe cô hướng dẫn viên kể những câu chuyện về lịch sử dân tộc, xem các hiện vật quý giá từ các thời kỳ khác nhau. Đặc biệt, các em rất thích thú khi được tham gia các hoạt động trải nghiệm như mặc trang phục truyền thống, chơi các trò chơi dân gian.

Qua chuyến đi, các em không chỉ học được kiến thức lịch sử mà còn hiểu hơn về truyền thống văn hóa của dân tộc, từ đó có thêm tình yêu quê hương đất nước.`,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop',
    category: 'Trải nghiệm',
    categoryId: 'experience',
    date: '15/01/2026',
    month: 'Tháng 1/2026',
    views: 234,
    gallery: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop&sat=-100',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop&hue=180'
    ]
  },
  {
    id: 2,
    title: 'Giờ học STEM sáng tạo',
    description: 'Các em thực hành làm robot mini và học về khoa học công nghệ.',
    fullDescription: `Tiết học STEM hôm nay thật thú vị! Các em được chia thành các nhóm nhỏ để cùng nhau lắp ráp robot mini.

Ban đầu, các em gặp nhiều khó khăn, nhưng với sự hướng dẫn tận tình của thầy cô và tinh thần làm việc nhóm, cuối cùng mỗi nhóm đều hoàn thành sản phẩm của mình.

Qua bài học này, các em không chỉ học được kiến thức về khoa học kỹ thuật mà còn rèn luyện được kỹ năng làm việc nhóm, giải quyết vấn đề và tư duy logic.`,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop',
    category: 'Học tập',
    categoryId: 'learning',
    date: '12/01/2026',
    month: 'Tháng 1/2026',
    views: 189,
    gallery: []
  },
  {
    id: 3,
    title: 'Ngày hội văn nghệ "Tài năng nhí"',
    description: 'Các em thể hiện tài năng ca hát, múa, kể chuyện trong ngày hội văn nghệ.',
    fullDescription: `Ngày hội văn nghệ "Tài năng nhí" đã diễn ra thành công tốt đẹp với sự tham gia nhiệt tình của toàn thể học sinh lớp 5A.

Các tiết mục đa dạng từ ca hát, múa, kịch, kể chuyện đều thể hiện sự sáng tạo và tự tin của các em. Đặc biệt, tiết mục múa "Bông hoa đẹp nhất" của nhóm bạn nữ đã để lại ấn tượng sâu sắc cho khán giả.

Ngày hội không chỉ là dịp để các em thể hiện tài năng mà còn giúp các em rèn luyện kỹ năng biểu diễn, tự tin trước đám đông.`,
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop',
    category: 'Văn nghệ',
    categoryId: 'art',
    date: '10/01/2026',
    month: 'Tháng 1/2026',
    views: 312
  },
  {
    id: 4,
    title: 'Giải bóng đá mini liên lớp',
    description: 'Đội bóng lớp 5A vô địch giải bóng đá mini cấp trường.',
    fullDescription: `Sau những trận đấu căng thẳng và kịch tính, đội bóng lớp 5A đã xuất sắc giành chức vô địch giải bóng đá mini cấp trường.

Với tinh thần đoàn kết, chiến thuật thông minh và kỹ năng chơi bóng tốt, các cầu thủ đã mang về vinh quang cho lớp. Trận chung kết với tỷ số 3-2 đã để lại những khoảnh khắc đáng nhớ.

Cả lớp đều tự hào về đội bóng của mình. Đây là minh chứng cho tinh thần thể thao và sự nỗ lực không ngừng của các em.`,
    image: 'https://images.unsplash.com/photo-1516567727245-ad8d273f8a67?w=800&h=600&fit=crop',
    category: 'Thể thao',
    categoryId: 'sports',
    date: '08/01/2026',
    month: 'Tháng 1/2026',
    views: 278
  },
  {
    id: 5,
    title: 'Kỹ năng giao tiếp và làm việc nhóm',
    description: 'Buổi workshop về kỹ năng mềm cho học sinh.',
    fullDescription: `Buổi học kỹ năng mềm hôm nay tập trung vào giao tiếp và làm việc nhóm - hai kỹ năng quan trọng trong cuộc sống.

Qua các trò chơi tương tác và bài tập nhóm, các em đã học được cách lắng nghe, chia sẻ ý kiến và làm việc hiệu quả với người khác. Các em cũng hiểu được tầm quan trọng của việc tôn trọng ý kiến đóng góp của bạn bè.

Những kỹ năng này sẽ rất hữu ích không chỉ trong học tập mà còn trong cuộc sống hàng ngày.`,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    category: 'Kỹ năng sống',
    categoryId: 'life-skills',
    date: '05/01/2026',
    month: 'Tháng 1/2026',
    views: 156
  },
  {
    id: 6,
    title: 'Dự án làm vườn xanh',
    description: 'Các em tự tay trồng và chăm sóc vườn rau sạch của lớp.',
    fullDescription: `Dự án "Vườn xanh lớp 5A" đã chính thức khởi động. Mỗi em đều được phân công chăm sóc một luống rau riêng.

Các em học cách xới đất, gieo hạt, tưới nước và chăm sóc cây trồng hàng ngày. Qua dự án này, các em không chỉ học được kiến thức về nông nghiệp mà còn hiểu được giá trị của lao động và thực phẩm sạch.

Trong tháng tới, chúng mình sẽ thu hoạch những rau sạch đầu tiên do chính tay mình trồng!`,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
    category: 'Trải nghiệm',
    categoryId: 'experience',
    date: '20/12/2025',
    month: 'Tháng 12/2025',
    views: 201
  }
])

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
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
