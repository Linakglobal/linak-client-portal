# LINAK Client Portal

A premium client portal built with Next.js 15, TypeScript, Supabase, and Shadcn UI. This portal provides secure client authentication, document management, and profile management functionality with a luxurious gradient-based design.

![LINAK Client Portal](public/preview.png)

## ✨ Features

- 🔒 **Secure Authentication**: Email + Date of Birth magic link authentication
- 📄 **Document Management**: Upload, view, and manage client documents
- 👤 **Profile Management**: Client information and profile editing
- 📊 **Dashboard**: Client overview with document status and statistics
- 🎨 **Premium UI**: Glassmorphism effects with gradient backgrounds
- 📱 **Responsive Design**: Mobile-first approach with TailwindCSS
- ⚡ **Performance**: Optimized for Apple M4 MacBook Pro
- 🔍 **Health Monitoring**: Built-in diagnostic script for project health

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS 3.4 + Shadcn UI Components
- **Authentication**: Supabase Auth with magic links
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage for document uploads
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Animations**: CSS transitions and hover effects

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18 or higher
- **pnpm**: Package manager (recommended) or npm
- **Supabase Account**: For backend services
- **VS Code**: Recommended IDE with extensions

## 🛠️ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/linak-client-portal.git
cd linak-client-portal
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Copy the environment template:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

For development without Supabase, enable demo mode:

```env
NEXT_PUBLIC_DEMO_MODE=true
```

### 4. Database Setup (If using Supabase)

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run:

```sql
-- Create clients table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  email TEXT NOT NULL,
  name TEXT,
  dob DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id),
  file_name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  file_path TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own client data" ON clients
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own documents" ON documents
  FOR SELECT USING (
    client_id IN (
      SELECT id FROM clients WHERE user_id = auth.uid()
    )
  );
```

3. Create a storage bucket named `client-documents`
4. Set up storage policies for secure file access

### 5. Run Development Server

```bash
pnpm dev
```

For battery-optimized mode on MacBook M4:

```bash
pnpm dev:battery
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
linak-client-portal/
├── public/                 # Static assets
├── scripts/               # Build and utility scripts
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (auth)/       # Authentication routes
│   │   ├── (client-portal)/ # Protected client routes
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Landing page
│   ├── components/       # Reusable UI components
│   │   ├── dashboard/    # Dashboard-specific components
│   │   ├── forms/        # Form components
│   │   ├── layout/       # Layout components
│   │   └── ui/           # Shadcn UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries
│   │   ├── supabase/     # Supabase integration
│   │   └── utils/        # Helper functions
│   └── types/            # TypeScript type definitions
├── diagnostic_script.js   # Project health checker
└── middleware.ts          # Next.js middleware for auth
```

## 🎯 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm dev:battery` | Start with battery optimization (M4 MacBook) |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm lint --fix` | Fix ESLint issues |
| `pnpm type-check` | Run TypeScript type checking |
| `node diagnostic_script.js` | Run project health check |

## 🔍 Health Monitoring

The project includes a diagnostic script to check project health:

```bash
node diagnostic_script.js
```

This script verifies:
- ✅ Required files and directories
- ✅ TypeScript compilation
- ✅ Environment variables
- ✅ Route structure
- ✅ Component imports

## 🎨 Design System

### Color Palette
- **Primary Gradients**: Purple to Blue (#4c1d95 → #2563eb)
- **Secondary Gradients**: Pink to Blue (#f472b6 → #60a5fa)
- **Background**: Dark theme (#0f172a → #1e293b)
- **Text**: White and light gray variations
- **Accent**: Gold/yellow highlights for CTAs

### Typography
- **Primary Font**: Geist Sans
- **Monospace Font**: Geist Mono
- **Scale**: TailwindCSS default typography scale

### Components
All UI components follow the Shadcn UI design system with custom LINAK branding and premium glassmorphism effects.

## 🔐 Authentication Flow

1. **Client Access**: Clients receive login credentials
2. **Magic Link**: Enter email + date of birth for verification
3. **Session Management**: Secure session with Supabase Auth
4. **Route Protection**: Middleware protects client portal routes
5. **Profile Management**: Clients can update their information

## 📱 Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Landing page | Public |
| `/login` | Authentication | Public |
| `/dashboard` | Client overview | Protected |
| `/documents` | Document management | Protected |
| `/upload` | File upload | Protected |
| `/profile` | Profile management | Protected |

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically with each push

### Manual Deployment

```bash
pnpm build
pnpm start
```

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 🧪 Testing

Run the diagnostic script to ensure everything is working:

```bash
node diagnostic_script.js
```

Expected output for a healthy project:
```
🔍 Running LINAK Client Portal diagnostic checks...
✅ All required files present
✅ TypeScript compilation successful
✅ All required environment variables present
✅ All routes exist
✅ All components readable
🎉 All checks passed! Your project is healthy.
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Run the diagnostic script: `node diagnostic_script.js`
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Run the diagnostic script: `node diagnostic_script.js`
2. Check the [Issues](https://github.com/your-username/linak-client-portal/issues) page
3. Create a new issue with the diagnostic output

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Supabase](https://supabase.com/) for backend services
- [Shadcn UI](https://ui.shadcn.com/) for beautiful components
- [TailwindCSS](https://tailwindcss.com/) for styling system
- [Vercel](https://vercel.com/) for deployment platform

---

**Built with ❤️ for LINAK Clients**
