import React from 'react';
import { Menu, User, BookOpen, LogOut } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-600" />
            <span className="ml-3 text-xl font-bold text-indigo-600">EduTrack</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <BookOpen className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <User className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <LogOut className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}