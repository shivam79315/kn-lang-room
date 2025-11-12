// src/utils/helpers.js
export function sanitizeCommand(input = "") {
  // trim, collapse multiple spaces, and lower-case
  return input.trim().replace(/\s+/g, " ").toLowerCase();
}