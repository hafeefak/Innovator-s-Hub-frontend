// src/components/Investor/InvestorSidebar.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function InvestorSidebar({
  activeTab,
  setActiveTab,
  categories,
  selectedCategory,
  setSelectedCategory
}) {
  const { user } = useAuth(); // get user from AuthContext

  const tabs = [
    { id: 'all', name: 'All Ideas', icon: '💡' },
    { id: 'liked', name: 'Liked', icon: '❤️' },
    { id: 'saved', name: 'Saved', icon: '⭐' }
  ];

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200 transform lg:translate-x-0 lg:static lg:inset-0">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Innovator's Hub
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="mr-3 text-lg">{tab.icon}</span>
              {tab.name}
            </button>
          ))}

          {/* Categories Filter */}
          <div className="pt-6">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Categories
            </p>
            <div className="mt-2 space-y-1">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                  selectedCategory === ''
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                All Categories
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* User Info */}
        
      </div>
    </div>
  );
}
