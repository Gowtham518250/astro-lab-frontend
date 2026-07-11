import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const courses = [
  {
    title: 'Quantum Mechanics Essentials',
    slug: 'quantum-mechanics-essentials',
    description: 'Master the foundational principles of quantum mechanics — from wave-particle duality to Schrödinger\'s equation — with beautiful visualizations and step-by-step derivations.',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    category: 'Physics',
    instructor: 'Dr. Elena Voss',
    level: 'INTERMEDIATE' as const,
    duration: 480,
    price: 89,
    discount: 20,
    isPublished: true,
    isPremium: true,
    isFeatured: true,
  },
  {
    title: 'Astrobiology & Life in the Cosmos',
    slug: 'astrobiology-life-cosmos',
    description: 'Explore the science of life beyond Earth. Learn how extremophiles, biosignatures, and exoplanet atmospheres are helping us answer the ultimate question: Are we alone?',
    thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80',
    category: 'Astronomy',
    instructor: 'Prof. Marcus Webb',
    level: 'BEGINNER' as const,
    duration: 360,
    price: 59,
    discount: 0,
    isPublished: true,
    isPremium: false,
    isFeatured: true,
  },
  {
    title: 'Deep Learning & Neural Architectures',
    slug: 'deep-learning-neural-architectures',
    description: 'From perceptrons to transformers, master modern deep learning. Build CNNs, RNNs, and attention-based models from scratch with PyTorch.',
    thumbnail: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=80',
    category: 'Robotics',
    instructor: 'Dr. Yuki Tanaka',
    level: 'ADVANCED' as const,
    duration: 720,
    price: 149,
    discount: 10,
    isPublished: true,
    isPremium: true,
    isFeatured: false,
  },
  {
    title: 'Organic Chemistry Masterclass',
    slug: 'organic-chemistry-masterclass',
    description: 'Understand reaction mechanisms, stereochemistry, and spectroscopic analysis. From alkanes to aromatics — a comprehensive visual journey through organic chemistry.',
    thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    category: 'Chemistry',
    instructor: 'Prof. Sandra Mills',
    level: 'INTERMEDIATE' as const,
    duration: 540,
    price: 79,
    discount: 15,
    isPublished: true,
    isPremium: false,
    isFeatured: false,
  },
  {
    title: 'Robotics & Autonomous Systems',
    slug: 'robotics-autonomous-systems',
    description: 'Build intelligent robots from the ground up. Learn kinematics, sensor fusion, path planning, and ROS — and program your first autonomous agent.',
    thumbnail: 'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?auto=format&fit=crop&w=800&q=80',
    category: 'Robotics',
    instructor: 'Dr. Leon Xu',
    level: 'ADVANCED' as const,
    duration: 600,
    price: 129,
    discount: 0,
    isPublished: true,
    isPremium: true,
    isFeatured: true,
  },
  {
    title: 'Introduction to Earth Sciences',
    slug: 'introduction-earth-sciences',
    description: 'Discover plate tectonics, rock cycles, climate systems, and geological history. Perfect for beginners who want to understand the dynamic planet we call home.',
    thumbnail: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=800&q=80',
    category: 'Earth Science',
    instructor: 'Prof. Asha Raman',
    level: 'BEGINNER' as const,
    duration: 300,
    price: 49,
    discount: 0,
    isPublished: true,
    isPremium: false,
    isFeatured: false,
  },
]

const lessonTemplates = [
  { title: 'Introduction & Course Overview', description: 'Welcome to the course. We cover the learning objectives, structure, and key outcomes you can expect.', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 420, isFree: true },
  { title: 'Core Concepts & Foundations', description: 'Laying the groundwork with the essential principles and mathematical foundations needed for the rest of the course.', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 1800, isFree: false },
  { title: 'Deep Dive: Key Mechanisms', description: 'A detailed exploration of the primary mechanisms and how they work at a fundamental level.', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 2400, isFree: false },
  { title: 'Practical Application & Lab', description: 'Hands-on exercises and worked examples to cement your understanding with real-world problems.', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 2100, isFree: false },
  { title: 'Advanced Topics & Research Frontiers', description: 'Explore the cutting edge of research and the open problems that scientists and engineers are working to solve today.', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 2700, isFree: false },
  { title: 'Assessment & Next Steps', description: 'Review of all key concepts, a practice quiz, and your personalized roadmap to continue learning beyond this course.', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 900, isFree: false },
]

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.notification.deleteMany()
  await prisma.certificate.deleteMany()
  await prisma.lessonProgress.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.favorite.deleteMany()
  await prisma.enrollment.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.course.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.user.deleteMany()

  console.log('🗑️  Cleared existing data')

  // Hash passwords
  const adminPasswordHash = await bcrypt.hash('admin123', 12)
  const studentPasswordHash = await bcrypt.hash('student123', 12)

  // Create Admin user
  const admin = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'admin@astro-lab.com',
      emailVerified: true,
      role: 'ADMIN',
      totalXP: 9999,
      streak: 365,
      accounts: {
        create: {
          accountId: 'admin-account',
          providerId: 'credential',
          password: adminPasswordHash,
        }
      }
    }
  })

  // Create Student user
  const student = await prisma.user.create({
    data: {
      name: 'Mina Chen',
      email: 'student@astro-lab.com',
      emailVerified: true,
      role: 'STUDENT',
      totalXP: 8450,
      streak: 14,
      accounts: {
        create: {
          accountId: 'student-account',
          providerId: 'credential',
          password: studentPasswordHash,
        }
      }
    }
  })

  console.log(`✅ Created users: ${admin.email}, ${student.email}`)

  // Create Courses with Lessons
  for (const courseData of courses) {
    const course = await prisma.course.create({ data: courseData })

    // Add lessons for each course
    await prisma.lesson.createMany({
      data: lessonTemplates.map((lesson, idx) => ({
        ...lesson,
        courseId: course.id,
        position: idx + 1,
      }))
    })

    console.log(`📚 Created course: ${course.title}`)
  }

  // Enroll student in first two courses
  const allCourses = await prisma.course.findMany({ take: 3 })

  await prisma.enrollment.create({
    data: {
      userId: student.id,
      courseId: allCourses[0].id,
      progress: 68,
      completed: false,
    }
  })

  await prisma.enrollment.create({
    data: {
      userId: student.id,
      courseId: allCourses[1].id,
      progress: 100,
      completed: true,
      completedAt: new Date(),
    }
  })

  // Issue certificate for completed course
  await prisma.certificate.create({
    data: {
      userId: student.id,
      courseId: allCourses[1].id,
      courseName: allCourses[1].title,
      grade: 'Distinction',
    }
  })

  // Add payment records
  await prisma.payment.create({
    data: {
      userId: student.id,
      courseId: allCourses[0].id,
      amount: 89,
      currency: 'INR',
      method: 'card',
      status: 'COMPLETED',
      transactionId: 'TXN-SEED-001',
    }
  })

  await prisma.payment.create({
    data: {
      userId: student.id,
      courseId: allCourses[1].id,
      amount: 59,
      currency: 'INR',
      method: 'upi',
      status: 'COMPLETED',
      transactionId: 'TXN-SEED-002',
    }
  })

  // Add welcome notification
  await prisma.notification.create({
    data: {
      userId: student.id,
      title: 'Welcome to Astro Lab! 🚀',
      message: 'Your account is ready. Start exploring our science courses and track your progress.',
      type: 'success',
    }
  })

  await prisma.notification.create({
    data: {
      userId: student.id,
      title: 'New Course Available',
      message: 'Check out "Robotics & Autonomous Systems" — just added to our catalog.',
      type: 'info',
    }
  })

  console.log('✅ Seed complete!')
  console.log('')
  console.log('🔐 Demo credentials:')
  console.log('   Admin:   admin@astro-lab.com  / admin123')
  console.log('   Student: student@astro-lab.com / student123')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })