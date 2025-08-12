import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies() // ✅ Await here
  const token = cookieStore.get('token')?.value

  if (!token) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  // Optionally decode the token here to get user info
  return Response.json({ message: 'Authorized', token })
}
