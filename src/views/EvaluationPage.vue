<template>
  <div class="evaluation-page py-16">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          📊 Đánh giá & Góp ý hàng tháng
        </h1>
        <p class="text-xl text-gray-600">
          Ý kiến của bạn giúp chúng tôi cải thiện website và hoạt động lớp
        </p>
      </div>

      <!-- Survey Links -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">📝 Khảo sát tháng này</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <a 
            href="https://forms.google.com" 
            target="_blank"
            class="block bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div class="text-5xl mb-4">👨‍👩‍👧</div>
            <h3 class="text-2xl font-bold mb-3">Khảo sát Phụ huynh</h3>
            <p class="mb-4 opacity-90">Đánh giá về hoạt động lớp và sự phát triển của con em</p>
            <div class="flex items-center text-sm font-semibold">
              <span>Tham gia ngay</span>
              <span class="ml-2">→</span>
            </div>
          </a>
          
          <a 
            href="https://forms.google.com" 
            target="_blank"
            class="block bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div class="text-5xl mb-4">🎓</div>
            <h3 class="text-2xl font-bold mb-3">Khảo sát Học sinh</h3>
            <p class="mb-4 opacity-90">Chia sẻ cảm nhận về lớp học và website</p>
            <div class="flex items-center text-sm font-semibold">
              <span>Tham gia ngay</span>
              <span class="ml-2">→</span>
            </div>
          </a>
          
          <a 
            href="https://forms.google.com" 
            target="_blank"
            class="block bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div class="text-5xl mb-4">👩‍🏫</div>
            <h3 class="text-2xl font-bold mb-3">Đánh giá Giáo viên</h3>
            <p class="mb-4 opacity-90">Góp ý về phương pháp giảng dạy và quản lý lớp</p>
            <div class="flex items-center text-sm font-semibold">
              <span>Tham gia ngay</span>
              <span class="ml-2">→</span>
            </div>
          </a>
        </div>
      </section>

      <!-- Results Summary -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">📈 Tổng hợp kết quả</h2>
        
        <div class="grid md:grid-cols-2 gap-8 mb-8">
          <!-- Satisfaction Chart -->
          <div class="bg-white rounded-xl p-8 shadow-lg">
            <h3 class="text-xl font-bold text-gray-800 mb-6">Mức độ hài lòng tháng 12/2025</h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-gray-700">Rất hài lòng</span>
                  <span class="font-semibold text-green-600">75%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div class="bg-green-500 h-3 rounded-full" style="width: 75%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-gray-700">Hài lòng</span>
                  <span class="font-semibold text-blue-600">20%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div class="bg-blue-500 h-3 rounded-full" style="width: 20%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-gray-700">Trung bình</span>
                  <span class="font-semibold text-yellow-600">5%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div class="bg-yellow-500 h-3 rounded-full" style="width: 5%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Participation Stats -->
          <div class="bg-white rounded-xl p-8 shadow-lg">
            <h3 class="text-xl font-bold text-gray-800 mb-6">Thống kê tham gia</h3>
            <div class="space-y-6">
              <div class="text-center p-6 bg-blue-50 rounded-lg">
                <div class="text-4xl font-bold text-blue-600 mb-2">86%</div>
                <p class="text-gray-700">Phụ huynh tham gia khảo sát</p>
              </div>
              <div class="text-center p-6 bg-purple-50 rounded-lg">
                <div class="text-4xl font-bold text-purple-600 mb-2">92%</div>
                <p class="text-gray-700">Học sinh tham gia khảo sát</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Positive Feedback -->
        <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 shadow-lg">
          <h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <span class="text-3xl mr-3">✨</span>
            Những điểm được đánh giá cao
          </h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="flex items-start space-x-3">
              <span class="text-2xl">✅</span>
              <div>
                <h4 class="font-semibold text-gray-800">Giao diện thân thiện</h4>
                <p class="text-sm text-gray-600">Dễ sử dụng, thích hợp với cả học sinh và phụ huynh</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <span class="text-2xl">✅</span>
              <div>
                <h4 class="font-semibold text-gray-800">Nội dung phong phú</h4>
                <p class="text-sm text-gray-600">Cập nhật thường xuyên, đa dạng chủ đề</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <span class="text-2xl">✅</span>
              <div>
                <h4 class="font-semibold text-gray-800">Tương tác tích cực</h4>
                <p class="text-sm text-gray-600">Học sinh được tham gia sáng tạo nội dung</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <span class="text-2xl">✅</span>
              <div>
                <h4 class="font-semibold text-gray-800">An toàn & Bảo mật</h4>
                <p class="text-sm text-gray-600">Nội dung được kiểm duyệt kỹ lưỡng</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Improvements -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">🔧 Cải tiến dựa trên góp ý</h2>
        <div class="space-y-6">
          <div class="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
            <div class="flex items-start space-x-4">
              <div class="text-3xl">💡</div>
              <div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">Góp ý: Cần thêm chức năng tìm kiếm</h3>
                <p class="text-gray-600 mb-3">
                  Nhiều phụ huynh đề xuất thêm chức năng tìm kiếm để dễ dàng tìm lại các bài viết, hoạt động cũ.
                </p>
                <div class="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  ✅ Đã cải tiến - Sẽ ra mắt tháng 2/2026
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500">
            <div class="flex items-start space-x-4">
              <div class="text-3xl">💡</div>
              <div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">Góp ý: Tối ưu hiển thị trên mobile</h3>
                <p class="text-gray-600 mb-3">
                  Một số hình ảnh hiển thị chưa tốt trên điện thoại di động.
                </p>
                <div class="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  ✅ Đã cải tiến - Cập nhật ngày 15/01/2026
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-md border-l-4 border-orange-500">
            <div class="flex items-start space-x-4">
              <div class="text-3xl">💡</div>
              <div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">Góp ý: Thêm album ảnh theo sự kiện</h3>
                <p class="text-gray-600 mb-3">
                  Học sinh muốn có album ảnh riêng cho từng sự kiện lớn.
                </p>
                <div class="inline-block px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                  ⏳ Đang triển khai
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section>
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">💬 Phản hồi từ cộng đồng</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white rounded-xl p-6 shadow-md">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                P
              </div>
              <div>
                <h4 class="font-bold text-gray-800">Phụ huynh Nguyễn Thu Hà</h4>
                <div class="flex text-yellow-400">★★★★★</div>
              </div>
            </div>
            <p class="text-gray-700 italic">
              "Website rất hữu ích, giúp tôi theo dõi hoạt động của con mỗi ngày. 
              Giao diện đẹp và dễ sử dụng. Con tôi rất thích chia sẻ cảm xúc ở đây!"
            </p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-md">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                H
              </div>
              <div>
                <h4 class="font-bold text-gray-800">Học sinh Trần Minh An</h4>
                <div class="flex text-yellow-400">★★★★★</div>
              </div>
            </div>
            <p class="text-gray-700 italic">
              "Em rất thích website của lớp. Em có thể chia sẻ cảm xúc và xem lại 
              những khoảnh khắc vui vẻ. Cảm ơn cô và các bạn đã tạo ra website này!"
            </p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-md">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                P
              </div>
              <div>
                <h4 class="font-bold text-gray-800">Phụ huynh Lê Văn Nam</h4>
                <div class="flex text-yellow-400">★★★★★</div>
              </div>
            </div>
            <p class="text-gray-700 italic">
              "Ý tưởng tuyệt vời! Website không chỉ là nơi chia sẻ thông tin mà còn 
              giúp các em phát triển kỹ năng công nghệ và sáng tạo nội dung."
            </p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-md">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                H
              </div>
              <div>
                <h4 class="font-bold text-gray-800">Học sinh Phạm Bảo An</h4>
                <div class="flex text-yellow-400">★★★★★</div>
              </div>
            </div>
            <p class="text-gray-700 italic">
              "Em thích phần góc chia sẻ cảm xúc nhất. Em có thể viết những điều 
              em muốn nói mà không sợ ai đó cười hoặc không hiểu em."
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// Component logic if needed
</script>
