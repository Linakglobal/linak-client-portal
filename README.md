# LINAK Client Portal

A modern, responsive client portal built with Next.js 15, TypeScript, TailwindCSS, and Shadcn UI for LINAK's linear actuator solutions.

## Features

- 🎨 Modern UI with TailwindCSS and Shadcn UI components
- 🔐 Authentication with protected routes
- 📱 Fully responsive design
- 🚀 Built with Next.js 15 App Router
- 💪 TypeScript for type safety
- 🎯 Client dashboard with order management
- 📊 Real-time stats and data visualization
- 🔒 Middleware-based route protection

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Protected dashboard page
│   ├── login/              # Authentication page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/             # Reusable React components
│   ├── ui/                 # Shadcn UI components
│   ├── Layout.tsx          # Shared layout component
│   └── LoadingSpinner.tsx  # Loading components
├── context/                # React context providers
│   └── AuthContext.tsx     # Authentication context
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries
│   └── utils.ts            # Utility functions
├── types/                  # TypeScript type definitions
│   └── index.ts            # Shared types
└── middleware.ts           # Next.js middleware for route protection
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, pnpm, or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3100](http://localhost:3100) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Pages

### Homepage (/)
- Modern landing page showcasing LINAK solutions
- Feature cards highlighting key capabilities
- Company statistics and testimonials
- Call-to-action buttons for login and dashboard access

### Login Page (/login)
- Clean, professional login form
- Social login options (Google, GitHub)
- Demo credentials for testing
- Responsive design for all devices

### Dashboard (/dashboard)
- Protected route requiring authentication
- Real-time order tracking and management
- Account overview and statistics
- Quick action buttons for common tasks
- Recent activity feed

## Authentication

The portal includes a demonstration authentication system:

- **Demo Access**: Use any email and password on the login page
- **Route Protection**: Dashboard routes are protected by middleware
- **Session Management**: Basic session handling with localStorage
- **Logout Functionality**: Clean session termination

**Note**: This is a demo implementation. In production, implement proper JWT authentication, secure session management, and server-side validation.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn UI** - Modern component library
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Lucide React** - Icon library

## Customization

### Styling
- Modify `tailwind.config.js` for custom design tokens
- Update `src/app/globals.css` for global styles
- Customize Shadcn UI components in `src/components/ui/`

### Authentication
- Replace demo authentication in `src/context/AuthContext.tsx`
- Update middleware in `src/middleware.ts` for proper token validation
- Implement secure session management

### Branding
- Update colors and typography in TailwindCSS configuration
- Replace placeholder content with LINAK-specific information
- Add company logos and assets

## Development Notes

- All components are TypeScript-based for better development experience
- Responsive design ensures compatibility across devices
- ESLint configuration maintains code quality
- Build optimization for production deployment

## Deployment

The application can be deployed on:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Traditional hosting** with Node.js support

For production deployment:

```bash
npm run build
npm run start
```

## Contributing

1. Follow TypeScript best practices
2. Use Prettier for code formatting
3. Ensure all components are responsive
4. Add proper error handling
5. Update documentation for new features

## License

This project is created for LINAK Client Portal demonstration purposes.
