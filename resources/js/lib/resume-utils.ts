export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  if (!year) return "";
  if (!month) return year;
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function formatDateRange(
  startDate: string,
  endDate: string,
  current: boolean,
): string {
  const start = formatDate(startDate);
  if (!start) return "";
  const end = current ? "Present" : formatDate(endDate) || "Present";
  return `${start} – ${end}`;
}
