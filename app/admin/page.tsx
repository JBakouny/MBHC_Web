import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-heading text-4xl font-bold mb-4">Admin Panel</h1>
        <p className="text-muted-foreground">System administration tools will be available here. Features under development.</p>
      </div>
      <Footer />
    </div>
  )
}
