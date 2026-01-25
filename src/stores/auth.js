import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import usersData from '../data/users.json'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref(null)
  const isAuthenticated = computed(() => currentUser.value !== null)

  // Load user from localStorage on init
  const storedUser = localStorage.getItem('currentUser')
  if (storedUser) {
    try {
      currentUser.value = JSON.parse(storedUser)
    } catch (e) {
      console.error('Failed to parse stored user:', e)
    }
  }

  const login = (username, password) => {
    const user = usersData.find(
      u => u.username === username && u.password === password
    )

    if (user) {
      // Don't store password in currentUser
      const { password: _, ...userWithoutPassword } = user
      currentUser.value = userWithoutPassword
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
      return { success: true, user: userWithoutPassword }
    }

    return { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng' }
  }

  const logout = () => {
    currentUser.value = null
    localStorage.removeItem('currentUser')
  }

  const isAdmin = computed(() => currentUser.value?.role === 'admin')
  const isStudent = computed(() => currentUser.value?.role === 'student')
  const isParent = computed(() => currentUser.value?.role === 'parent')

  return {
    currentUser,
    isAuthenticated,
    isAdmin,
    isStudent,
    isParent,
    login,
    logout
  }
})
