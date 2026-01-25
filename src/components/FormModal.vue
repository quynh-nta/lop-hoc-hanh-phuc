<template>
  <div 
    v-if="modelValue"
    @click="close"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
  >
    <div 
      @click.stop
      :class="[
        'bg-white rounded-2xl w-full p-8 my-8',
        maxWidth
      ]"
    >
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-800">{{ title }}</h2>
        <button 
          @click="close"
          class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          ✕
        </button>
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  maxWidth: {
    type: String,
    default: 'max-w-2xl'
  }
})

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}

// Quản lý overflow của html khi modal mở/đóng
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    // Lưu giá trị overflow hiện tại
    document.documentElement.dataset.previousOverflow = document.documentElement.style.overflowY
    // Ẩn scroll
    document.documentElement.style.overflowY = 'hidden'
  } else {
    // Khôi phục giá trị overflow ban đầu
    const previousOverflow = document.documentElement.dataset.previousOverflow
    document.documentElement.style.overflowY = previousOverflow || ''
  }
})
</script>
