export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register-admin",
    me: "/auth/me",
    refresh: "/auth/refresh",
  },
  universities: {
    list: "/universities",
    create: "/universities",
    byId: (id: string | number) => `/universities/${id}`,
  },
  specialties: {
    list: "/specialties",
    create: "/specialties",
    byId: (id: string | number) => `/specialties/${id}`,
  },
  programs: {
    list: "/programs",
    create: "/programs",
    byId: (id: string | number) => `/programs/${id}`,
  },
  dashboard: {
    stats: "/dashboard/stats",
  },
  documents: {
    list: "/documents",
    upload: "/documents/upload",
  },
  users: {
    list: "/users",
    create: "/users",
    byId: (id: string | number) => `/users/${id}`,
  },
  suggestions: {
    list: "/suggestions",
    approve: (id: string | number) => `/suggestions/${id}/approve`,
    reject: (id: string | number) => `/suggestions/${id}/reject`,
  },
  parseSessions: {
    list: "/parse-sessions",
    trigger: (docId: string | number) => `/parse-sessions/trigger/${docId}`,
  },
  knowledgeBase: {
    list: "/knowledge-base",
    create: "/knowledge-base",
    byId: (id: string | number) => `/knowledge-base/${id}`,
    embed: (id: string | number) => `/knowledge-base/${id}/embed`,
  },
};