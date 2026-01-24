<template>
  <div 
    @click="$emit('close')"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
  >
    <div 
      @click.stop
      class="bg-white rounded-2xl w-full max-w-4xl h-[600px] flex flex-col shadow-2xl"
    >
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div :class="[
            'w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg',
            recipient.gender === 'male' ? 'bg-blue-400' : 'bg-pink-400'
          ]">
            {{ recipient.name.charAt(0) }}
          </div>
          <div>
            <h3 class="font-bold">{{ recipient.name }}</h3>
            <p class="text-sm opacity-90">
              <span class="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>
              Đang hoạt động
            </p>
          </div>
        </div>
        <button 
          @click="$emit('close')"
          class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
        >
          ✕
        </button>
      </div>

      <!-- Messages Area -->
      <div ref="messagesContainer" class="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        <div 
          v-for="message in messages" 
          :key="message.id"
          :class="[
            'flex',
            message.sender === 'me' ? 'justify-end' : 'justify-start'
          ]"
        >
          <div :class="[
            'max-w-[70%] rounded-2xl p-4 shadow-md',
            message.sender === 'me' 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none' 
              : 'bg-white text-gray-800 rounded-bl-none'
          ]">
            <p class="mb-1">{{ message.text }}</p>
            <p :class="[
              'text-xs',
              message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
            ]">
              {{ message.time }}
            </p>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div v-if="isTyping" class="flex justify-start">
          <div class="bg-white rounded-2xl rounded-bl-none p-4 shadow-md">
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Replies -->
      <div v-if="showQuickReplies" class="px-6 py-3 bg-gray-100 border-t">
        <p class="text-xs text-gray-600 mb-2">💬 Tin nhắn nhanh:</p>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="reply in quickReplies" 
            :key="reply"
            @click="sendQuickReply(reply)"
            class="px-4 py-2 bg-white hover:bg-blue-50 text-gray-700 rounded-full text-sm font-medium transition-colors border border-gray-300"
          >
            {{ reply }}
          </button>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-4 bg-white border-t rounded-b-2xl">
        <div class="flex items-center space-x-3">
          <button 
            @click="showQuickReplies = !showQuickReplies"
            class="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
            title="Tin nhắn nhanh"
          >
            ⚡
          </button>
          <button 
            class="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
            title="Gửi ảnh"
          >
            📷
          </button>
          <button 
            class="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
            title="Emoji"
          >
            😊
          </button>
          <input 
            v-model="newMessage"
            @keypress.enter="sendMessage"
            type="text"
            placeholder="Nhập tin nhắn..."
            class="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            @click="sendMessage"
            :disabled="!newMessage.trim()"
            :class="[
              'w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-300',
              newMessage.trim() 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-110 shadow-lg' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'

const props = defineProps({
  recipient: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const newMessage = ref('')
const isTyping = ref(false)
const showQuickReplies = ref(false)
const messagesContainer = ref(null)

const quickReplies = [
  'Xin chào! 👋',
  'Cảm ơn bạn! 😊',
  'Được rồi! 👍',
  'Hẹn gặp lại! 👋',
  'Có thể giúp không? 🤔'
]

const messages = ref([
  {
    id: 1,
    sender: 'other',
    text: `Xin chào! Tôi là phụ huynh của em Nga`,
    time: '10:30'
  },
  {
    id: 2,
    sender: 'me',
    text: 'Xin chào! Rất vui được trao đổi với quý phụ huynh.',
    time: '10:31'
  },
  {
    id: 3,
    sender: 'other',
    text: 'Em có tiến bộ trong học tập không ạ?',
    time: '10:32'
  },
  {
    id: 4,
    sender: 'me',
    text: 'Em học rất tốt! Đặc biệt là môn Toán và Tiếng Việt. Em cũng rất tích cực tham gia các hoạt động lớp.',
    time: '10:33'
  }
])

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  const message = {
    id: messages.value.length + 1,
    sender: 'me',
    text: newMessage.value,
    time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }

  messages.value.push(message)
  newMessage.value = ''
  
  scrollToBottom()
  
  // Simulate response
  simulateResponse()
}

const sendQuickReply = (reply) => {
  newMessage.value = reply
  sendMessage()
  showQuickReplies.value = false
}

const simulateResponse = () => {
  isTyping.value = true
  
  setTimeout(() => {
    isTyping.value = false
    
    const responses = [
      'Cảm ơn bạn đã chia sẻ! 😊',
      'Tôi hiểu rồi. Cảm ơn nhiều!',
      'Thông tin rất hữu ích. Xin cảm ơn!',
      'Vâng, tôi đã nhận được. Cảm ơn bạn!',
      'Tuyệt vời! Cảm ơn bạn nhé! 👍'
    ]
    
    const response = {
      id: messages.value.length + 1,
      sender: 'other',
      text: responses[Math.floor(Math.random() * responses.length)],
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }
    
    messages.value.push(response)
    scrollToBottom()
  }, 1500)
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

onMounted(() => {
  scrollToBottom()
})

watch(() => messages.value.length, () => {
  scrollToBottom()
})
</script>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-bounce {
  animation: bounce 0.6s ease-in-out infinite;
}
</style>
