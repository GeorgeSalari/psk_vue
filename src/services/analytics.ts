import ahoy from "ahoy.js";

const API_BASE_URL =
  process.env.VUE_APP_API_URL || "http://localhost:3001";

ahoy.configure({
  visitsUrl: `${API_BASE_URL}/ahoy/visits`,
  eventsUrl: `${API_BASE_URL}/ahoy/events`,
  cookies: false,
  trackVisits: true,
  visitDuration: 30,
  withCredentials: false,
});

export function trackView(page: string): void {
  ahoy.trackView({ page });
}

export function trackClick(name: string, properties: Record<string, string> = {}): void {
  ahoy.track(name, properties);
}

export default ahoy;
