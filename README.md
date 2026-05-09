# GrowthStep AI MVP

Next.js + TypeScript MVP for an AI Growth Generator SaaS.

## Features
- URL Analysis with mock AI scoring
- Competitor discovery board (like/save/reject UI)
- AI Direction Map
- 6 generator modules + result panel
- Compliance/SEO checklist
- Prisma schema with PostgreSQL models

## Setup
1. Install deps:
   ```bash
   npm install
   ```
2. Copy env:
   ```bash
   cp .env.example .env
   ```
3. Prisma setup:
   ```bash
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```
4. Run dev server:
   ```bash
   npm run dev
   ```

## Architecture
- `app/*`: Wizard pages and dashboard
- `lib/services/mock-ai.ts`: Mock service layer
  - `analyzeUrl()`
  - `discoverCompetitors()`
  - `generateDirectionMap()`
  - `runGenerator()`
  - `generateChecklist()`
- `prisma/schema.prisma`: Data models

Replace mock service outputs with OpenAI-compatible calls and crawler/SERP adapters later.
