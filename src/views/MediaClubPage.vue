<template>
  <div class="media-club-page py-8 bg-gray-50">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          📹 CLB Truyền thông học đường
        </h1>
        <p class="text-xl text-gray-600 mb-0">
          Sân chơi sáng tạo - Nơi các em là tác giả của câu chuyện riêng
        </p>
        <button 
          @click="showCreateModal = true"
          class="mt-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          + Tạo sản phẩm mới
        </button>
      </div>

      <!-- About Club -->
      <section class="mb-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8 md:p-12">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-6">🎬 Về CLB của chúng mình</h2>
            <p class="mb-4 leading-relaxed">
              CLB Truyền thông học đường là nơi các em được thỏa sức sáng tạo, thể hiện tài năng 
              qua các sản phẩm truyền thông: bài viết, ảnh, video.
            </p>
            <p class="mb-4 leading-relaxed">
              Ở đây, các em không chỉ là người tiếp nhận thông tin mà còn là người tạo ra nội dung, 
              là tác giả của những câu chuyện ý nghĩa.
            </p>
            <div class="flex flex-wrap gap-4 mt-6">
              <div class="flex items-center space-x-2">
                <span class="text-2xl">👥</span>
                <span>15 thành viên</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-2xl">🎬</span>
                <span>24 sản phẩm</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-2xl">🏆</span>
                <span>3 giải thưởng</span>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
              <div class="text-3xl mb-2">✍️</div>
              <h4 class="font-semibold">Viết bài</h4>
            </div>
            <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
              <div class="text-3xl mb-2">📸</div>
              <h4 class="font-semibold">Chụp ảnh</h4>
            </div>
            <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
              <div class="text-3xl mb-2">🎥</div>
              <h4 class="font-semibold">Làm video</h4>
            </div>
            <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
              <div class="text-3xl mb-2">🎨</div>
              <h4 class="font-semibold">Thiết kế</h4>
            </div>
          </div>
        </div>
      </section>

      <!-- Filter -->
      <div class="mb-8 flex flex-wrap justify-center gap-3">
        <button 
          v-for="category in categories" 
          :key="category.id"
          @click="selectedCategory = category.id"
          :class="[
            'px-6 py-2 rounded-full font-semibold transition-all duration-300',
            selectedCategory === category.id 
              ? 'bg-purple-600 text-white shadow-lg' 
              : 'bg-white text-gray-700 hover:bg-purple-50'
          ]"
        >
          {{ category.icon }} {{ category.name }}
        </button>
      </div>

      <!-- Products Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <div class="relative">
            <img :src="product.thumbnail" :alt="product.title" class="w-full h-56 object-cover" />
            <div class="absolute top-4 right-4">
              <span class="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                {{ product.type }}
              </span>
            </div>
            <div v-if="product.featured" class="absolute top-4 left-4">
              <span class="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                ⭐ Nổi bật
              </span>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-2">{{ product.title }}</h3>
            <p class="text-gray-600 mb-4">{{ product.description }}</p>
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {{ product.author.charAt(0) }}
                </div>
                <span class="text-sm text-gray-600">{{ product.author }}</span>
              </div>
              <span class="text-xs text-gray-500">{{ product.date }}</span>
            </div>
            <button 
              @click="viewProduct(product)"
              class="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-colors"
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <section class="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-lg text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">
          🌟 Bạn muốn tham gia CLB?
        </h2>
        <p class="text-gray-600 mb-8 max-w-2xl mx-auto">
          CLB luôn chào đón các thành viên mới có đam mê sáng tạo nội dung. 
          Hãy liên hệ với cô giáo để được hướng dẫn!
        </p>
        <router-link 
          to="/lien-he"
          class="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300"
        >
          Liên hệ ngay
        </router-link>
      </section>
    </div>

    <!-- Product Detail Modal -->
    <div 
      v-if="selectedProduct"
      @click="selectedProduct = null"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div 
        @click.stop
        class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div class="relative">
          <img :src="selectedProduct.thumbnail" :alt="selectedProduct.title" class="w-full h-96 object-cover" />
          <button 
            @click="selectedProduct = null"
            class="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100"
          >
            ✕
          </button>
        </div>
        <div class="p-8">
          <span class="inline-block px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
            {{ selectedProduct.type }}
          </span>
          <h2 class="text-3xl font-bold text-gray-800 mb-4">{{ selectedProduct.title }}</h2>
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
              {{ selectedProduct.author.charAt(0) }}
            </div>
            <div>
              <p class="font-semibold text-gray-800">{{ selectedProduct.author }}</p>
              <p class="text-sm text-gray-500">{{ selectedProduct.date }}</p>
            </div>
          </div>
          <div class="prose max-w-none">
            <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ selectedProduct.fullContent }}</p>
          </div>
        </div>
      </div>
    </div>

    <create-product-modal
      v-model="showCreateModal"
      @create-product="submitNewProduct"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CreateProductModal from '../components/Modal/CreateProductModal.vue'

const selectedCategory = ref('all')
const selectedProduct = ref(null)
const showCreateModal = ref(false)

const submitNewProduct = (newProduct) => {
  const typeMap = {
    'article': { name: 'Bài viết', id: 'article' },
    'photo': { name: 'Ảnh', id: 'photo' },
    'video': { name: 'Video', id: 'video' }
  }

  const newProductData = {
    id: products.value.length + 1,
    title: newProduct.title,
    description: newProduct.description,
    thumbnail: newProduct.thumbnail,
    type: typeMap[newProduct.type].name,
    typeId: typeMap[newProduct.type].id,
    author: newProduct.author,
    date: new Date().toLocaleDateString('vi-VN'),
    featured: newProduct.featured,
    fullContent: newProduct.fullContent
  }

  products.value.unshift(newProductData)
  
  // Reset form
  newProduct = {
    title: '',
    type: '',
    description: '',
    fullContent: '',
    thumbnail: '',
    author: '',
    featured: false
  }
  
  showCreateModal.value = false
  
  // Show success message (optional)
  alert('Tạo sản phẩm thành công!')
}

const categories = [
  { id: 'all', name: 'Tất cả', icon: '📚' },
  { id: 'article', name: 'Bài viết', icon: '✍️' },
  { id: 'photo', name: 'Ảnh', icon: '📸' },
  { id: 'video', name: 'Video', icon: '🎥' }
]

const products = ref([
  {
    id: 1,
    title: 'Một ngày của lớp 6A1',
    description: 'Video ghi lại những khoảnh khắc vui vẻ trong ngày học của lớp.',
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
    type: 'Video',
    typeId: 'video',
    author: 'Nguyễn Minh An',
    date: '20/01/2025',
    featured: true,
    fullContent: 'Video 5 phút ghi lại những khoảnh khắc vui vẻ, ý nghĩa trong một ngày học của lớp 6A1. Từ giờ chào cờ đầu tuần, các tiết học sôi nổi, đến giờ ra chơi náo nhiệt. Đây là sản phẩm của cả nhóm sau 2 tuần quay và dựng.'
  },
  {
    id: 2,
    title: 'Bài viết: Lớp học của em',
    description: 'Bài viết cảm xúc về lớp học và những người bạn thân yêu.',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop',
    type: 'Bài viết',
    typeId: 'article',
    author: 'Trần Bảo An',
    date: '18/01/2025',
    featured: false,
    fullContent: `Lớp học của em là một ngôi nhà ấm áp, nơi mà mỗi ngày đến trường đều mang lại niềm vui mới. 

Ở đây, em có những người bạn thân thiết, luôn cùng nhau học tập và vui chơi. Thầy cô luôn tận tâm, kiên nhẫn hướng dẫn chúng em. 

Em nghĩ rằng, lớp học không chỉ là nơi để học chữ, học toán, mà còn là nơi giúp em trưởng thành, học cách yêu thương và chia sẻ.`
  },
  {
    id: 3,
    title: 'Album ảnh: Chuyến tham quan',
    description: 'Bộ ảnh đẹp trong chuyến tham quan bảo tàng.',
    thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop',
    type: 'Ảnh',
    typeId: 'photo',
    author: 'Lê Quỳnh Anh',
    date: '15/01/2025',
    featured: true,
    fullContent: 'Bộ ảnh 20 tấm ghi lại chuyến tham quan bảo tàng lịch sử. Các em rất vui vẻ và hào hứng khi được tìm hiểu về lịch sử dân tộc qua các hiện vật quý giá.'
  },
  {
    id: 4,
    title: 'Video: Thử thách STEM',
    description: 'Ghi lại quá trình các em làm dự án robot.',
    thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop',
    type: 'Video',
    typeId: 'video',
    author: 'Phạm Tuấn Anh',
    date: '12/01/2025',
    featured: false,
    fullContent: 'Video 3 phút ghi lại quá trình các nhóm làm việc, từ ý tưởng ban đầu, gặp khó khăn, cho đến khi hoàn thành robot mini. Rất nhiều cảm xúc và bài học ý nghĩa!'
  },
  {
    id: 5,
    title: 'Bài viết: Người bạn thân của em',
    description: 'Chia sẻ về tình bạn đẹp trong lớp.',
    thumbnail: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop',
    type: 'Bài viết',
    typeId: 'article',
    author: 'Hoàng Mai Linh',
    date: '10/01/2025',
    featured: false,
    fullContent: `Bạn thân của em là một người rất tốt bụng và vui tính. Chúng em đã là bạn từ lớp 1 và luôn bên nhau trong mọi hoạt động.

Bạn ấy luôn động viên em khi em gặp khó khăn, chia sẻ với em niềm vui và nỗi buồn. Em rất biết ơn vì có một người bạn như vậy.

Em hy vọng chúng em sẽ mãi là bạn thân, dù sau này có đi đâu, làm gì.`
  },
  {
    id: 6,
    title: 'Poster: An toàn giao thông',
    description: 'Thiết kế poster tuyên truyền an toàn giao thông.',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
    type: 'Ảnh',
    typeId: 'photo',
    author: 'Nguyễn Đức Thắng',
    date: '08/01/2025',
    featured: false,
    fullContent: 'Poster thiết kế với thông điệp "An toàn giao thông - Hạnh phúc mỗi nhà", sử dụng màu sắc bắt mắt và hình ảnh sinh động để thu hút sự chú ý.'
  }
])

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') {
    return products.value
  }
  return products.value.filter(p => p.typeId === selectedCategory.value)
})

const viewProduct = (product) => {
  selectedProduct.value = product
}
</script>
