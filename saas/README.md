# IdeaGen Pro - Example SaaS Application

This is an example [Next.js](https://nextjs.org) SaaS application demonstrating a modern full-stack architecture with authentication, subscription management, and AI-powered features.

## Technical Structure

### Overview
IdeaGen Pro is a Business Idea Generator SaaS app built with:
- **Frontend**: Next.js 16 (Pages Router) with React 19 + TypeScript
- **Authentication**: Clerk (handles user management and subscriptions)
- **Backend**: FastAPI (Python) for AI generation via OpenAI
- **Styling**: Tailwind CSS 4
- **Deployment**: Vercel (frontend + API routes), FastAPI server (backend)

### Architecture

```
saas/
├── pages/
│   ├── index.tsx              # Home page with pricing preview
│   ├── app.tsx                # App access page (signed-in users)
│   ├── product.tsx            # Subscription management page
│   ├── _app.tsx               # Clerk provider & app wrapper
│   ├── _document.tsx          # HTML document setup
│   └── api/
│       └── check-subscription.ts  # Server-side subscription validation (deprecated)
├── api/                       # Separate FastAPI backend directory
│   └── index.py               # FastAPI app (generates business ideas via OpenAI)
├── middleware.ts              # Clerk auth middleware for protected routes
├── styles/                    # Global CSS
├── public/                    # Static assets
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies (Next, React, Clerk, Tailwind)
└── requirements.txt           # Python dependencies (FastAPI, Uvicorn, OpenAI)
```

### Key Pages

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Marketing page with sign-in/sign-up and pricing preview |
| App | `/app` | Main application; shows idea generator for signed-in users |
| Product | `/product` | Alternative entry point for accessing the generator |

### Authentication Flow

1. **Clerk Integration**: Uses `@clerk/nextjs` for authentication and subscription management
2. **Middleware**: `middleware.ts` runs `clerkMiddleware()` on all routes to establish auth context
3. **Protected Routes**: `/app` and `/product` render content based on `isSignedIn` status
4. **Subscriptions**: Managed via Clerk's `PricingTable` component; users can purchase directly

### Frontend Components

- **Home Page** (`pages/index.tsx`): 
  - Sign-in/sign-up buttons for unauthenticated users
  - "Access Premium Features" button for signed-in users
  - Pricing preview card

- **Idea Generator** (`pages/product.tsx`, `pages/app.tsx`):
  - Server-Sent Events (SSE) for streaming responses
  - Calls `/api` endpoint with JWT token in Authorization header
  - Displays markdown-formatted business ideas in real-time

### Backend API

**Separate FastAPI Service** (in `api/` folder):
- Endpoint: `GET /api`
- Authentication: Validates JWT token from Clerk
- Functionality: Calls OpenAI GPT-5 Nano to generate business ideas
- Transport: Server-Sent Events (streaming response)

**To run locally**:
```bash
cd api
pip install -r ../requirements.txt
export OPENAI_API_KEY=sk_...
uvicorn index:app --reload --port 8000
```

### Frontend-Backend Connection

- Frontend calls `/api` endpoint with JWT token
- For local dev: Update fetch URL in `pages/product.tsx` to `http://localhost:8000/api`
- For production: API and frontend are deployed separately; use Vercel rewrites or proxy

### Development Stack

- **Language**: TypeScript (frontend), Python (backend)
- **Package Manager**: npm (frontend), pip (backend)
- **Build Tool**: Next.js Turbopack
- **Linting**: ESLint (Next.js config)
- **CSS**: Tailwind CSS 4 with PostCSS

### Deployment

**Frontend** (Vercel):
```bash
vercel --prod
```
- Deployed as serverless functions
- Includes API routes for subscription checks
- Environment variables: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`

**Backend** (FastAPI):
- Runs on a separate server (e.g., Render, Railway, AWS)
- Requires: `OPENAI_API_KEY` environment variable
- Fronend points to this backend via API URL

### Example Features

1. **Marketing Landing Page**: Unauthenticated users see pricing and CTA
2. **User Authentication**: Email/Google OAuth via Clerk
3. **Subscription Management**: Users purchase premium access via Clerk
4. **Premium Content**: Authenticated users access the idea generator
5. **AI Integration**: Real-time streaming responses from OpenAI
6. **Responsive Design**: Tailwind CSS for mobile-first UI

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Environment Setup**:
Create `.env.local` with:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_API_URL=http://localhost:3000  # or prod URL
```

### Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [OpenAI API Reference](https://platform.openai.com/docs)

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

---

**Note**: This is an example SaaS application for educational purposes, demonstrating best practices for full-stack development with Next.js, authentication, and AI integration.
