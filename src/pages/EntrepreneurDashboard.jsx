// src/pages/EntrepreneurDashboard.jsx
import React, { useState, useEffect } from "react";
import { entrepreneurService } from "../Services/EntrepreneurServices";
import EntrepreneurSidebar from "../Components/Enterpreneur/EntrepreneurSidebar";
import IdeaCard from "../Components/Enterpreneur/IdeaCard";
import ChatModal from "../Components/Enterpreneur/ChatModal";

export default function EntrepreneurDashboard() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("EntrepreneurDashboard mounted ✅");
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    try {
      setError("");
      const res = await entrepreneurService.getMyIdeas();
      console.log("API Response:", res);
      if (res.data.success) {
        setIdeas(res.data.data);
        console.log("Loaded ideas:", res.data.data);
      } else {
        setError("Failed to load ideas");
      }
    } catch (err) {
      console.error("Error loading ideas:", err);
      const errorMessage = err.response?.data?.message || "Failed to load ideas";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateIdea = async (ideaData) => {
  try {
    setError("");
    console.log("Creating idea:", ideaData);

    // Validate data before sending
    if (!ideaData.Title?.trim() || !ideaData.Description?.trim()) {
      setError("Title and description are required");
      return;
    }

    // Send PascalCase keys (matching backend DTO)
    const payload = {
      Title: ideaData.Title,
      Description: ideaData.Description,
      Tags: ideaData.Tags || "",
      Category: ideaData.Category || "",
      Budget: ideaData.Budget || 0,
    };

    const res = await entrepreneurService.createIdea(payload);
    console.log("Create idea response:", res);

    if (res.data.success) {
      const newIdea = res.data.data;
      setIdeas((prevIdeas) => [newIdea, ...prevIdeas]);
      console.log("Idea created successfully:", newIdea);
      return true;
    } else {
      setError(res.data.message || "Failed to create idea");
      return false;
    }
  } catch (err) {
    console.error("Error creating idea:", err);
    console.error("Error details:", err.response);

    if (err.response?.status === 409) {
      setError("An idea with this title already exists. Please use a different title.");
    } else if (err.response?.status === 400) {
      setError("Invalid data. Please check your input and try again.");
    } else if (err.response?.status === 401) {
      setError("Please login again to create ideas.");
    } else if (err.response?.data?.message) {
      setError(err.response.data.message);
    } else {
      setError("Failed to create idea. Please try again.");
    }
    return false;
  }
};


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this idea?")) return;
    try {
      setError("");
      await entrepreneurService.deleteIdea(id);
      setIdeas(ideas.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Error deleting idea:", err);
      setError("Failed to delete idea");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      console.log("Logging out...");
      // Add your logout logic here
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">💡</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Innovater's Hub
                </h1>
                <p className="text-sm text-slate-500">Turn ideas into reality</p>
              </div>
            </div>
            
            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 bg-white/80 hover:bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-semibold text-sm">E</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-800">Entrepreneur</p>
                  <p className="text-xs text-slate-500">Welcome back!</p>
                </div>
                <svg className={`w-4 h-4 text-slate-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

{showProfileMenu && (
  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
    <button
      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
      onClick={handleLogout} // ✅ call function here
    >
      Logout
    </button>
  </div>
)}

            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Alert */}


        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Create Idea */}
          <div className="lg:w-96 flex-shrink-0">
            <EntrepreneurSidebar onCreateIdea={handleCreateIdea} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white mb-8 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-3">Welcome back, Innovator! 🚀</h2>
                  <p className="text-blue-100 text-lg opacity-90 max-w-2xl">
                    Ready to bring your next big idea to life? Create, share, and connect with potential investors who believe in your vision.
                  </p>
                </div>
                <div className="hidden lg:block">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-4xl">💡</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ideas Section */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Your Ideas</h2>
                  <p className="text-slate-600 mt-1">Manage and track all your innovative concepts</p>
                </div>
               
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 animate-pulse">
                      <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                      <div className="space-y-2 mb-4">
                        <div className="h-4 bg-slate-200 rounded w-full"></div>
                        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                        <div className="h-4 bg-slate-200 rounded w-4/6"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="h-8 bg-slate-200 rounded w-20"></div>
                        <div className="flex space-x-2">
                          <div className="h-8 w-8 bg-slate-200 rounded"></div>
                          <div className="h-8 w-8 bg-slate-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : ideas.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <span className="text-6xl">💡</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-800 mb-3">No ideas yet</h3>
                  <p className="text-slate-600 mb-8 max-w-md mx-auto">
                    Start by creating your first innovative idea. Click the "Create New Idea" button to get started!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                  {ideas.map((idea) => (
                    <IdeaCard
                      key={idea.id}
                      idea={idea}
                      onDelete={handleDelete}
                      onChat={() => {
                        setSelectedIdea(idea);
                        setShowChat(true);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showChat && selectedIdea && (
        <ChatModal
          idea={selectedIdea}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
}