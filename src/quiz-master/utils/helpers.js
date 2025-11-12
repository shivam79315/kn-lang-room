export function sanitizeInput(input = "") {
  return input.trim().toLowerCase();
}

export function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}