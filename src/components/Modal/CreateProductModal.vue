<template>
     <FormModal
      :model-value="modelValue"
      title="Tạo sản phẩm mới"
      max-width="max-w-3xl"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <form @submit.prevent="handleSubmit" class="space-y-4">
                  <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Tiêu đề *</label>
            <input 
              v-model="newProduct.title"
              type="text" 
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Nhập tiêu đề sản phẩm"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Loại sản phẩm *</label>
            <select 
              v-model="newProduct.type"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">-- Chọn loại --</option>
              <option value="article">Bài viết</option>
              <option value="photo">Ảnh</option>
              <option value="video">Video</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Mô tả ngắn *</label>
            <textarea 
              v-model="newProduct.description"
              required
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Mô tả ngắn gọn về sản phẩm"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Nội dung đầy đủ *</label>
            <textarea 
              v-model="newProduct.fullContent"
              required
              rows="6"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Nội dung chi tiết của sản phẩm"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">URL ảnh thumbnail *</label>
            <input 
              v-model="newProduct.thumbnail"
              type="url"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="https://..."
            />
          </div>
            <div class="flex justify-end space-x-4 mt-6">
                <button 
                type="button" 
                @click="$emit('update:modelValue', false)"
                class="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                Hủy
                </button>
                <button 
                type="submit"
                class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                Tạo sản phẩm
                </button>
            </div>
        </form>
    </FormModal>
</template>
<script setup>
import { ref, watch } from 'vue'
import FormModal from '../FormModal.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'create-product'])

const newProduct = ref({
  title: '',
  type: '',
  description: '',
  fullContent: '',
  thumbnail: ''
})

const handleSubmit = () => {
  // Emit sản phẩm mới
  emit('create-product', { ...newProduct.value })

  // Đóng modal
  emit('update:modelValue', false)

  // Reset form
  resetForm()
}

const resetForm = () => {
  newProduct.value = {
    title: '',
    type: '',
    description: '',
    fullContent: '',
    thumbnail: ''
  }
}

watch(() => props.modelValue, (newValue) => {
  if (!newValue) {
    resetForm()
  }
})
</script>