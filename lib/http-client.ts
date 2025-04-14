export const httpClient = {
  get: (url: string) => fetch(url),
  post: (url: string, data: any) => fetch(url, { method: "POST", body: JSON.stringify(data) }),
  put: (url: string, data: any) => fetch(url, { method: "PUT", body: JSON.stringify(data) }),
  delete: (url: string) => fetch(url, { method: "DELETE" }),
};
