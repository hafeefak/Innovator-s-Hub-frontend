import React, { useState } from "react";

export default function EntrepreneurSidebar({ onCreateIdea }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: "",
    category: "",
    budget: "",
  });

  const [isCreating, setIsCreating] = useState(false);
  const [localError, setLocalError] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (localError) setLocalError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!form.title.trim() || !form.description.trim()) {
      setLocalError("Title and Description are required.");
      return;
    }

    setIsCreating(true);

    try {
      // ✅ Convert to PascalCase to match backend DTO
      const ideaData = {
        Title: form.title.trim(),
        Description: form.description.trim(),
        Tags: form.tags.trim() || "General",
        Category: form.category.trim() || "Startup",
        Budget: form.budget ? parseFloat(form.budget) : 0,
      };

      const success = await onCreateIdea(ideaData);

      if (success) {
        // ✅ Clear form after success
        setForm({
          title: "",
          description: "",
          tags: "",
          category: "",
          budget: "",
        });
      }
    } catch (error) {
      console.error("Error creating idea:", error);
      setLocalError("Something went wrong. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const categories = [
    "Technology",
    "Healthcare",
    "Education",
    "Finance",
    "Entertainment",
    "Other"
  ];

  return (
    <div className="w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/60 p-8 hover:shadow-2xl transition-all duration-500">
      {/* Header with Toggle */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-xl">✨</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Create Idea
            </h2>
            <p className="text-slate-500 text-sm mt-1">Bring your vision to life</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-all duration-300 flex items-center justify-center group"
        >
          <svg 
            className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-300">
          {/* Title */}
          <div className="group">
            <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Title <span className="text-red-400 ml-1">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="What's your groundbreaking idea?"
              className="w-full px-4 py-4 bg-slate-50/80 border border-slate-300/80 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300 placeholder-slate-400 text-slate-700 font-medium shadow-sm"
              disabled={isCreating}
            />
          </div>

          {/* Description */}
          <div className="group">
            <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Description <span className="text-red-400 ml-1">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your vision, the problem you're solving, and why it's unique..."
              rows="4"
              className="w-full px-4 py-4 bg-slate-50/80 border border-slate-300/80 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300 placeholder-slate-400 text-slate-700 resize-none shadow-sm"
              disabled={isCreating}
            />
          </div>

          {/* Tags and Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tags */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="AI, FinTech, SaaS..."
                className="w-full px-4 py-4 bg-slate-50/80 border border-slate-300/80 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300 placeholder-slate-400 text-slate-700 shadow-sm"
                disabled={isCreating}
              />
            </div>

            {/* Category */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-slate-50/80 border border-slate-300/80 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300 text-slate-700 appearance-none shadow-sm cursor-pointer"
                disabled={isCreating}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Budget */}
          <div className="group">
            <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Estimated Budget
            </label>
            <div className="relative">
             
              <input
                type="number"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                
                className="w-full pl-10 pr-4 py-4 bg-slate-50/80 border border-slate-300/80 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300 placeholder-slate-400 text-slate-700 shadow-sm"
                disabled={isCreating}
              />
            </div>
          </div>

          {/* Error Message */}
          {localError && (
            <div className="bg-red-50/80 border border-red-200 rounded-2xl p-4 animate-in fade-in duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-red-700 text-sm font-medium">{localError}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isCreating || !form.title.trim() || !form.description.trim()}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-sm disabled:cursor-not-allowed transform hover:scale-[1.02] disabled:scale-100 flex items-center justify-center space-x-3 group"
          >
            {isCreating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Your Idea...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Create Idea</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Collapsed State */}
      {!isExpanded && (
        <div className="text-center py-8 animate-in fade-in duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💡</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Ready to Create?</h3>
          <p className="text-slate-500 text-sm">Expand to start building your next big idea</p>
          <button
            onClick={() => setIsExpanded(true)}
            className="mt-4 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors duration-300"
          >
            Expand Form
          </button>
        </div>
      )}

      {/* Quick Tips */}
      
    </div>
  );
}