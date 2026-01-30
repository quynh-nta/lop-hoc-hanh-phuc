<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          ⚙️ Cài đặt hệ thống
        </h1>
        <p class="text-gray-600 text-lg">
          Quản lý năm học và tài khoản người dùng
        </p>
      </div>

      <!-- Tabs -->
      <div class="flex justify-center mb-8">
        <div class="inline-flex rounded-lg bg-white shadow-md p-1">
          <button
            @click="activeTab = 'schoolYear'"
            :class="[
              'px-6 py-3 rounded-lg font-medium transition-all duration-200',
              activeTab === 'schoolYear'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            📅 Năm học
          </button>
          <button
            @click="activeTab = 'students'"
            :class="[
              'px-6 py-3 rounded-lg font-medium transition-all duration-200',
              activeTab === 'students'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            👥 Học sinh
          </button>
          <button
            @click="activeTab = 'accounts'"
            :class="[
              'px-6 py-3 rounded-lg font-medium transition-all duration-200',
              activeTab === 'accounts'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            🔐 Tài khoản
          </button>
        </div>
      </div>

      <!-- School Year Management Tab -->
      <div v-if="activeTab === 'schoolYear'" class="space-y-6">
        <!-- Current School Year -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">📚 Năm học hiện tại</h2>
          <div class="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600 mb-1">Năm học đang hoạt động</p>
                <h3 class="text-3xl font-bold text-blue-600">{{ currentSchoolYear.name }}</h3>
                <p class="text-sm text-gray-600 mt-2">{{ currentSchoolYear.startDate }} - {{ currentSchoolYear.endDate }}</p>
              </div>
              <div class="text-5xl">📖</div>
            </div>
          </div>
        </div>

        <!-- Create New School Year -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">➕ Tạo năm học mới</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Tên năm học</label>
              <input 
                v-model="newSchoolYear.name"
                type="text"
                placeholder="2026-2027"
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Lớp</label>
              <input 
                v-model="newSchoolYear.className"
                type="text"
                placeholder="6A1"
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Ngày bắt đầu</label>
              <input 
                v-model="newSchoolYear.startDate"
                type="date"
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Ngày kết thúc</label>
              <input 
                v-model="newSchoolYear.endDate"
                type="date"
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button 
            @click="createSchoolYear"
            class="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            🚀 Tạo năm học mới
          </button>
        </div>

        <!-- School Years List -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">📋 Danh sách năm học</h2>
          <div class="space-y-3">
            <div 
              v-for="year in schoolYears" 
              :key="year.id"
              class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center space-x-4">
                <div class="text-3xl">{{ year.isActive ? '✅' : '📚' }}</div>
                <div>
                  <h3 class="font-bold text-gray-800">{{ year.name }}</h3>
                  <p class="text-sm text-gray-600">{{ year.className }} • {{ year.startDate }} - {{ year.endDate }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button 
                  v-if="!year.isActive"
                  @click="activateSchoolYear(year.id)"
                  class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                >
                  🔄 Kích hoạt
                </button>
                <span v-else class="px-4 py-2 bg-green-100 text-green-600 rounded-lg font-semibold">
                  Đang hoạt động
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Students Management Tab -->
      <div v-if="activeTab === 'students'" class="space-y-6">
        <!-- Import from Excel -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">📊 Nhập danh sách từ Excel</h2>
          
          <!-- Download Template Button -->
          <div class="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-semibold text-blue-800 mb-1">📋 File mẫu Excel</h3>
                <p class="text-sm text-blue-600">Tải xuống file mẫu để nhập dữ liệu đúng định dạng</p>
              </div>
              <button 
                @click="downloadExcelTemplate"
                class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <span>📥</span>
                <span>Tải file mẫu</span>
              </button>
            </div>
          </div>

          <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input 
              ref="fileInput"
              type="file"
              accept=".xlsx,.xls"
              @change="handleFileUpload"
              class="hidden"
            />
            <div class="text-6xl mb-4">📁</div>
            <button 
              @click="$refs.fileInput.click()"
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              📤 Chọn file Excel
            </button>
            <p class="text-sm text-gray-600 mt-4">
              Hỗ trợ file .xlsx, .xls với cấu trúc: STT, Họ tên, Giới tính, Ngày sinh, SĐT Phụ huynh, Địa chỉ, Tên bố, Tên mẹ, Email
            </p>
          </div>
          
          <div v-if="importedStudents.length > 0" class="mt-6">
            <h3 class="font-bold text-gray-800 mb-4">👀 Xem trước dữ liệu ({{ importedStudents.length }} học sinh)</h3>
            <div class="overflow-x-auto max-h-96 overflow-y-auto">
              <table class="w-full text-sm">
                <thead class="bg-gray-100 sticky top-0">
                  <tr>
                    <th class="px-4 py-2 text-left">STT</th>
                    <th class="px-4 py-2 text-left">Họ tên</th>
                    <th class="px-4 py-2 text-left">Giới tính</th>
                    <th class="px-4 py-2 text-left">Ngày sinh</th>
                    <th class="px-4 py-2 text-left">SĐT</th>
                    <th class="px-4 py-2 text-left">Phụ huynh</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(student, index) in importedStudents" :key="index" class="border-b">
                    <td class="px-4 py-2">{{ student.number }}</td>
                    <td class="px-4 py-2">{{ student.name }}</td>
                    <td class="px-4 py-2">{{ student.gender }}</td>
                    <td class="px-4 py-2">{{ student.dob }}</td>
                    <td class="px-4 py-2">{{ student.phone }}</td>
                    <td class="px-4 py-2 text-xs">{{ student.father }} / {{ student.mother }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button 
              @click="saveImportedStudents"
              class="mt-4 w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              ✅ Lưu danh sách học sinh
            </button>
          </div>
        </div>

        <!-- Manual Entry -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">✍️ Nhập thủ công</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Họ tên</label>
              <input 
                v-model="manualStudent.name"
                type="text"
                placeholder="Nguyễn Văn A"
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Số báo danh</label>
              <input 
                v-model="manualStudent.number"
                type="text"
                placeholder="01"
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Giới tính</label>
              <select 
                v-model="manualStudent.gender"
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Ngày sinh</label>
              <input 
                v-model="manualStudent.dob"
                type="date"
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">SĐT Phụ huynh</label>
              <input 
                v-model="manualStudent.phone"
                type="tel"
                placeholder="0123456789"
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Tổ</label>
              <select 
                v-model.number="manualStudent.group"
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option :value="1">Tổ 1</option>
                <option :value="2">Tổ 2</option>
                <option :value="3">Tổ 3</option>
                <option :value="4">Tổ 4</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ</label>
              <input 
                v-model="manualStudent.address"
                type="text"
                placeholder="Địa chỉ"
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button 
            @click="addManualStudent"
            class="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            ➕ Thêm học sinh
          </button>
        </div>
      </div>

      <!-- Accounts Tab -->
      <div v-if="activeTab === 'accounts'" class="space-y-6">
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">🔐 Tạo tài khoản tự động</h2>
          
          <div class="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 class="font-bold text-blue-800 mb-3">ℹ️ Quy tắc tạo tài khoản</h3>
            <ul class="space-y-2 text-sm text-gray-700">
              <li>• <strong>Học sinh:</strong> hs + số điện thoại (ví dụ: hs0123456789)</li>
              <li>• <strong>Phụ huynh:</strong> ph + số điện thoại (ví dụ: ph0123456789)</li>
              <li>• <strong>Mật khẩu mặc định:</strong> 123456 (nên đổi sau khi đăng nhập lần đầu)</li>
            </ul>
          </div>

          <button 
            @click="generateAccounts"
            class="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg font-semibold transition-colors mb-6"
          >
            ⚡ Tạo tài khoản cho tất cả học sinh và phụ huynh
          </button>

          <div v-if="generatedAccounts.length > 0" class="mt-6">
            <h3 class="font-bold text-gray-800 mb-4">📋 Tài khoản đã tạo ({{ generatedAccounts.length }})</h3>
            <div class="overflow-x-auto max-h-96 overflow-y-auto">
              <table class="w-full text-sm">
                <thead class="bg-gray-100 sticky top-0">
                  <tr>
                    <th class="px-4 py-2 text-left">Loại</th>
                    <th class="px-4 py-2 text-left">Tên</th>
                    <th class="px-4 py-2 text-left">Tài khoản</th>
                    <th class="px-4 py-2 text-left">Mật khẩu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(account, index) in generatedAccounts" :key="index" class="border-b">
                    <td class="px-4 py-2">
                      <span :class="[
                        'px-2 py-1 rounded-full text-xs font-semibold',
                        account.role === 'student' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                      ]">
                        {{ account.role === 'student' ? '👨‍🎓 HS' : '👨‍👩‍👧 PH' }}
                      </span>
                    </td>
                    <td class="px-4 py-2">{{ account.name }}</td>
                    <td class="px-4 py-2 font-mono">{{ account.username }}</td>
                    <td class="px-4 py-2 font-mono">{{ account.password }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button 
              @click="downloadAccountsCSV"
              class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              📥 Tải xuống danh sách tài khoản (CSV)
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import * as XLSX from 'xlsx'

const activeTab = ref('schoolYear')

// School Year Management
const currentSchoolYear = ref({
  id: 1,
  name: '2024-2025',
  className: '6A1',
  startDate: '01/09/2024',
  endDate: '31/05/2025',
  isActive: true
})

const schoolYears = ref([
  currentSchoolYear.value,
  {
    id: 2,
    name: '2023-2024',
    className: '6A2',
    startDate: '01/09/2023',
    endDate: '31/05/2024',
    isActive: false
  }
])

const newSchoolYear = ref({
  name: '',
  className: '',
  startDate: '',
  endDate: ''
})

const createSchoolYear = () => {
  if (!newSchoolYear.value.name || !newSchoolYear.value.className || !newSchoolYear.value.startDate || !newSchoolYear.value.endDate) {
    alert('⚠️ Vui lòng điền đầy đủ thông tin!')
    return
  }

  const year = {
    id: schoolYears.value.length + 1,
    name: newSchoolYear.value.name,
    className: newSchoolYear.value.className,
    startDate: newSchoolYear.value.startDate,
    endDate: newSchoolYear.value.endDate,
    isActive: false
  }

  schoolYears.value.unshift(year)
  
  // Reset form
  newSchoolYear.value = {
    name: '',
    className: '',
    startDate: '',
    endDate: ''
  }

  alert('✅ Đã tạo năm học mới thành công!')
}

const activateSchoolYear = (yearId) => {
  // Deactivate all years
  schoolYears.value.forEach(year => year.isActive = false)
  
  // Activate selected year
  const year = schoolYears.value.find(y => y.id === yearId)
  if (year) {
    year.isActive = true
    currentSchoolYear.value = year
    alert(`✅ Đã kích hoạt năm học ${year.name}. Trang sẽ tải lại...`)
    // In real app, reload data for this school year
    setTimeout(() => {
      window.location.reload()
    }, 1500)
  }
}

// Students Management
const importedStudents = ref([])
const fileInput = ref(null)

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 })

      // Skip header row and parse data
      const students = []
      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i]
        if (row[0]) { // Check if row has data
          students.push({
            number: String(row[0]).padStart(2, '0'),
            name: row[1] || '',
            gender: row[2] === 'Nam' ? 'male' : 'female',
            dob: row[3] || '',
            phone: row[4] || '',
            address: row[5] || '',
            father: row[6] || '',
            mother: row[7] || '',
            email: row[8] || '',
            group: Math.ceil(i / 9) // Auto assign to groups of ~9
          })
        }
      }

      importedStudents.value = students
      alert(`✅ Đã nhập ${students.length} học sinh từ file Excel!`)
    } catch (error) {
      alert('❌ Lỗi khi đọc file Excel. Vui lòng kiểm tra định dạng file!')
      console.error(error)
    }
  }
  reader.readAsArrayBuffer(file)
}
const studentsToSave = importedStudents.value.map(student => ({
    ...student,
    id: Date.now() + Math.random(),
    isExcellent: false,
    achievements: [],
    weeklyPoints: 0,
    position: '',
    parent: {
      father: student.father || '',
      mother: student.mother || '',
      phone: student.phone
    }
  }))
  localStorage.setItem('students', JSON.stringify(studentsToSave))
  const saveImportedStudents = () => {
  // In real app, save to database/backend
  localStorage.setItem('students', JSON.stringify(importedStudents.value))
  alert(`✅ Đã lưu ${importedStudents.value.length} học sinh vào hệ thống!`)
  importedStudents.value = []
}

// Manual Student Entry
const manualStudent = ref({
  name: '',
  number: '',
  gender: 'male',
  dob: '',
  phone: '',
  address: '',
  group: 1
})

const addManualStudent = () => {
  if (!manualStudent.value.name || !manualStudent.value.number || !manualStudent.value.phone) {
    alert('⚠️ Vui lòng điền đầy đủ thông tin bắt buộc!')
    return
  }

  // In real app, save to database
  const students = JSON.parse(localStorage.getItem('students') || '[]')
  students.push({
    id: students.length + 1,
    ...manualStudent.value,
    isExcellent: false,
    achievements: [],
    weeklyPoints: 0,
    position: '',
    parent: {
      father: '',
      mother: '',
      phone: manualStudent.value.phone
    }
  })
  localStorage.setItem('students', JSON.stringify(students))

  alert('✅ Đã thêm học sinh thành công!')
  
  // Reset form
  manualStudent.value = {
    name: '',
    number: '',
    gender: 'male',
    dob: '',
    phone: '',
    address: '',
    group: 1
  }
}

// Account Generation
const generatedAccounts = ref([])

const generateAccounts = () => {
  const students = JSON.parse(localStorage.getItem('students') || '[]')
  
  if (students.length === 0) {
    alert('⚠️ Chưa có học sinh nào trong hệ thống!')
    return
  }

  const accounts = []
  
  students.forEach(student => {
    // Student account
    accounts.push({
      role: 'student',
      name: student.name,
      username: `hs${student.phone || student.number}`,
      password: '123456'
    })

    // Parent account
    accounts.push({
      role: 'parent',
      name: `PH ${student.name}`,
      username: `ph${student.phone || student.number}`,
      password: '123456'
    })
  })

  generatedAccounts.value = accounts
  
  // Save to users data (in real app, send to backend)
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
  const allUsers = [...existingUsers, ...accounts]
  localStorage.setItem('users', JSON.stringify(allUsers))

  alert(`✅ Đã tạo ${accounts.length} tài khoản thành công!`)
}

const downloadAccountsCSV = () => {
  let csv = 'Loại,Tên,Tài khoản,Mật khẩu\n'
  generatedAccounts.value.forEach(account => {
    csv += `${account.role === 'student' ? 'Học sinh' : 'Phụ huynh'},${account.name},${account.username},${account.password}\n`
  })

  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'danh-sach-tai-khoan.csv'
  link.click()
}

// Download Excel Template
const downloadExcelTemplate = () => {
  // Create sample data
  const templateData = [
    ['STT', 'Họ tên', 'Giới tính', 'Ngày sinh', 'SĐT Phụ huynh', 'Địa chỉ', 'Tên bố', 'Tên mẹ', 'Email'],
    [1, 'Nguyễn Văn An', 'Nam', '15/03/2015', '0123456789', 'Tổ dân phố Kim Giao Thiện, Phường Hoài Nhơn Đông, Tỉnh Gia Lai', 'Nguyễn Văn A', 'Trần Thị B', 'minhan@student.edu.vn'],
    [2, 'Trần Thị Bình', 'Nữ', '22/05/2015', '0987654321', 'Tổ dân phố Kim Giao Thiện, Phường Hoài Nhơn Đông, Tỉnh Gia Lai', 'Trần Văn C', 'Lê Thị D', 'baobinh@student.edu.vn'],
    [3, 'Lê Quỳnh Chi', 'Nữ', '10/08/2015', '0369258147', 'Tổ dân phố Kim Giao Thiện, Phường Hoài Nhơn Đông, Tỉnh Gia Lai', 'Lê Văn E', 'Phạm Thị F', 'quynhchi@student.edu.vn'],
    [4, 'Phạm Tuấn Đạt', 'Nam', '05/12/2014', '0147258369', 'Tổ dân phố Kim Giao Thiện, Phường Hoài Nhơn Đông, Tỉnh Gia Lai', 'Phạm Văn G', 'Nguyễn Thị H', 'tuandat@student.edu.vn'],
    [5, 'Hoàng Mai Em', 'Nữ', '18/06/2015', '0258147369', 'Tổ dân phố Kim Giao Thiện, Phường Hoài Nhơn Đông, Tỉnh Gia Lai', 'Hoàng Văn I', 'Đỗ Thị K', 'maiem@student.edu.vn']
  ]

  // Create workbook and worksheet
  const ws = XLSX.utils.aoa_to_sheet(templateData)
  
  // Set column widths
  ws['!cols'] = [
    { wch: 5 },  // STT
    { wch: 20 }, // Họ tên
    { wch: 10 }, // Giới tính
    { wch: 12 }, // Ngày sinh
    { wch: 15 }, // SĐT
    { wch: 40 }, // Địa chỉ
    { wch: 20 }, // Tên bố
    { wch: 20 }, // Tên mẹ
    { wch: 25 }  // Email
  ]

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Danh sách học sinh')

  // Generate file and download
  XLSX.writeFile(wb, 'mau-danh-sach-hoc-sinh.xlsx')
  
  alert('✅ Đã tải xuống file mẫu Excel!')
}

// Password Change
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const passwordError = ref('')
const passwordSuccess = ref('')

const changePassword = () => {
  passwordError.value = ''
  passwordSuccess.value = ''

  if (!passwordForm.value.currentPassword || !passwordForm.value.newPassword || !passwordForm.value.confirmPassword) {
    passwordError.value = 'Vui lòng điền đầy đủ thông tin!'
    return
  }

  if (passwordForm.value.newPassword.length < 6) {
    passwordError.value = 'Mật khẩu mới phải có ít nhất 6 ký tự!'
    return
  }

  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    passwordError.value = 'Mật khẩu xác nhận không khớp!'
    return
  }

  // In real app, verify current password with backend
  // For now, just show success
  passwordSuccess.value = 'Đổi mật khẩu thành công!'
  
  // Reset form
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  setTimeout(() => {
    passwordSuccess.value = ''
  }, 3000)
}
</script>

<style scoped>
/* Custom scrollbar for tables */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
