import merge from "lodash.merge";

export interface CacheConfig {
  enabled: boolean;
  ttl: number;
}

export interface CacheData {
  data: any;
  expires: number;
}

export class HttpClient {
  private cache: Map<string, CacheData> = new Map();
  private defaultCacheConfig: CacheConfig = {
    enabled: false,
    ttl: 1000 * 60 * 10, // 10 minutes
  };

  constructor(private baseUrl: string) {}

  async get<T>(url: string, cacheOptions?: CacheConfig) {
    const cacheConfig = merge(this.defaultCacheConfig, cacheOptions);

    if (cacheConfig.enabled) {
      const cachedData = this.cache.get(url);
      if (cachedData && cachedData.expires > Date.now()) {
        return cachedData.data as T;
      }
    }

    const response = await fetch(`${this.baseUrl}${url}`);
    const data = await response.json();
    this.cache.set(url, { data, expires: Date.now() + cacheConfig.ttl });
    return data as T;
  }

  async post<T>(url: string, data: any) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result as T;
  }

  async put<T>(url: string, data: any) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result as T;
  }

  async delete<T>(url: string) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "DELETE",
    });
    const result = await response.json();
    return result as T;
  }
}
