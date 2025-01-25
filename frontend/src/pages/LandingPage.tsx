import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Affworld Technologies</h1>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="https://yourportfolio.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Portfolio
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Full Stack Assignment
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A comprehensive solution featuring task management and social media integration
          </p>
          <br />
          * Note: it's Backend is Deployed on Free tier. so first time maybe it's take some time to respond.or you can refresh 30 seconds and server will be running.
        </div>

        {/* Auth Section */}
        <div className="max-w-md mx-auto mb-16">
          <div className="flex justify-center mb-8">
            <button 
              className={`px-6 py-2 ${isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={`px-6 py-2 ${!isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {isLogin ? <Login /> : <Register />}
        </div>

        {/* Technologies Used */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Technologies Used</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Frontend</h3>
              <p className="text-gray-600">React.js, Tailwind CSS</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Backend</h3>
              <p className="text-gray-600">Node.js, Express</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Database</h3>
              <p className="text-gray-600">MongoDB</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Authentication</h3>
              <p className="text-gray-600">JWT</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-600">
          <p className="mb-2">Done by Om Sharma</p>
          <p className="text-sm">Assignment for Affworld Technologies</p>
        </footer>
      </div>
    </div>
  );
}   