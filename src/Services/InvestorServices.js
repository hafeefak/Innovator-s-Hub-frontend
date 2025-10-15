// src/services/investorService.js
import api from "../api/axios";

export const investorService = {
  // Get all ideas for investors
  getAllIdeas: () => api.get('/api/Investor/ideas'),
  
  // Get specific idea by ID
  getIdeaById: (id) => api.get(`/api/Investor/ideas/${id}`),
  
  // Get liked ideas
  getLikedIdeas: () => api.get('/api/Investor/ideas/liked'),
  
  // Get saved ideas
  getSavedIdeas: () => api.get('/api/Investor/ideas/saved'),
  
  // Search ideas by category
  searchIdeasByCategory: (category) => api.get(`/api/Investor/ideas/search?category=${encodeURIComponent(category)}`),
  
  // Like an idea
  likeIdea: (ideaId) => api.post('/api/Investor/ideas/like', { ideaId }),
  
  // Unlike an idea
  unlikeIdea: (ideaId) => api.post('/api/Investor/ideas/unlike', { ideaId }),
  
  // Save an idea
  saveIdea: (ideaId) => api.post('/api/Investor/ideas/save', { ideaId }),
  
  // Unsave an idea
  unsaveIdea: (ideaId) => api.post('/api/Investor/ideas/unsave', { ideaId }),
  
  // Send message to entrepreneur
  sendMessage: (messageData) => api.post('/api/Investor/message', messageData),
  
  // Get messages with specific entrepreneur
  getMessages: (otherUserId) => api.get(`/api/Investor/messages/${otherUserId}`)
};