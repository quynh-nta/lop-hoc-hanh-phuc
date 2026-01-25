<template>
  <div class="activities-page py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          📢 Thông báo
        </h1>
        <p class="text-s text-gray-600">Cập nhật những thông tin mới nhất từ lớp học và nhà trường</p>
      </div>

      <!-- Filter Tabs -->
      <div class="mb-4 flex flex-wrap justify-center gap-3">
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
          v-for="announcement in filteredAnnouncements" 
          :key="announcement.id"
          class="flex flex-col p-4 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
                      <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <div :class="[
                    'min-w-fit p-1 rounded-full flex items-center justify-center text-2xl',
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
                  'min-w-fit px-3 py-1 rounded-full text-xs font-semibold',
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
          <div class="mt-auto flex items-center justify-between text-sm text-gray-500 pt-4">
            <button @click="handleLike(announcement)" class="flex items-center space-x-1 hover:text-pink-600 transition-colors">
              <span>❤️</span>
              <span>{{ announcement.likes }}</span>
            </button>
            <button @click="openComments(announcement)" class="flex items-center space-x-1 hover:text-blue-600 transition-colors">
              <span>💬</span>
              <span>{{ announcement.comments }} bình luận</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredAnnouncements.length === 0" class="text-center py-16">
        <div class="text-6xl mb-4">📭</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">Chưa có thông báo nào</h3>
        <p class="text-gray-600">Hãy quay lại sau để xem các thông báo mới!</p>
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

    <!-- Comment Modal -->
    <div
      v-if="commentModalOpen"
      @click="commentModalOpen = false"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div
        @click.stop
        class="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl"
      >
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <h3 class="text-xl font-bold">💬 Bình luận</h3>
          <button
            @click="commentModalOpen = false"
            class="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        <!-- Comments List -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4">
          <div
            v-for="comment in currentComments"
            :key="comment.id"
            class="flex space-x-3 p-4 bg-gray-50 rounded-lg"
          >
            <div class="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
              {{ comment.author.charAt(0) }}
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between mb-1">
                <h4 class="font-bold text-gray-800">{{ comment.author }}</h4>
                <span class="text-xs text-gray-500">{{ comment.time }}</span>
              </div>
              <p class="text-gray-700">{{ comment.text }}</p>
            </div>
          </div>
          <div v-if="currentComments.length === 0" class="text-center py-8 text-gray-500">
            <div class="text-4xl mb-2">💬</div>
            <p>Chưa có bình luận nào. Hãy là người đầu tiên!</p>
          </div>
        </div>

        <!-- Add Comment Input -->
        <div class="p-4 border-t">
          <div class="flex space-x-3">
            <input
              v-model="newComment"
              @keypress.enter="addComment"
              type="text"
              placeholder="Viết bình luận..."
              class="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              @click="addComment"
              :disabled="!newComment.trim()"
              :class="[
                'px-6 py-3 rounded-full font-semibold transition-all duration-300',
                newComment.trim()
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              Gửi
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

const selectedCategory = ref('all')
const selectedMonth = ref('all')
const selectedActivity = ref(null)
const showChatBox = ref(false)
const commentModalOpen = ref(false)
const currentAnnouncementId = ref(null)
const newComment = ref('')
const commentsData = ref({})

const categories = [
  { id: 'all', name: 'Tất cả', icon: '📚' },
  { id: 'high', name: 'Quan trọng', icon: '🚨' },
  { id: 'medium', name: 'Trung bình', icon: '⚠️' },
  { id: 'normal', name: 'Thông thường', icon: 'ℹ️' }
]

const months = [
  'Tháng 1/2025', 'Tháng 2/2025', 'Tháng 3/2025', 'Tháng 4/2025',
  'Tháng 5/2025', 'Tháng 6/2025', 'Tháng 7/2025', 'Tháng 8/2025',
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
    date: '15/01/2025',
    month: 'Tháng 1/2025',
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
    date: '12/01/2025',
    month: 'Tháng 1/2025',
    views: 189,
    gallery: []
  },
  {
    id: 3,
    title: 'Ngày hội văn nghệ "Tài năng nhí"',
    description: 'Các em thể hiện tài năng ca hát, múa, kể chuyện trong ngày hội văn nghệ.',
    fullDescription: `Ngày hội văn nghệ "Tài năng nhí" đã diễn ra thành công tốt đẹp với sự tham gia nhiệt tình của toàn thể học sinh lớp 6A.

Các tiết mục đa dạng từ ca hát, múa, kịch, kể chuyện đều thể hiện sự sáng tạo và tự tin của các em. Đặc biệt, tiết mục múa "Bông hoa đẹp nhất" của nhóm bạn nữ đã để lại ấn tượng sâu sắc cho khán giả.

Ngày hội không chỉ là dịp để các em thể hiện tài năng mà còn giúp các em rèn luyện kỹ năng biểu diễn, tự tin trước đám đông.`,
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop',
    category: 'Văn nghệ',
    categoryId: 'art',
    date: '10/01/2025',
    month: 'Tháng 1/2025',
    views: 312
  },
  {
    id: 4,
    title: 'Giải bóng đá mini liên lớp',
    description: 'Đội bóng lớp 6A vô địch giải bóng đá mini cấp trường.',
    fullDescription: `Sau những trận đấu căng thẳng và kịch tính, đội bóng lớp 6A đã xuất sắc giành chức vô địch giải bóng đá mini cấp trường.

Với tinh thần đoàn kết, chiến thuật thông minh và kỹ năng chơi bóng tốt, các cầu thủ đã mang về vinh quang cho lớp. Trận chung kết với tỷ số 3-2 đã để lại những khoảnh khắc đáng nhớ.

Cả lớp đều tự hào về đội bóng của mình. Đây là minh chứng cho tinh thần thể thao và sự nỗ lực không ngừng của các em.`,
    image: 'https://images.unsplash.com/photo-1516567727245-ad8d273f8a67?w=800&h=600&fit=crop',
    category: 'Thể thao',
    categoryId: 'sports',
    date: '08/01/2025',
    month: 'Tháng 1/2025',
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
    date: '05/01/2025',
    month: 'Tháng 1/2025',
    views: 156
  },
  {
    id: 6,
    title: 'Dự án làm vườn xanh',
    description: 'Các em tự tay trồng và chăm sóc vườn rau sạch của lớp.',
    fullDescription: `Dự án "Vườn xanh lớp 6A" đã chính thức khởi động. Mỗi em đều được phân công chăm sóc một luống rau riêng.

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
const getPriorityText = (priority) => {
  const map = {
    high: 'Quan trọng',
    medium: 'Trung bình',
    normal: 'Thông thường'
  }
  return map[priority] || 'Thông thường'
}
const filteredAnnouncements = computed(() => {
  let result = announcements.value

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

const handleLike = (announcement) => {
  announcement.likes++
}

const openComments = (announcement) => {
  currentAnnouncementId.value = announcement.id
  commentModalOpen.value = true
  
  // Initialize comments for this announcement if not exists
  if (!commentsData.value[announcement.id]) {
    commentsData.value[announcement.id] = [
      {
        id: 1,
        author: 'Phụ huynh Minh',
        text: 'Cảm ơn cô đã thông báo!',
        time: '10:30'
      },
      {
        id: 2,
        author: 'Phụ huynh Hương',
        text: 'Em tôi rất thích hoạt động này.',
        time: '11:15'
      }
    ]
  }
}

const currentComments = computed(() => {
  return commentsData.value[currentAnnouncementId.value] || []
})

const addComment = () => {
  if (!newComment.value.trim()) return
  
  const announcement = announcements.value.find(a => a.id === currentAnnouncementId.value)
  if (announcement) {
    announcement.comments++
  }
  
  if (!commentsData.value[currentAnnouncementId.value]) {
    commentsData.value[currentAnnouncementId.value] = []
  }
  
  const comment = {
    id: Date.now(),
    author: 'Bạn',
    text: newComment.value,
    time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }
  
  commentsData.value[currentAnnouncementId.value].push(comment)
  newComment.value = ''
}

const announcements = ref([
  {
    id: 1,
    title: 'Lịch học tuần 3 tháng 1',
    content: `Kính gửi quý phụ huynh,

Lịch học tuần này:
- Thứ 2-6: Học bình thường theo thời khóa biểu
- Thứ 4 (22/1): Có buổi sinh hoạt ngoại khóa từ 14h-16h
- Thứ 6 (24/1): Kiểm tra Toán học kỳ I

Nhờ quý phụ huynh lưu ý và chuẩn bị cho các em.
Trân trọng!`,
    date: '20/01/2025',
    month: 'Tháng 1/2025',
    priority: 'high',
    icon: '📅',
    categoryId: 'high',
    comments: 5,
    likes: 20
  },
  {
    id: 2,
    title: 'Thông báo về chuyến tham quan',
    content: `Lớp 6A sẽ có chuyến tham quan bảo tàng vào ngày 28/1/2025.

Chi tiết:
- Thời gian: 8h00 - 16h00
- Địa điểm: Bảo tàng Quang Trung tỉnh Gia Lai
- Chi phí: 150.000đ/em (bao gồm xe, vé, bữa trưa)
- Hạn đóng tiền: 25/01/2025

Mọi thắc mắc xin liên hệ Cô Tuyền.`,
    date: '18/01/2025',
    month: 'Tháng 1/2025',
    priority: 'medium',
    categoryId: 'medium',
    icon: '🚌',
    attachments: ['Đơn đồng ý.pdf', 'Lịch trình chi tiết.pdf'],
    comments: 2,
    likes: 15
  },
  {
    id: 3,
    title: 'Kết quả học tập tháng 12',
    content: `Tổng kết học tập tháng 12/2025:
- 90% học sinh đạt kết quả tốt trở lên
- 5 em đạt học sinh xuất sắc
- Không có em nào yếu kém

Cảm ơn sự đồng hành của quý phụ huynh!`,
    date: '05/01/2025',
    month: 'Tháng 12/2025',
    priority: 'normal',
    icon: '📊',
    categoryId: 'normal',
    comments: 0,
    likes: 8
  },
  {    id: 4,
    title: 'Lịch nghỉ Tết Nguyên Đán',
    content: `Kính gửi quý phụ huynh,
    Lịch nghỉ Tết Nguyên Đán 2025:
    - Bắt đầu nghỉ: 01/02/2025
    - Đi học lại: 10/02/2025
    Chúc quý phụ huynh và các em học sinh một năm mới an khang thịnh vượng!
    Trân trọng!`,
    date: '25/01/2025',
    month: 'Tháng 1/2025',
    priority: 'high',
    categoryId: 'high',
    icon: '🎉' ,
    comments: 3,
    likes: 25
  },
  {
    id: 5,
    title: 'Mời tham gia buổi họp phụ huynh',
    content: `Kính mời quý phụ huynh tham gia buổi họp phụ huynh cuối học kỳ I:
    - Thời gian: 15h00, ngày 30/01/2025
    - Địa điểm: Phòng học lớp 6A
    Nội dung: Báo cáo kết quả học tập, thảo luận kế hoạch học kỳ II.
    Rất mong sự có mặt của quý phụ huynh!`,
    date: '22/01/2025',
    month: 'Tháng 1/2025',
    priority: 'medium',
    categoryId: 'medium',
    icon: '📢',
    comments: 4,
    likes: 18
  },
  {
    id: 6,
    title: 'Nhắc nhở đóng học phí',
    content: `Kính gửi quý phụ huynh,
    Nhắc nhở quý phụ huynh đóng học phí học kỳ II trước ngày 05/02/2025.
    Mức học phí: 2.500.000đ/học kỳ.
    Quý phụ huynh vui lòng liên hệ văn phòng nhà trường để hoàn tất thủ tục.
    Trân trọng!`,
    date: '28/01/2025',
    month: 'Tháng 1/2025',
    priority: 'normal',
    categoryId: 'normal',
    icon: '💰',
    comments: 1,
    likes: 10
  },
  {
    id: 7,
    title: 'Cập nhật chương trình học kỳ II',
    content: `Kính gửi quý phụ huynh,
    Chương trình học kỳ II sẽ có một số thay đổi như sau:
    - Thêm môn Kỹ năng sống vào thứ 5 hàng tuần.
    - Tăng cường các hoạt động ngoại khóa vào cuối tuần.
    Chi tiết chương trình sẽ được gửi trong buổi họp phụ huynh ngày 30/01/2025.
    Trân trọng!`,
    date: '26/01/2025',
    month: 'Tháng 1/2025',
    priority: 'medium',
    categoryId: 'medium',
    icon: '📝',
    comments: 2,
    likes: 12
  },
  {
    id: 8,
    title: 'Thông báo về an toàn học đường',
    content: `Kính gửi quý phụ huynh,
    Nhà trường xin thông báo về các biện pháp đảm bảo an toàn học đường:
    - Tăng cường giám sát khu vực cổng trường.
    - Tổ chức các buổi tuyên truyền về an toàn giao thông cho học sinh.
    - Yêu cầu học sinh tuân thủ nội quy nhà trường nghiêm ngặt.
    Rất mong sự phối hợp từ quý phụ huynh để đảm bảo môi trường học tập an toàn cho các em.`,
    date: '15/01/2025',
    month: 'Tháng 1/2025',
    priority: 'high',
    categoryId: 'high',
    icon: '🛡️',
    comments: 6,
    likes: 30
  },
  {
    id: 9,
    title: 'Lịch thi học kỳ I',
    content: `Kính gửi quý phụ huynh,
    Lịch thi học kỳ I năm học 2024-2025 như sau:
    - Toán: 20/01/2025
    - Tiếng Việt: 22/01/2025
    - Khoa học: 24/01/2025
    Quý phụ huynh vui lòng nhắc nhở các em ôn tập và chuẩn bị tốt cho kỳ thi.
    Trân trọng!`,
    date: '10/01/2025',
    month: 'Tháng 1/2025',
    priority: 'high',
    categoryId: 'high',
    icon: '📝',
    comments: 3,
    likes: 22
  },
  {
    id: 10,
    title: 'Chương trình ngoại khóa cuối tuần',
    content: `Kính gửi quý phụ huynh,
    Nhà trường tổ chức chương trình ngoại khóa cuối tuần với các hoạt động thú vị:
    - Thứ 7 (31/01): Dã ngoại tại công viên
    - Chủ nhật (01/02): Workshop nghệ thuật và thủ công
    Quý phụ huynh vui lòng đăng ký cho các em tham gia trước ngày 28/01/2025.
    Trân trọng!`,
    date: '12/01/2025',
    month: 'Tháng 1/2025',
    priority: 'normal',
    categoryId: 'normal',
    icon: '🎨',
    comments: 0,
    likes: 14
  }
])
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
