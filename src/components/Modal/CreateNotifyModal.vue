<template>
  <FormModal
    v-model="isOpen"
    title="Tạo thông báo mới"
    max-width="max-w-3xl"
  >
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Tiêu đề -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Tiêu đề <span class="text-red-500">*</span>
        </label>
        <input
          v-model="formData.title"
          type="text"
          required
          placeholder="Nhập tiêu đề thông báo..."
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      <!-- Nội dung -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Nội dung <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="formData.content"
          required
          rows="6"
          placeholder="Nhập nội dung thông báo..."
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        ></textarea>
      </div>

      <!-- Độ ưu tiên -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Độ ưu tiên <span class="text-red-500">*</span>
        </label>
        <select
          v-model="formData.priority"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="">Chọn độ ưu tiên</option>
          <option value="high">Cao</option>
          <option value="medium">Trung bình</option>
          <option value="low">Thấp</option>
        </select>
      </div>

      <!-- Icon -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Icon
        </label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="icon in iconOptions"
            :key="icon"
            type="button"
            @click="formData.icon = icon"
            :class="[
              'w-12 h-12 flex items-center justify-center text-2xl rounded-lg border-2 transition-all',
              formData.icon === icon
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            ]"
          >
            {{ icon }}
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
          Tạo thông báo
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

const iconOptions = ['📅', '📢', '⚠️', '🎉', '📝', '🔔', '📚', '🎯', '💡', '✨']

const formData = ref({
  title: '',
  content: '',
  priority: '',
  icon: '📅'
})

const close = () => {
  isOpen.value = false
}

const handleSubmit = () => {
  // Tạo object thông báo mới
  const newNotification = {
    id: Date.now(),
    ...formData.value,
    comments: 0,
    commentsData: []
  }

  emit('submit', newNotification)
  
  // Reset form
  formData.value = {
    title: '',
    content: '',
    priority: '',
    icon: '📅'
  }
  
  close()
}

// Reset form khi modal đóng
watch(isOpen, (newValue) => {
  if (!newValue) {
    formData.value = {
      title: '',
      content: '',
      priority: '',
      icon: '📅'
    }
  }
})
</script>
