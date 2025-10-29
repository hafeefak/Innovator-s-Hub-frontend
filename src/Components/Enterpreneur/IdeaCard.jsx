// src/components/Entrepreneur/IdeaCard.jsx
import React from "react";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    active: { color: "bg-emerald-100 text-emerald-800 border-emerald-200", label: "Active", icon: "🟢" },
    funded: { color: "bg-blue-100 text-blue-800 border-blue-200", label: "Funded", icon: "💰" },
    draft: { color: "bg-amber-100 text-amber-800 border-amber-200", label: "Draft", icon: "📝" },
    pending: { color: "bg-purple-100 text-purple-800 border-purple-200", label: "Pending", icon: "⏳" }
  };

  const config = statusConfig[status] || statusConfig.draft;

  return (
    <span className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl text-xs font-semibold border ${config.color}`}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
};

export default function IdeaCard({ idea, onDelete, onChat }) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 hover:border-blue-200 transition-all duration-500 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {idea.title}
          </h3>
          
        </div>
        
        <p className="text-slate-600 leading-relaxed line-clamp-3 mb-6 text-sm">
          {idea.description}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
          <div className="flex items-center space-x-4">
            
          </div>
          <span className="flex items-center space-x-1 bg-slate-100 px-2 py-1 rounded-full">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>{idea.investors || 0} interested</span>
          </span>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <button
            onClick={() => onChat(idea)}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2.5 rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-sm hover:shadow-md font-medium text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Chat with Investors</span>
          </button>
          
          <div className="flex space-x-2">
            <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(idea.id)}
              className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}