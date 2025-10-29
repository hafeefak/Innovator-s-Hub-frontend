
import api from "../api/axios";

export const investorService = {

  getAllIdeas: () => api.get('/api/Investor/ideas'),
  

  getIdeaById: (id) => api.get(`/api/Investor/ideas/${id}`),
  
 
  getLikedIdeas: () => api.get('/api/Investor/ideas/liked'),
  
 
  getSavedIdeas: () => api.get('/api/Investor/ideas/saved'),
  
  
  searchIdeasByCategory: (category) => api.get(`/api/Investor/ideas/search?category=${encodeURIComponent(category)}`),
  

  likeIdea: (ideaId) => api.post('/api/Investor/ideas/like', { ideaId }),
  

  unlikeIdea: (ideaId) => api.post('/api/Investor/ideas/unlike', { ideaId }),
 
  saveIdea: (ideaId) => api.post('/api/Investor/ideas/save', { ideaId }),
  
  unsaveIdea: (ideaId) => api.post('/api/Investor/ideas/unsave', { ideaId }),

  sendMessage: (messageData) => api.post('/api/Investor/message', messageData),
  
  
  getMessages: (otherUserId) => api.get(`/api/Investor/messages/${otherUserId}`)
};