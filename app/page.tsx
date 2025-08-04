import { redirect } from 'next/navigation'

export default function HomePage() {
  // When someone visits "/", redirect them to "/dashboard"
  redirect('/dashboard')
}