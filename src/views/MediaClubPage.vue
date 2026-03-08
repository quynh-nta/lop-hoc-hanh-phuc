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
                  {{ authStore.currentUser ? authStore.currentUser.name.charAt(0) : 'A' }}
                </div>
                <span class="text-sm text-gray-600">{{  authStore.currentUser ? authStore.currentUser.name : product.author }}</span>
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
                      <!-- Image/Video Gallery -->
            <div v-if="selectedProduct.gallery" class="mt-8">
              <h3 class="text-xl font-bold text-gray-800 mb-4">📸 Thư viện ảnh & Video</h3>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div v-for="(item, index) in selectedProduct.gallery" :key="index" 
                  @click="openGalleryItem(item)"
                  class="relative group cursor-pointer rounded-lg overflow-hidden">
                  <img v-if="isImage(item)" :src="item"
                    class="w-full h-48 object-cover hover:opacity-75 transition-opacity" />
                  <div v-else class="relative">
                    <video :src="item" class="w-full h-48 object-cover"></video>
                    <div class="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <div class="bg-white/90 rounded-full p-3 group-hover:scale-110 transition-transform">
                        <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore();
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

const isImage = (url) => {
  if (!url) return false
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
  return imageExtensions.some(ext => url.toLowerCase().endsWith(ext))
}

const openGalleryItem = (item) => {
  galleryViewer.value = { item }
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
    title: 'Ngày hội "Vì bạn" 💙',
    description: 'Gian hàng ẩm thực đầy ý nghĩa của lớp 6A1 tại Ngày hội "Vì bạn".',
    thumbnail: '/MediaClub/viban.jpg',
    type: 'Bài viết',
    typeId: 'article',
    author: 'Xuân Duy- Yến Nhi- Câu lạc bộ truyền thông',
    date: '15/02/2025',
    featured: true,
    fullContent: `Chiều nay, sân trường chúng em trở nên nhộn nhịp hơn khi Ngày hội "Vì bạn" diễn ra với nhiều gian hàng ẩm thực hấp dẫn do các lớp chuẩn bị. Từ đầu giờ chiều, lớp chúng em đã cùng nhau sắp xếp bàn ghế, bày các món ăn và trang trí gian hàng thật đẹp để chào đón thầy cô và các bạn đến ủng hộ.

Gian hàng của lớp có nhiều món ăn quen thuộc như bánh, nước uống và các món ăn vặt. Mỗi bạn đều rất hào hứng: bạn thì bán hàng, bạn thì giới thiệu món ăn, bạn thì mời khách. Không khí lúc nào cũng rộn ràng tiếng nói cười, tạo nên một buổi chiều thật vui và đáng nhớ.

Điều ý nghĩa nhất là số tiền thu được từ gian hàng sẽ góp phần hỗ trợ các bạn có hoàn cảnh khó khăn trong trường. Vì vậy, mỗi món ăn bán ra đều mang theo sự sẻ chia và tình cảm của tập thể lớp.

Buổi chiều của Ngày hội "Vì bạn" không chỉ mang lại niềm vui mà còn giúp chúng em hiểu hơn về tinh thần đoàn kết và lòng nhân ái. Đây chắc chắn sẽ là một kỷ niệm đẹp trong những năm tháng học trò. 💙`,
    gallery: [
      '/MediaClub/viban1.jpg'
    ]
  },
  {
    id: 2,
    title: '🌷 Tri ân thầy cô nhân ngày 20/11 🌷',
    description: 'Lời chúc và lòng biết ơn chân thành gửi đến thầy cô.',
    thumbnail: '/MediaClub/trian.jpg',
    type: 'Bài viết',
    typeId: 'article',
    author: 'Quỳnh Anh- Câu lạc văn hóa đọc',
    date: '20/11/2025',
    featured: true,
    fullContent: `Nhân dịp Ngày Nhà giáo Việt Nam 20/11, chúng em muốn gửi đến thầy cô những lời chúc tốt đẹp và lòng biết ơn chân thành nhất. Thầy cô không chỉ là người dạy cho chúng em kiến thức mà còn là người luôn tận tình chỉ bảo, động viên và đồng hành cùng chúng em trong từng bước trưởng thành.

Mỗi ngày đến lớp, chúng em được nghe những bài giảng đầy tâm huyết, được thầy cô kiên nhẫn hướng dẫn khi chưa hiểu bài và luôn khích lệ khi chúng em cố gắng. Có những lúc chúng em còn mắc lỗi, nhưng thầy cô vẫn nhẹ nhàng nhắc nhở và giúp chúng em nhận ra điều đúng đắn.

Đối với chúng em, thầy cô giống như những người lái đò thầm lặng, đưa bao thế hệ học trò cập bến tri thức. Những bài học, những lời dạy của thầy cô không chỉ theo chúng em trong suốt những năm tháng học trò mà còn là hành trang quý giá cho tương lai.

Nhân ngày 20/11, chúng em kính chúc thầy cô luôn mạnh khỏe, hạnh phúc và luôn giữ mãi ngọn lửa nhiệt huyết với nghề. Chúng em sẽ cố gắng học tập thật tốt để không phụ lòng dạy dỗ của thầy cô.`
  },
  {
    id: 3,
    title: 'Ơn thầy cô',
    description: 'Bài thơ tri ân thầy cô nhân ngày 20/11.',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
    type: 'Bài viết',
    typeId: 'article',
    author: 'Hằng Ni- Câu lạc Chia sẻ kĩ năng sống',
    date: '20/11/2025',
    featured: false,
    fullContent: `Ơn thầy cô

Tháng mười một gió dịu dàng
Chúng em nhớ mãi bảng vàng phấn bay.

Lời thầy ấm áp mỗi ngày
Dẫn đường tri thức, chắp đầy ước mơ.

Bao năm bụi phấn lặng lờ
Tóc thầy điểm bạc vẫn chờ đàn em.

Cô như ánh nắng dịu êm
Dạy em bài học dịu hiền, yêu thương.

Mai sau đi khắp nẻo đường
Ơn thầy nghĩa cô vẫn vương trong lòng.`
  },
  {
    id: 4,
    title: 'Những khoảnh khắc yêu thương trong cuộc họp phụ huynh lớp 6A1',
    description: 'Album ảnh ghi lại những khoảnh khắc ấm áp của buổi họp phụ huynh.',
    thumbnail: '/MediaClub/ph.jpg',
    typeId: 'photo',
    author: 'Câu lạc bộ Truyền thông',
    date: '03/11/2025',
    featured: false,
    fullContent: 'Bộ ảnh ghi lại những khoảnh khắc ấm áp và ý nghĩa trong buổi họp phụ huynh lớp 6A1. Sự gặp gỡ giữa thầy cô và phụ huynh để cùng nhau chia sẻ về quá trình học tập, rèn luyện của các em. Những nụ cười, những ánh mắt tin yêu đều thể hiện sự quan tâm sâu sắc của gia đình và nhà trường dành cho các em.',
    gallery: [
      '/MediaClub/ph1.mp4',
      '/MediaClub/ph2.mp4',
      '/MediaClub/ph1.jpg',
      '/MediaClub/ph2.jpg',
      '/MediaClub/ph3.jpg',
      '/MediaClub/ph4.jpg',
    ]
  },
  {
    id: 5,
    title: '⚽ Trận bóng đá kịch tính giữa lớp 6A1 và 6A2',
    description: 'Trận đấu đầy cảm xúc tại sân vận động liên thôn với tỉ số 3-2.',
    thumbnail: '/MediaClub/bongda.jpg',
    type: 'Bài viết',
    typeId: 'article',
    author: 'Câu lạc bộ Truyền thông',
    date: '06/10/2024',
    featured: true,
    fullContent: `Chiều ngày 6/10 lúc 16 giờ, tại sân vận động liên thôn, một trận bóng đá đầy hấp dẫn đã diễn ra giữa lớp 6A1 và lớp 6A2. Từ rất sớm, nhiều bạn học sinh đã có mặt để cổ vũ, tạo nên bầu không khí vô cùng sôi động. Tiếng reo hò, tiếng vỗ tay và những lời động viên làm cho sân bóng trở nên náo nhiệt như một ngày hội nhỏ của tuổi học trò.

Ngay khi tiếng còi khai cuộc vang lên, hai đội nhanh chóng nhập cuộc với tinh thần thi đấu quyết tâm. Các cầu thủ của cả hai lớp liên tục tổ chức những pha tấn công đẹp mắt, khiến trận đấu trở nên vô cùng gay cấn. Không ít lần bóng tiến sát khung thành trong sự hồi hộp của các cổ động viên đứng quanh sân.

Lớp 6A1 đã có bàn mở tỉ số sớm, nhưng lớp 6A2 cũng nhanh chóng đáp trả bằng những pha tấn công mạnh mẽ. Trận đấu diễn ra rất cân bằng khi hai đội liên tục ghi bàn và bám đuổi tỉ số. Mỗi bàn thắng được ghi đều nhận được những tràng vỗ tay và tiếng cổ vũ vang dội từ các bạn học sinh.

Những phút cuối của trận đấu thực sự kịch tính khi hai đội thi đấu với tất cả sự nỗ lực và tinh thần đồng đội. Sau những pha bóng đầy cảm xúc, trận đấu khép lại với tỉ số 3–2 nghiêng về lớp 6A1. Đây là một chiến thắng đầy hồi hộp và đáng nhớ sau một trận đấu đẹp của cả hai đội.

Dù kết quả ra sao, điều đáng quý nhất chính là tinh thần thể thao, sự đoàn kết và niềm vui khi được cùng nhau tham gia hoạt động. Trận đấu đã để lại nhiều khoảnh khắc đáng nhớ và chắc chắn sẽ trở thành một kỷ niệm đẹp trong quãng thời gian học tập của các bạn học sinh.

⚽ Một trận đấu nhỏ – nhưng chứa đựng cả nhiệt huyết và tình bạn của tuổi học trò.`,
    gallery: [
      '/MediaClub/bongda1.jpg',
      '/MediaClub/bongda2.jpg',
      '/MediaClub/bongda3.jpg',
    ]
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
