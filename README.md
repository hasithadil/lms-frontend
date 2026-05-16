# University LMS — Frontend

A React-based Learning Management System frontend for a university. Three distinct user roles (Admin, Lecturer, Student) each get their own dashboard and feature set. Authentication is handled entirely through Keycloak SSO; the app never manages passwords directly.

---

## What the app does

### Role: Admin
- View all students in a table (name, email, ACTIVE/INACTIVE status)
- Add new students via modal form
- Update student details inline
- Deactivate or reactivate students (soft delete — status toggle, not hard delete)
- View all lecturers, with the same add / update / deactivate / reactivate workflow
- View all courses (read-only list with course name, max students)
- Click any course row to open a details modal

### Role: Lecturer
- **Dashboard** — profile card (name, email, status) plus a summary of their courses and subjects
- **Courses page** — full CRUD: create, update, delete, and view details for their own courses
- **Subjects page** — view all subjects or filter to "My Subjects"; create new subjects; assign subjects to courses; delete subjects

### Role: Student
- **Dashboard** — profile card plus a table of enrolled courses; can unenroll from any course with a confirm dialog
- **Courses page** — browse all available courses and enroll in any of them

### Shared
- Login page with Keycloak SSO (auto-redirects after authentication based on role)
- Unauthorized page shown when a user tries to access a route their role cannot see
- Toast notifications for all success/error feedback
- Confirm dialogs before any destructive action (deactivate, delete, logout)
- JWT Bearer token automatically attached to every API request via Axios interceptor
- Token auto-refreshed every 60 seconds

---

## Routes / Pages

| Path | Role | Component | Description |
|---|---|---|---|
| `/login` | Public | `LoginPage` | SSO login button; auto-redirects after auth |
| `/unauthorized` | Public | `UnauthorizedPage` | Shown on role mismatch |
| `/admin` | ADMIN | `Students` | All students table |
| `/admin/lecturers` | ADMIN | `Lecturers` | All lecturers table |
| `/admin/courses` | ADMIN | `Courses` | All courses table (read-only) |
| `/student/:studentId` | STUDENT | `StudentDashboard` | Profile + enrolled courses |
| `/student/:studentId/courses` | STUDENT | `StudentCourses` | Browse & enroll in courses |
| `/lecturer/:lecId` | LECTURER | `LecturerDashboard` | Profile + courses & subjects summary |
| `/lecturer/:lecturerId/courses` | LECTURER | `LecturerCourses` | Manage own courses |
| `/lecturer/:lecturerId/subjects` | LECTURER | `LecturerSubjects` | Manage subjects & assign to courses |

All role-specific routes are wrapped in `ProtectedRoute`, which redirects to `/login` if unauthenticated and to `/unauthorized` on role mismatch.

---

## Backend API endpoints consumed

All requests go to the base URL configured by `VITE_API_URL`.

### Admin endpoints
| Method | Path | Used by |
|---|---|---|
| GET | `/admin/students` | Students list |
| GET | `admin/student/:id` | Student detail modal |
| POST | `/admin/students` | Add student (via AddStudentModal) |
| PUT | `/admin/student/:id` | Update student |
| DELETE | `/admin/student/:id` | Deactivate student |
| PUT | `/admin/student/:id/reactivate` | Reactivate student |
| GET | `/admin/lecturers` | Lecturers list |
| GET | `/admin/lecturer/:id` | Lecturer detail modal |
| POST | `/admin/lecturers` | Add lecturer (via AddLecturerModal) |
| PUT | `/admin/lecturer/:id` | Update lecturer |
| DELETE | `/admin/lecturer/:id` | Deactivate lecturer |
| PUT | `/admin/lecturer/:id/reactivate` | Reactivate lecturer |
| GET | `/admin/courses` | All courses list |
| GET | `/admin/course/:id` | Course detail modal |

### Student endpoints
| Method | Path | Used by |
|---|---|---|
| GET | `/student/students` | User-mapping (Keycloak ID → DB ID) |
| GET | `/student/:id` | Student profile + enrollments |
| GET | `/student/courses` | Available courses list |
| GET | `/student/course/:id` | Course detail modal |
| POST | `/student/enroll` | Enroll in a course |
| DELETE | `/student/unenroll/:studentId/:courseId` | Unenroll from a course |
| GET | `/student/enroll/:id` | Student's current enrollments |

### Lecturer endpoints
| Method | Path | Used by |
|---|---|---|
| GET | `/lecturer/lecturers` | User-mapping (Keycloak ID → DB ID) |
| GET | `/lecturer/:id` | Lecturer profile + courses + subjects |
| GET | `/lecturer/:id/courses` | Lecturer's courses |
| GET | `/lecturer/:courseId/subjects` | Subjects in a course |
| POST | `/lecturer/courses` | Create course |
| PUT | `/lecturer/course/:courseId` | Update course |
| DELETE | `/lecturer/course/:courseId` | Delete course |
| GET | `/lecturer/course/:id` | Course detail modal |
| GET | `/lecturer/subjects` | All subjects |
| POST | `/lecturer/subjects` | Create subject |
| DELETE | `/lecturer/subject/:id` | Delete subject |
| POST | `/lecturer/subjecttocourse` | Assign subject to course |
| DELETE | `/lecturer/course/:courseId/subject/:subId` | Remove subject from course |

---

## Tech stack

| Layer | Library / Tool |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 7 |
| Routing | React Router DOM v7 |
| HTTP client | Axios |
| Auth | Keycloak JS (v26) |
| Styling | Tailwind CSS v4 + plain CSS modules |
| Linting | ESLint + typescript-eslint |
| Deployment | Vercel (via `vercel.json` SPA rewrite) |

---

## Screenshots

> Add screenshots here after deployment.

---

## Prerequisites

- Node.js 18+
- A running **Keycloak** instance with a realm and client configured
- A running **Spring Boot** backend (the API this app calls)

---

## Setup — local development

```bash
# 1. Install dependencies
npm install

# 2. Create your env file
cp .env.example .env

# 3. Fill in your values in .env (see Environment Variables section below)

# 4. Start dev server
npm run dev
```

---

## Environment variables

Create a `.env` file at the project root (copy from `.env.example`):

```env
# Backend Spring Boot API base URL
VITE_API_URL=http://localhost:8080

# Keycloak server URL
VITE_KEYCLOAK_URL=http://localhost:8081

# Keycloak realm name
VITE_KEYCLOAK_REALM=myrealm

# Keycloak client ID registered for this SPA
VITE_KEYCLOAK_CLIENT_ID=my-spa-client
```

All four variables are required for the app to function. Without them the app falls back to the localhost defaults, which will not work in production.

---

## Build for production

```bash
npm run build
```

Output goes to `dist/`. Serve it with any static host that can handle SPA routing (Vercel, Netlify, nginx with `try_files`).

---

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import the repo in [vercel.com](https://vercel.com).
3. Set the following **Environment Variables** in the Vercel project settings:
   - `VITE_API_URL` — your production backend URL
   - `VITE_KEYCLOAK_URL` — your production Keycloak URL
   - `VITE_KEYCLOAK_REALM` — your realm name
   - `VITE_KEYCLOAK_CLIENT_ID` — your client ID
4. Vercel will auto-detect Vite and run `npm run build` with output directory `dist`.
5. The included `vercel.json` ensures all client-side routes serve `index.html`.

> **Important:** Add your Vercel deployment URL to the **Valid Redirect URIs** and **Web Origins** in your Keycloak client settings, otherwise the SSO flow will be blocked.

---

## Keycloak setup notes

The app expects three realm roles to exist in Keycloak:
- `ADMIN`
- `LECTURER`
- `STUDENT`

After login the app reads `keycloak.realmAccess.roles` and routes the user to the appropriate dashboard. Users without one of these roles land on the login page with no redirect.

The app also maps Keycloak user IDs to database IDs by calling `/student/students` or `/lecturer/lecturers` and matching the `kc_id` field — so every student and lecturer record in the backend must store its Keycloak subject UUID.

---

## Project structure

```
src/
├── api/
│   ├── apiClient.ts        # Axios instance + JWT interceptor
│   ├── lecturerApi.ts      # Lecturer-facing API calls
│   └── studentApi.ts       # Student-facing API calls
├── components/
│   ├── AdminNavbar.tsx
│   ├── LecturerNavbar.tsx
│   ├── StudentNavbar.tsx
│   ├── ProtectedRoute.tsx
│   ├── ConfirmDialog.tsx
│   ├── Toast.tsx
│   ├── AddStudentModel.tsx
│   ├── UpdateStudentModel.tsx
│   ├── StudentModel.tsx
│   ├── AddLecturerModel.tsx
│   ├── UpdateLecturerModel.tsx
│   ├── LecturerModel.tsx
│   ├── CreateCourseModel.tsx
│   ├── UpdateCourseModel.tsx
│   ├── CourseDetailsModel.tsx
│   ├── CreateSubjectModel.tsx
│   └── AssignSubject.tsx
├── context/
│   └── AuthContext.tsx      # Keycloak auth state, token refresh
├── pages/
│   ├── admin/
│   │   ├── Students.tsx
│   │   ├── Lecturers.tsx
│   │   └── Courses.tsx
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   └── UnauthorizedPage.tsx
│   ├── lecturer/
│   │   ├── LecturerDashboard.tsx
│   │   ├── LecturerCourses.tsx
│   │   └── LecturerSubjects.tsx
│   └── student/
│       ├── StudentDashboard.tsx
│       └── StudentCourses.tsx
├── routes/
│   └── AppRoutes.tsx
├── services/
│   └── userMappingService.ts  # Keycloak ID → DB ID lookup
├── types/                     # TypeScript interfaces
└── keycloak.ts                # Keycloak instance config
```
