export function validateName(name: string) {
  return decodeURIComponent(name).replace(/%20/g, " ");
}