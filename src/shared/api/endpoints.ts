export const endpoints = {
  auth: {
    login: "/auth/login",
    me: "/auth/me",
  },
  universities: {
    list: "/universities",
    create: "/universities",
    byId: (id: string) => `/universities/${id}`,
  },
};