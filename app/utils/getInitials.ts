export function getInitials(name: string): string {
  if (!name || typeof name !== "string") return "P";

  // Clean out common titles (Principal, Teacher, Dr, Mr, Mrs, Ms, Prof)
  const cleanedName = name
    .replace(/^(principal|teacher|dr\.?|mr\.?|mrs\.?|ms\.?|prof\.?)\s+/i, "")
    .trim();

  const parts = cleanedName.split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "P";

  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  // First letter of first name + First letter of last name
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
