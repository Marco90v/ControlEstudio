# Sistema de Control de Estudio

**Sistema de Control de Estudio** es una plataforma web concebida como ejercicio académico para gestionar: registros de estudiantes, profesores, pensum, clases y notas. Incluye distintos roles y acceso controlado, ideal para practicar tecnologías modernas de desarrollo full‑stack.

Disponible en: [English](/README.md)

## 📌 Funcionalidades

- 🔐 **Login** con usuarios de demostración (Admin, Profesor, Estudiante)  
- 📚 Registro de clases, pensum, profesores, profesiones, estudiantes y notas  
- 👨‍🏫 Asignación de clases a profesores  
- 🎓 Acceso diferenciado por rol:  
  - **Admin**: acceso completo  
  - **Profesor / Estudiante**: pueden ver sólo sus notas y datos personales

## 🧰 Tecnología usada

- Frontend: Vite + TypeScript + SWC  
- React con React Router, React Hook Form, Zod, Zustand  
- UI: TailwindCSS, shadcn/ui, iconos con Lucide‑React  
- Backend/BBDD: Supabase (autenticación + base de datos)

## 🚀 Instalación y uso

```bash
git clone https://github.com/Marco90v/ControlEstudio.git
cd ControlEstudio
pnpm install
pnpm run dev
```
Luego, abre http://localhost:5173/login en tu navegador.

## 👥 Autenticación y roles
- Admin: gestión completa
- Profesor / Estudiante: sólo visualización de sus datos y notas

## Usuarios de demo:
```
- LeonadoCuellar@email.com / 1234 / Admin
- AlmaFranco@email.com / 1234 / Admin
- RafaCozar@email.com / 1234 / Professor
- OdalysMadrigal@email.com / 1234 / Professor
- AngelNavas@email.com / 1234 / Student
- TatianaEcheverria@email.com / 1234 / Student
```

## 📈 Estado del proyecto
Proyecto funcional, pero con fines de práctica. No listo para producción o uso empresarial: faltan múltiples elementos (seguridad, validación avanzada, pruebas, escalabilidad…).

## 💼 Demo
Visita la demo en producción:
https://control-estudio.vercel.app/login

## 🛡️ Licencia y créditos
- Autor: Marco90v (único colaborador)
- Licencia: uso restringido. No se permite uso comercial sin autorización; contacta al autor para negociar licencia con fines lucrativos.

## 📸 Capturas de pantalla

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