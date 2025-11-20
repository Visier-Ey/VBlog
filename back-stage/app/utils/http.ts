type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// 检查是否是浏览器环境
const isBrowser = typeof window !== "undefined" && typeof window.localStorage !== "undefined";

let _token: string | null = isBrowser ? localStorage.getItem("token") : null;

interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  signal?: AbortSignal;
}

interface HttpError extends Error {
  status?: number;
  data?: any;
}

export async function http<T = any>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", headers = {}, body, signal } = options;

  const finalHeaders: Record<string, string> = { ...headers };

  // 自动附加 token
  if (_token) {
    finalHeaders["Authorization"] = `Bearer ${_token}`;
  }

  const fetchOptions: RequestInit = {
    method,
    signal,
    headers: finalHeaders,
  };

  if (body instanceof FormData) {
    fetchOptions.body = body;
  } else if (body) {
    finalHeaders["Content-Type"] = "application/json";
    fetchOptions.body = JSON.stringify(body);
  }

  const res = await fetch(url, fetchOptions);
  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json()
    : await res.text();

  if (!res.ok) {
    throw Object.assign(new Error(res.statusText), {
      status: res.status,
      data,
    });
  }

  return data as T;
}

// GET
export function get<T = any>(
  url: string,
  headers?: Record<string, string>,
  signal?: AbortSignal
) {
  return http<T>(url, { method: "GET", headers, signal });
}

// POST
export function post<T = any>(
  url: string,
  body?: any,
  headers?: Record<string, string>,
  signal?: AbortSignal
) {
  return http<T>(url, { method: "POST", body, headers, signal });
}

// PUT
export function put<T = any>(
  url: string,
  body?: any,
  headers?: Record<string, string>,
  signal?: AbortSignal
) {
  return http<T>(url, { method: "PUT", body, headers, signal });
}

// DELETE
export function del<T = any>(
  url: string,
  headers?: Record<string, string>,
  signal?: AbortSignal
) {
  return http<T>(url, { method: "DELETE", headers, signal });
}

// 设置 token（自动写 localStorage）
export function setToken(token: string) {
  _token = token;
  if (isBrowser) {
    localStorage.setItem("token", token);
  }
}

// 清除 token
export function clearToken() {
  _token = null;
  if (isBrowser) {
    localStorage.removeItem("token");
  }
}
