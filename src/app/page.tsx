import { redirect } from 'next/navigation';

export default function HomePage() {
  // For now, always redirect to login since we don't have a proper session check
  // This will be handled by middleware for authenticated routes
  redirect('/login');
}
