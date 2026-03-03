const API_BASE_URL =
  process.env.VUE_APP_API_URL || "http://localhost:3001";

interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

export async function post<T = unknown>(
  path: string,
  body: Record<string, unknown>
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return { ok: false, error: data.error || "Request failed" };
    }

    return { ok: true, data };
  } catch {
    return { ok: false, error: "Network error" };
  }
}
