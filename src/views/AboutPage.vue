<template>
  <div class="about-page py-16">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          📖 Giới thiệu lớp học
        </h1>
        <p class="text-xl text-gray-600">Câu chuyện về lớp học hạnh phúc của chúng mình</p>
      </div>

      <!-- Story Section -->
      <section class="mb-16 bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <span class="text-4xl mr-3">🌟</span>
          Câu chuyện hình thành website
        </h2>
        <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <p class="mb-4">
            Trong bối cảnh giáo dục hiện đại, việc ghi lại và chia sẻ những khoảnh khắc 
            đẹp trong hành trình học tập là vô cùng quan trọng. Website <strong>"Lớp Học Hạnh Phúc"</strong> 
            ra đời với mục đích tạo nên một không gian số an toàn, nơi mà mỗi học sinh đều có thể:
          </p>
          <ul class="list-disc list-inside space-y-2 mb-4">
            <li>Chia sẻ những suy nghĩ, cảm xúc chân thành của mình</li>
            <li>Xem lại những khoảnh khắc đáng nhớ trong các hoạt động lớp</li>
            <li>Kết nối chặt chẽ hơn với thầy cô và phụ huynh</li>
            <li>Phát triển kỹ năng truyền thông và sáng tạo nội dung</li>
          </ul>
          <p>
            Đây không chỉ là một website thông thường, mà là <strong>ngôi nhà chung</strong> của cả lớp, 
            nơi mỗi thành viên đều là chủ thể, đều được lắng nghe và trân trọng.
          </p>
        </div>
      </section>

      <!-- Class Info Grid -->
      <div class="grid md:grid-cols-2 gap-8 mb-16">
        <!-- Class Info Card -->
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span class="text-3xl mr-3">🎓</span>
            Thông tin lớp học
          </h2>
          <div class="space-y-4">
            <div class="flex items-start">
              <span class="text-2xl mr-3">📚</span>
              <div>
                <p class="font-semibold text-gray-800">Tên lớp:</p>
                <p class="text-gray-700">Lớp 6A - "Lớp Học Hạnh Phúc"</p>
              </div>
            </div>
            <div class="flex items-start">
              <span class="text-2xl mr-3">📅</span>
              <div>
                <p class="font-semibold text-gray-800">Năm học:</p>
                <p class="text-gray-700">2024 - 2025</p>
              </div>
            </div>
            <div class="flex items-start">
              <span class="text-2xl mr-3">👥</span>
              <div>
                <p class="font-semibold text-gray-800">Sĩ số:</p>
                <p class="text-gray-700">35 học sinh</p>
              </div>
            </div>
            <div class="flex items-start">
              <span class="text-2xl mr-3">🏫</span>
              <div>
                <p class="font-semibold text-gray-800">Trường:</p>
                <p class="text-gray-700">Trường THCS Hoài Hải</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Teacher Info Card -->
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span class="text-3xl mr-3">👩‍🏫</span>
            Giáo viên chủ nhiệm
          </h2>
          <div class="text-center mb-6">
            <div class="w-32 h-32 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
              CN
            </div>
            <h3 class="text-xl font-bold text-gray-800">Cô Đặng Xuân Tuyền</h3>
            <p class="text-gray-600">Giáo viên Tiểu học</p>
          </div>
          <div class="space-y-3">
            <div class="flex items-center">
              <span class="text-xl mr-2">📧</span>
              <p class="text-gray-700">tuyendang@school.edu.vn</p>
            </div>
            <div class="flex items-center">
              <span class="text-xl mr-2">📱</span>
              <p class="text-gray-700">0123 456 789</p>
            </div>
            <div class="flex items-center">
              <span class="text-xl mr-2">⏰</span>
              <p class="text-gray-700">Giờ làm việc: 7:00 - 17:00</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Core Values -->
      <section class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-8 md:p-12">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center">
          <span class="text-4xl mr-3">💎</span>
          Giá trị cốt lõi của lớp
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
            <div class="text-4xl mb-4">❤️</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Yêu thương</h3>
            <p class="text-gray-600">
              Thấu hiểu, tôn trọng và quan tâm đến nhau. Mỗi em đều đặc biệt và được trân trọng.
            </p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
            <div class="text-4xl mb-4">🤝</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Đoàn kết</h3>
            <p class="text-gray-600">
              Cùng nhau hỗ trợ, giúp đỡ trong học tập và cuộc sống. Một cho tất cả, tất cả cho một.
            </p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
            <div class="text-4xl mb-4">🎯</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Tích cực</h3>
            <p class="text-gray-600">
              Luôn nhìn vào mặt tích cực của mọi việc. Học từ sai lầm và không ngừng phát triển.
            </p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
            <div class="text-4xl mb-4">🌟</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Sáng tạo</h3>
            <p class="text-gray-600">
              Khuyến khích sự sáng tạo, tư duy độc lập và dám thể hiện bản thân.
            </p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
            <div class="text-4xl mb-4">🛡️</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">An toàn</h3>
            <p class="text-gray-600">
              Tạo môi trường an toàn cả về thể chất lẫn tinh thần cho mọi học sinh.
            </p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
            <div class="text-4xl mb-4">🎨</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Đa dạng</h3>
            <p class="text-gray-600">
              Tôn trọng sự khác biệt, khuyến khích mỗi em phát triển theo cách riêng của mình.
            </p>
          </div>
        </div>
      </section>

      <!-- Class Motto -->
      <section class="mt-16 text-center">
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12 shadow-2xl">
          <p class="text-2xl md:text-3xl font-bold mb-4">
            "Mỗi em là một ngôi sao độc đáo"
          </p>
          <p class="text-xl md:text-2xl">
            "Cùng nhau tỏa sáng, tạo nên bầu trời hạnh phúc" ✨
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// Component logic if needed
</script>
