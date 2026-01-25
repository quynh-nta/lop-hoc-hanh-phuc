<template>
  <div 
    v-if="modelValue"
    @click="close"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
  >
    <div 
      @click.stop
      :class="[
        'bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2x',
        maxWidth
      ]"
    >
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
