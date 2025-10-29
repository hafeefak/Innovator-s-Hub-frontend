// src/Services/EntrepreneurServices.js
import api from "../api/axios";

export const entrepreneurService = {
  // ✅ Create new idea
  createIdea: (ideaData) => {
    const token = localStorage.getItem("token");
    return api.post("/api/Entrepreneur/create-idea", ideaData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },

  // ✅ Get all ideas created by entrepreneur
  getMyIdeas: () => {
    const token = localStorage.getItem("token");
    return api.get("/api/Entrepreneur/my-ideas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ✅ Update idea
  updateIdea: (id, ideaData) => {
    const token = localStorage.getItem("token");
    return api.put(`/api/Entrepreneur/update-idea/${id}`, ideaData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },

  // ✅ Delete idea
  deleteIdea: (id) => {
    const token = localStorage.getItem("token");
    return api.delete(`/api/Entrepreneur/delete-idea/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ✅ Send chat message
  sendMessage: (messageData) => {
    const token = localStorage.getItem("token");
    return api.post("/api/Entrepreneur/message", messageData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
};
