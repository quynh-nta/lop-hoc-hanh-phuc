<template>
  <footer class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Thông tin lớp -->
        <div>
          <h3 class="text-2xl font-bold mb-4">🎓 Lớp Học Hạnh Phúc</h3>
          <p class="text-blue-100 mb-2">Năm học 2025-2026</p>
          <p class="text-blue-100">Nơi chia sẻ khoảnh khắc đẹp và lan tỏa hạnh phúc</p>
        </div>

        <!-- Liên kết nhanh -->
        <div>
          <h4 class="text-xl font-semibold mb-4">Liên kết</h4>
          <ul class="space-y-2">
            <li><router-link to="/gioi-thieu" class="text-blue-100 hover:text-white transition-colors">Giới thiệu</router-link></li>
            <li><router-link to="/hoat-dong" class="text-blue-100 hover:text-white transition-colors">Hoạt động</router-link></li>
            <li><router-link to="/chia-se" class="text-blue-100 hover:text-white transition-colors">Góc chia sẻ</router-link></li>
            <li><router-link to="/an-toan-so" class="text-blue-100 hover:text-white transition-colors">An toàn số</router-link></li>
          </ul>
        </div>

        <!-- Liên hệ -->
        <div>
          <router-link to="/lien-he" class="nav-link">Liên hệ</router-link>
          <p class="text-blue-100 mb-2">📧 Email: lophochangphuc@school.edu.vn</p>
          <p class="text-blue-100 mb-2">📱 Hotline: 0123 456 789</p>
          <p class="text-blue-100">🏫 Trường Tiểu học ABC</p>
        </div>
      </div>

      <div class="border-t border-blue-400 mt-8 pt-6 text-center">
        <p class="text-blue-100">
          © {{ currentYear }} Lớp Học Hạnh Phúc. 
          <span class="mx-2">|</span>
          <router-link to="/admin" class="hover:text-white transition-colors">Quản trị</router-link>
        </p>
        <p class="text-blue-100 text-sm mt-2">
          💙 Được xây dựng với tình yêu thương dành cho các em học sinh
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
