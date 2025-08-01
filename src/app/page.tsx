import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">LINAK</h1>
              <span className="ml-2 text-sm text-gray-500">Client Portal</span>
            </div>
            <nav className="flex space-x-4">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl mb-6">
            Welcome to LINAK
            <span className="text-blue-600"> Client Portal</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Access your personalized dashboard, manage your account, and explore our comprehensive 
            range of linear actuator solutions designed for your business needs.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/login">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="px-8">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-blue-600">Product Catalog</CardTitle>
              <CardDescription>
                Browse our complete range of linear actuators and accessories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Discover innovative solutions for industrial automation, medical equipment, 
                and office furniture applications.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-blue-600">Order Management</CardTitle>
              <CardDescription>
                Track orders, view history, and manage your purchases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Real-time order tracking, delivery updates, and comprehensive 
                order history at your fingertips.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-blue-600">Technical Support</CardTitle>
              <CardDescription>
                Access documentation, support tickets, and technical resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get expert assistance, download technical specifications, 
                and access our comprehensive knowledge base.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Industry Leaders</h2>
            <p className="text-gray-600">Join thousands of satisfied customers worldwide</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
              <div className="text-gray-600">Products Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600">Years of Innovation</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </main>

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
