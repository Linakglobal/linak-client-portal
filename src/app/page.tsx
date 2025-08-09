import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function RootPage() {
  // Check for session existence (simplified check for demo purposes)
  // In production, this would check a proper session cookie or token
  const cookieStore = await cookies();
  const hasSession = cookieStore.get('demo-session') || cookieStore.get('sb-access-token');
  
  // Redirect to dashboard if session exists, otherwise to login
  if (hasSession) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}
