import Link from "next/link";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
  showAuthButtons?: boolean;
  user?: {
    name: string;
    email: string;
  } | null;
  onLogout?: () => void;
}

export function Layout({ children, showAuthButtons = true, user, onLogout }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">LINAK</h1>
                <span className="ml-2 text-sm text-gray-500">Client Portal</span>
              </Link>
            </div>
            
            {showAuthButtons && (
              <nav className="flex items-center space-x-4">
                {user ? (
                  <>
                    <span className="text-sm text-gray-600">
                      Welcome, {user.name}
                    </span>
                    <Link href="/dashboard">
                      <Button variant="outline" size="sm">
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={onLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="outline" size="sm">
                        Login
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button size="sm">
                        Dashboard
                      </Button>
                    </Link>
                  </>
                )}
              </nav>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">LINAK</h3>
              <p className="text-gray-400">
                Leading provider of electric linear actuator solutions for various industries.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Linear Actuators</li>
                <li>Control Systems</li>
                <li>Accessories</li>
                <li>Custom Solutions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Technical Support</li>
                <li>Training</li>
                <li>Warranty</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Sales Inquiries</li>
                <li>Customer Service</li>
                <li>Technical Support</li>
                <li>Partnership</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LINAK. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
