// src/components/Investor/IdeaCard.js
import React, { useState } from 'react';

export default function IdeaCard({ idea, onLike, onSave, onChat }) {
  const [imageError, setImageError] = useState(false);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Technology': 'bg-blue-100 text-blue-800',
      'Healthcare': 'bg-green-100 text-green-800',
      'Education': 'bg-purple-100 text-purple-800',
      'Finance': 'bg-yellow-100 text-yellow-800',
      'Sustainability': 'bg-emerald-100 text-emerald-800',
      'E-commerce': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
      {/* Image */}
      <div className="h-48 bg-gray-200 relative">
        {idea.imageUrl && !imageError ? (
          <img
            src={idea.imageUrl}
            alt={idea.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-4xl">💡</span>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(idea.category)}`}>
            {idea.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">
            {idea.title}
          </h3>
          <div className="flex space-x-1">
            <button
              onClick={() => onLike(idea.id)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                idea.isLiked 
                  ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill={idea.isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button
              onClick={() => onSave(idea.id)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                idea.isSaved 
                  ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100' 
                  : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill={idea.isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {idea.description}
        </p>

        {/* Stats */}
        

        {/* Entrepreneur Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
              {idea.entrepreneur?.name?.charAt(0) || 'E'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {idea.entrepreneur?.name || 'Entrepreneur'}
              </p>
              <p className="text-xs text-gray-500">Entrepreneur</p>
            </div>
          </div>
          <button
            onClick={() => onChat(idea.entrepreneur)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Chat
          </button>
        </div>
      </div>
    </div>
  );
}