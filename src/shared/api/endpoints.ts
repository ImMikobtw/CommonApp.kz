export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
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
};