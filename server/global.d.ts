interface Visit {
  countries?: Record<string, number>;
  created_at?: Date;
  referrers?: Record<string, number>;
  total_visit_count: 0;
  visit_count_chrome: 0;
  visit_count_edge: 0;
  visit_count_firefox: 0;
  visit_count_ie: 0;
  // visit_count_opera: 0;
  visit_count_other: 0;
  visit_count_safari: 0;
  os_android: 0;
  os_ios: 0;
  os_linux: 0;
  os_macos: 0;
  os_other: 0;
  os_windows: 0;
}
interface Link extends Visit {
  address: string;
  short_url: string;
  description?: string;
  expire_in?: string;
  target: string;
  visit_count: number;
}

interface Stats {
  browser: Record<"chrome" | "edge" | "firefox" | "ie" | "opera" | "other" | "safari", number>;
  os: Record<"android" | "ios" | "linux" | "macos" | "other" | "windows", number>;
  country: Record<string, number>;
  referrer: Record<string, number>;
}
