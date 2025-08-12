// utils/getUserIdFromClientCookie.js
export function getUserIdFromCookie() {
  if (typeof document === 'undefined') return null

  const match = document.cookie.match(/userId=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : null
}
