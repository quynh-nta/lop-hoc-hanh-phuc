<template>
  <div class="relative inline-block" ref="tooltipContainer">
    <!-- Trigger Element -->
    <div @click="toggleTooltip" class="cursor-pointer" ref="triggerElement">
      <slot name="trigger"></slot>
    </div>

    <!-- Tooltip Content - Teleport to body -->
    <Teleport to="body">
      <Transition name="tooltip-fade">
        <div
          v-if="isOpen"
          ref="tooltipElement"
          :style="tooltipStyle"
          class="fixed z-[9999] bg-white rounded-lg shadow-xl border border-gray-200 min-w-[200px] max-w-[300px]"
        >
          <!-- Header with Close Button -->
          <div class="flex items-center justify-between p-3 border-b border-gray-200">
            <h4 class="text-sm font-semibold text-gray-800">{{ title }}</h4>
            <button
              @click.stop="closeTooltip"
              class="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="p-3 max-h-[300px] overflow-y-auto">
            <slot name="content"></slot>
          </div>

          <!-- Arrow -->
          <!-- <div
            :style="arrowStyle"
            class="absolute w-3 h-3 bg-white border transform rotate-45"
          ></div> -->
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Thông tin'
  },
  position: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value)
  }
})

const isOpen = ref(false)
const tooltipContainer = ref(null)
const triggerElement = ref(null)
const tooltipElement = ref(null)
const tooltipPosition = ref({ top: 0, left: 0 })
const arrowPosition = ref({ top: 0, left: 0 })

const toggleTooltip = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      updatePosition()
    })
  }
}

const closeTooltip = () => {
  isOpen.value = false
}

const updatePosition = () => {
  if (!triggerElement.value || !tooltipElement.value) return

  const triggerRect = triggerElement.value.getBoundingClientRect()
  const tooltipRect = tooltipElement.value.getBoundingClientRect()
  const spacing = 12 // Khoảng cách giữa trigger và tooltip

  let top = 0
  let left = 0
  let arrowTop = 0
  let arrowLeft = 0

  switch (props.position) {
    case 'top':
      top = triggerRect.top - tooltipRect.height - spacing
      left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2)
      arrowTop = tooltipRect.height - 1.5
      arrowLeft = (tooltipRect.width / 2) - 6
      break
    case 'bottom':
      top = triggerRect.bottom + spacing
      left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2)
      arrowTop = -7.5
      arrowLeft = (tooltipRect.width / 2) - 6
      break
    case 'left':
      top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2)
      left = triggerRect.left - tooltipRect.width - spacing
      arrowTop = (tooltipRect.height / 2) - 6
      arrowLeft = tooltipRect.width - 1.5
      break
    case 'right':
      top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2)
      left = triggerRect.right + spacing
      arrowTop = (tooltipRect.height / 2) - 6
      arrowLeft = -7.5
      break
  }

  // Đảm bảo tooltip không bị tràn ra ngoài viewport
  const padding = 10
  if (left < padding) left = padding
  if (left + tooltipRect.width > window.innerWidth - padding) {
    left = window.innerWidth - tooltipRect.width - padding
  }
  if (top < padding) top = padding
  if (top + tooltipRect.height > window.innerHeight - padding) {
    top = window.innerHeight - tooltipRect.height - padding
  }

  tooltipPosition.value = { top, left }
  arrowPosition.value = { top: arrowTop, left: arrowLeft }
}

const tooltipStyle = computed(() => ({
  top: `${tooltipPosition.value.top}px`,
  left: `${tooltipPosition.value.left}px`
}))

const arrowStyle = computed(() => {
  const baseStyle = {
    top: `${arrowPosition.value.top}px`,
    left: `${arrowPosition.value.left}px`
  }

  const borderStyles = {
    top: { borderTop: '1px solid #e5e7eb', borderLeft: '1px solid #e5e7eb' },
    bottom: { borderBottom: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb' },
    left: { borderTop: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb' },
    right: { borderBottom: '1px solid #e5e7eb', borderLeft: '1px solid #e5e7eb' }
  }

  return { ...baseStyle, ...borderStyles[props.position] }
})

// Close tooltip when clicking outside
const handleClickOutside = (event) => {
  if (tooltipContainer.value && !tooltipContainer.value.contains(event.target) &&
      tooltipElement.value && !tooltipElement.value.contains(event.target)) {
    closeTooltip()
  }
}

// Update position on scroll or resize
const handlePositionUpdate = () => {
  if (isOpen.value) {
    updatePosition()
  }
}

watch(isOpen, (newVal) => {
  if (newVal) {
    nextTick(() => {
      updatePosition()
      window.addEventListener('scroll', handlePositionUpdate, true)
      window.addEventListener('resize', handlePositionUpdate)
    })
  } else {
    window.removeEventListener('scroll', handlePositionUpdate, true)
    window.removeEventListener('resize', handlePositionUpdate)
  }
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handlePositionUpdate, true)
  window.removeEventListener('resize', handlePositionUpdate)
})
</script>

<style scoped>
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>