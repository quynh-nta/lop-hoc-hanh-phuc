<template>
  <FormModal
    v-model="isOpen"
    title="Tạo hoạt động mới"
    max-width="max-w-4xl"
  >
    <form @submit.prevent="handleSubmit" class="space-y-2">
      <!-- Tiêu đề -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Tiêu đề <span class="text-red-500">*</span>
        </label>
        <input
          v-model="formData.title"
          type="text"
          required
          placeholder="Nhập tiêu đề hoạt động..."
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      <!-- Mô tả ngắn -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Mô tả ngắn <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="formData.description"
          required
          rows="2"
          placeholder="Nhập mô tả ngắn về hoạt động..."
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        ></textarea>
      </div>

      <!-- Mô tả đầy đủ -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Mô tả đầy đủ <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="formData.fullDescription"
          required
          rows="6"
          placeholder="Nhập mô tả chi tiết về hoạt động..."
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        ></textarea>
      </div>

      <!-- Hình ảnh chính -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Đường dẫn hình ảnh chính <span class="text-red-500">*</span>
        </label>
        <input
          v-model="formData.image"
          type="text"
          required
          placeholder="VD: /Activities/image.jpg"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <p class="mt-1 text-sm text-gray-500">
          Nhập đường dẫn hình ảnh hoặc URL
        </p>
      </div>

      <!-- Danh mục và Ngày -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Danh mục <span class="text-red-500">*</span>
          </label>
          <select
            v-model="formData.categoryId"
            required
            @change="updateCategory"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Chọn danh mục</option>
            <option value="experience">Trải nghiệm</option>
            <option value="art">Văn nghệ</option>
            <option value="sport">Thể thao</option>
            <option value="study">Học tập</option>
            <option value="volunteer">Tình nguyện</option>
            <option value="other">Khác</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Ngày <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.date"
            type="date"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <!-- Gallery (tùy chọn) -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Gallery (tùy chọn)
        </label>
        <div class="space-y-2">
          <div
            v-for="(img, index) in formData.gallery"
            :key="index"
            class="flex gap-2"
          >
            <input
              v-model="formData.gallery[index]"
              type="text"
              placeholder="Đường dẫn hình ảnh"
              class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              @click="removeGalleryImage(index)"
              class="px-4 py-3 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              Xóa
            </button>
          </div>
          <button
            type="button"
            @click="addGalleryImage"
            class="w-full px-4 py-3 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors font-medium"
          >
            + Thêm hình ảnh
          </button>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          @click="close"
          class="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Hủy
        </button>
        <button
          type="submit"
          class="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Tạo hoạt động
        </button>
      </div>
    </form>
  </FormModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import FormModal from '../FormModal.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const categoryMap = {
  experience: 'Trải nghiệm',
  art: 'Văn nghệ',
  sport: 'Thể thao',
  study: 'Học tập',
  volunteer: 'Tình nguyện',
  other: 'Khác'
}

const formData = ref({
  title: '',
  description: '',
  fullDescription: '',
  image: '',
  category: '',
  categoryId: '',
  date: '',
  views: 0,
  gallery: []
})

const close = () => {
  isOpen.value = false
}

const updateCategory = () => {
  formData.value.category = categoryMap[formData.value.categoryId] || ''
}

const addGalleryImage = () => {
  formData.value.gallery.push('')
}

const removeGalleryImage = (index) => {
  formData.value.gallery.splice(index, 1)
}

const handleSubmit = () => {
  // Lọc bỏ các đường dẫn rỗng trong gallery
  const cleanGallery = formData.value.gallery.filter(img => img.trim() !== '')
  
  // Tạo object hoạt động mới
  const newActivity = {
    id: Date.now(),
    ...formData.value,
    gallery: cleanGallery.length > 0 ? cleanGallery : undefined,
    views: 0
  }

  // Xóa gallery nếu rỗng
  if (!newActivity.gallery) {
    delete newActivity.gallery
  }

  emit('submit', newActivity)
  
  // Reset form
  resetForm()
  
  close()
}

const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    fullDescription: '',
    image: '',
    category: '',
    categoryId: '',
    date: '',
    views: 0,
    gallery: []
  }
}

// Reset form khi modal đóng
watch(isOpen, (newValue) => {
  if (!newValue) {
    resetForm()
  }
})
</script>
