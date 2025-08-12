import jwt from 'jsonwebtoken'

export function getUserIdFromToken(token) {
  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded.userId
  } catch (error) {
    console.error('Token verification failed:', error.message)
    return null
  }
}
