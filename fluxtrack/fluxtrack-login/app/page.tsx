import { redirect } from 'next/navigation'

/**
 * Root page — redirects to /login
 * In production, add auth check here before redirecting.
 */
export default function Home() {
  redirect('/login')
}
