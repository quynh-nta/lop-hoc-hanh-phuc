<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">
            <span class="text-blue-600">📚</span> Chia Sẻ Khó Khăn Học Tập
          </h2>
          <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit">
          <!-- Subject Selection -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Môn học <span class="text-red-500">*</span>
            </label>
            <select 
              v-model="formData.subject" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Chọn môn học</option>
              <option value="Toán học">Toán học</option>
              <option value="Tiếng Việt">Tiếng Việt</option>
              <option value="Tiếng Anh">Tiếng Anh</option>
              <option value="Khoa học">Khoa học</option>
              <option value="Lịch sử">Lịch sử</option>
              <option value="Địa lý">Địa lý</option>
              <option value="Âm nhạc">Âm nhạc</option>
              <option value="Mỹ thuật">Mỹ thuật</option>
              <option value="Thể dục">Thể dục</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <!-- Title -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tiêu đề <span class="text-red-500">*</span>
            </label>
            <input
              v-model="formData.title"
              type="text"
              required
              placeholder="Ví dụ: Bài toán về phân số khó quá..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Content -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nội dung câu hỏi <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="formData.content"
              required
              rows="6"
              placeholder="Mô tả chi tiết câu hỏi hoặc khó khăn của bạn. Càng cụ thể thì các bạn càng dễ giúp đỡ!"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            ></textarea>
          </div>

          <!-- Image Upload (Optional) -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Hình ảnh minh họa (nếu có)
            </label>
            <input
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p class="text-xs text-gray-500 mt-1">Có thể đính kèm ảnh bài tập, sơ đồ, hình vẽ...</p>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="$emit('close')"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Đăng Bài
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['close', 'submit'])

const formData = ref({
  subject: '',
  title: '',
  content: '',
  image: null
})

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // In a real app, you would upload this to a server
    // For now, we'll just store the file name
    formData.value.image = file.name
  }
}

const handleSubmit = () => {
  const newPost = {
    id: Date.now(),
    studentName: "Học sinh hiện tại", // This would come from auth
    studentAvatar: "https://i.pravatar.cc/150?img=68",
    subject: formData.value.subject,
    title: formData.value.title,
    content: formData.value.content,
    image: formData.value.image,
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: [],
    solved: false
  }

  emit('submit', newPost)
  
  // Reset form
  formData.value = {
    subject: '',
    title: '',
    content: '',
    image: null
  }
}
</script>
