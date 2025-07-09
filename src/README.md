# Academic Control System

**Academic Control System** is a web-based platform created as a learning exercise to manage academic records, including students, teachers, curriculum, classes, and grades. It features role-based access control and modern full-stack technologies.

📄 Available in: [Español](/README.es.md)

## 📌 Features

- 🔐 **Login** with demo users (Admin, Teacher, Student)  
- 📚 Management of classes, curriculum, teachers, professions, students, and grades  
- 👨‍🏫 Assign classes to teachers  
- 🎓 Role-based access:  
  - **Admin**: full access  
  - **Teacher / Student**: view only their own grades and personal information

## 🧰 Tech Stack

- Frontend: Vite, TypeScript, SWC  
- React with React Router, React Hook Form, Zod, Zustand  
- UI: TailwindCSS, shadcn/ui, icons with Lucide‑React  
- Backend/DB: Supabase (authentication + database)

## 🚀 Installation & Usage

```bash
git clone https://github.com/Marco90v/ControlEstudio.git
cd ControlEstudio
pnpm install
pnpm run dev
```
Then navigate to http://localhost:5173/login in your browser.

## 👥 Authentication & Roles

- Admin: full access
- Teacher / Student: view-only access to personal profile and grades

## Demo users:
```
- LeonadoCuellar@email.com / 1234 / Admin
- AlmaFranco@email.com / 1234 / Admin
- RafaCozar@email.com / 1234 / Professor
- OdalysMadrigal@email.com / 1234 / Professor
- AngelNavas@email.com / 1234 / Student
- TatianaEcheverria@email.com / 1234 / Student
```

## 📈 Project Status
Functional project built for learning. Not production-ready: missing security, validation, tests, scalability, etc.

## 💼 Demo
Check the live demo at:
https://control-estudio.vercel.app/login

## 🛡️ License & Credits
- Author: Marco90v (sole contributor)
- License: restricted use. Commercial use requires written permission and licensing fee—contact the author for licensing options.

## 📸 Screenshots

- Login
![Login](/screenshots/Login.webp)
- Dashboard
![Dashboard](/screenshots/Dashboard.webp)
- Classes
![Classes](/screenshots/Classes.webp)
- Professors
![Professors](/screenshots/Professors.webp)
- Students
![Students](/screenshots/Students.webp)
- Grades
![Grades](/screenshots/Grades.webp)
- Pensum
![Pensum](/screenshots/Pensum.webp)
- Assignments
![Assignments](/screenshots/Assignments.webp)
- Modal
![Modal](/screenshots/Modal.webp)