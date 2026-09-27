# NEXORA Backend — ARCHEOPTERYX

Node.js + Express + TypeScript + PostgreSQL + Prisma backend for the NEXORA AI Skill-Gap & Personalized Learning Agent.

## 1. Requirements

- Node.js 20+
- PostgreSQL 14+
- Gemini API key
- Optional GitHub token for higher API rate limits

## 2. Setup

```bash
npm install
cp .env.example .env
```

Edit `.env` and set:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nexora"
JWT_SECRET="a-long-random-secret"
GEMINI_API_KEY="your-key"
CLIENT_URL="http://localhost:5173"
```

Then:

```bash
npx prisma generate
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
npm run dev
```

Backend:

```text
http://localhost:5000
```

Health:

```text
GET /api/health
```

## 3. Frontend authentication

After login/register, save the returned JWT and send:

```http
Authorization: Bearer YOUR_TOKEN
```

For example:

```js
fetch("http://localhost:5000/api/progress/dashboard", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

## 4. Main API

### Auth

`POST /api/auth/register`

```json
{
  "name": "Alex Sharma",
  "email": "alex@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "token": "JWT",
  "user": {
    "id": "...",
    "name": "Alex Sharma",
    "email": "alex@example.com"
  }
}
```

`POST /api/auth/login`

`GET /api/auth/me`

### Profile

`GET /api/profile`

`POST /api/profile/target-role`

```json
{ "targetRole": "Full Stack Developer" }
```

At least one primary source is required by the product flow: resume, GitHub, or LinkedIn.

Resume:

`POST /api/profile/resume`

Form-data:

```text
resume=<PDF file>
```

GitHub:

`POST /api/profile/github`

```json
{ "githubUsername": "octocat" }
```

LinkedIn:

`POST /api/profile/linkedin`

```json
{ "linkedinUrl": "https://www.linkedin.com/in/example" }
```

Run AI profile analysis:

`POST /api/profile/analyze`

### Skills

`GET /api/skills`

`GET /api/skills/mine`

`POST /api/skills`

```json
{
  "name": "React",
  "score": 70,
  "evidence": "Built three React applications"
}
```

### Skill gap / roadmap

`GET /api/roadmaps/gaps`

`POST /api/roadmaps/generate`

`GET /api/roadmaps`

`GET /api/roadmaps/:id`

The roadmap contains skills, priority, course URL and project suggestion.

### Assessments

`POST /api/assessments`

```json
{
  "skill": "React",
  "level": "INTERMEDIATE"
}
```

`GET /api/assessments`

`POST /api/assessments/:id/submit`

```json
{
  "answers": [1, 0, 2, 3, 1]
}
```

The resulting score updates the user's skill score.

### Projects

`GET /api/projects`

`PATCH /api/projects/:id`

```json
{
  "status": "IN_PROGRESS",
  "githubUrl": "https://github.com/example/project"
}
```

### Progress / dashboard

`POST /api/progress`

```json
{
  "itemType": "ROADMAP_SKILL",
  "itemId": "skill-id",
  "roadmapId": "roadmap-id",
  "status": "COMPLETED",
  "score": 88
}
```

`GET /api/progress/dashboard`

This is the main endpoint for the React dashboard.

## 5. Suggested frontend flow

1. Register/login.
2. Ask the user for desired career role.
3. Require one primary profile source: Resume OR GitHub OR LinkedIn.
4. Upload/connect that source.
5. Call `/api/profile/analyze`.
6. Call `/api/roadmaps/gaps`.
7. Call `/api/roadmaps/generate`.
8. Load `/api/progress/dashboard`.
9. Display roadmap as a flow/graph.
10. Each roadmap skill displays its `courseUrl` and `projectIdea`.
11. When a user finishes learning, create/update progress.
12. Use assessments to re-score skills.
13. Regenerate the roadmap after major skill-score changes.

## 6. Security notes

- Passwords are bcrypt-hashed.
- JWT protects private endpoints.
- Resume uploads are restricted to PDF.
- File size is configurable through `MAX_FILE_SIZE_MB`.
- Never commit `.env`.
- For production, store uploaded resumes in object storage rather than the local `uploads/` directory.
- Add rate limiting and stricter CORS before public deployment.

## 7. Architecture

React/Vite
→ Express routes
→ Controllers
→ Services
→ Prisma
→ PostgreSQL

AI flow:

Resume/GitHub/LinkedIn
→ Profile service
→ Gemini
→ User skills
→ Skill-gap service
→ Personalized roadmap
→ Courses + projects + assessments
→ Progress
→ Dashboard
