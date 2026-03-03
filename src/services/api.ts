const API_BASE_URL =
  process.env.VUE_APP_API_URL || "http://localhost:3001";

interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function get<T = unknown>(
  path: string
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "GET",
      headers: { ...authHeaders() },
    });
    const data = await response.json();
    if (!response.ok) {
      return { ok: false, error: data.error || data.errors?.join(", ") || "Request failed" };
    }
    return { ok: true, data };
  } catch {
    return { ok: false, error: "Network error" };
  }
}

export async function post<T = unknown>(
  path: string,
  body: Record<string, unknown> | FormData
): Promise<ApiResponse<T>> {
  try {
    const isFormData = body instanceof FormData;
    const headers: Record<string, string> = {
      ...authHeaders(),
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    };
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers,
      body: isFormData ? body : JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) {
      return { ok: false, error: data.error || data.errors?.join(", ") || "Request failed" };
    }
    return { ok: true, data };
  } catch {
    return { ok: false, error: "Network error" };
  }
}

export async function put<T = unknown>(
  path: string,
  body: Record<string, unknown> | FormData
): Promise<ApiResponse<T>> {
  try {
    const isFormData = body instanceof FormData;
    const headers: Record<string, string> = {
      ...authHeaders(),
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    };
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "PUT",
      headers,
      body: isFormData ? body : JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) {
      return { ok: false, error: data.error || data.errors?.join(", ") || "Request failed" };
    }
    return { ok: true, data };
  } catch {
    return { ok: false, error: "Network error" };
  }
}

export async function del<T = unknown>(
  path: string
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "DELETE",
      headers: { ...authHeaders() },
    });
    if (response.status === 204) {
      return { ok: true };
    }
    const data = await response.json();
    if (!response.ok) {
      return { ok: false, error: data.error || data.errors?.join(", ") || "Request failed" };
    }
    return { ok: true, data };
  } catch {
    return { ok: false, error: "Network error" };
  }
}
