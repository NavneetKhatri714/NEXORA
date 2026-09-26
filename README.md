# NEXORA

**From Skill Gaps to Career-Ready.**

An AI Skill-Gap Analysis & Personalized Learning Agent — hackathon prototype by **Team ARCHEOPTERYX**.

NEXORA simulates an AI pipeline that analyzes a learner's profile, compares their current
skills against what their target role actually requires, and generates a personalized
**Learn → Practice → Build → Test** roadmap that adapts as they progress.

## What's inside

- **Landing page** — hero with an animated skill dashboard preview, problem/solution
  storytelling, a 5-step "How It Works" walkthrough, feature highlights, and a product
  roadmap section.
- **Auth screen** — simulated sign up / sign in (localStorage-backed), plus a "Continue with
  Google" demo button.
- **Onboarding wizard** — choose a target role (or enter a custom one), connect
  resume/LinkedIn/GitHub (simulated), complete a self-assessment, and watch an AI
  "analysis" animation generate your roadmap.
- **Dashboard** — live career readiness score, skill gap comparison bars, and an interactive
  roadmap timeline where you can check off Learn/Practice/Build/Test tasks.

All "AI" results are mock/demo data computed client-side — there is no backend and no API
key is required. Everything runs locally in the browser.

## Tech stack

- React 19 + Vite
- React Router for client-side routing
- Plain CSS (custom design system, no UI framework) for the futuristic/glassmorphism look
- localStorage for simulated auth + persisted onboarding/roadmap state

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. Sign up with any name/email/password (6+ characters) to
walk through onboarding, or use "Continue with Google" to jump straight into a demo profile.

## Project structure

```
src/
  components/
    layout/       Header, Footer
    landing/       Hero, DashboardPreview, ProblemSolution, HowItWorks, Features, ProductRoadmap, FinalCta
    onboarding/    RoleStep, ProfileStep, AssessmentStep, GenerateStep
    dashboard/     DashboardSidebar, ReadinessCard, SkillGapList, RoadmapTimeline
    common/        ProtectedRoute helpers
  context/         AuthContext (localStorage-simulated auth)
  data/            mockData.js — roles, skills, assessment questions, roadmap builder
  hooks/           useReveal — scroll-triggered animations
  pages/           LandingPage, AuthPage, OnboardingPage, DashboardPage
```
