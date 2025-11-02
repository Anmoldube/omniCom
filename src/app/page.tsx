import { redirect } from 'next/navigation'

export default function RootPage() {
  // Redirect to login as the default page
  redirect('/login')
}
