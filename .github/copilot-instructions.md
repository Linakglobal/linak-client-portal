# LINAK Client Portal - Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a premium LINAK Client Portal built with Next.js 15, TypeScript, Supabase, and Shadcn UI. The portal provides secure client authentication, document management, and profile management functionality.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS 3.4 + Shadcn UI Components
- **Authentication**: Supabase Auth with email/DOB verification
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage for documents
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Architecture Guidelines

- Use App Router file-based routing structure
- Implement route groups for authentication and client portal
- Apply middleware for route protection
- Use Server Components by default, Client Components when needed
- Follow TypeScript strict typing patterns
- Implement responsive design with mobile-first approach

## Authentication System

- Email + Date of Birth magic link authentication
- Secure session management with Supabase
- Route protection via middleware
- Client profile management

## Database Schema

- `clients` table: id, user_id, email, name, dob, created_at
- `documents` table: id, client_id, file_name, description, status, file_path, uploaded_at
- `client-documents` storage bucket for file uploads

## UI/UX Standards

- Use luxurious gradient backgrounds and glassmorphism effects
- Implement premium visual animations with Framer Motion
- Follow Shadcn UI design patterns and components
- Ensure accessibility and responsive design
- Use consistent spacing and typography from TailwindCSS

## Code Quality

- Follow ESLint configuration
- Use Prettier for formatting
- Implement proper error handling
- Add TypeScript interfaces and types
- Write clean, maintainable code with proper comments

## Security

- Implement proper authentication checks
- Validate all form inputs with Zod schemas
- Secure file upload handling
- Use environment variables for sensitive data
- Follow Supabase security best practices
