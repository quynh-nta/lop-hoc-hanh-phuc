// Vite plugin to handle saving students data
import { writeFileSync } from 'fs'
import { resolve } from 'path'

export default function saveStudentsPlugin() {
  return {
    name: 'save-students',
    configureServer(server) {
      server.middlewares.use('/api/save-students', async (req, res) => {
        if (req.method === 'POST') {
          let body = ''
          
          req.on('data', chunk => {
            body += chunk.toString()
          })
          
          req.on('end', () => {
            try {
              const studentsData = JSON.parse(body)
              const filePath = resolve(process.cwd(), 'src/data/students.json')
              
              writeFileSync(filePath, JSON.stringify(studentsData, null, 2), 'utf8')
              
              console.log(`✅ Successfully saved ${studentsData.length} students to ${filePath}`)
              
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ 
                success: true, 
                message: `Saved ${studentsData.length} students successfully`,
                path: filePath
              }))
            } catch (error) {
              console.error('❌ Error saving students:', error)
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ 
                success: false, 
                error: error.message 
              }))
            }
          })
        } else {
          res.writeHead(405, { 'Content-Type': 'text/plain' })
          res.end('Method Not Allowed')
        }
      })
    }
  }
}
