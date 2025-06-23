import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function OwnerDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-heading text-4xl font-bold mb-4">Owner Dashboard</h1>
        <p className="text-muted-foreground">Manage dresses, appointments and messages from this dashboard. Features under development.</p>
      </div>
      <Footer />
    </div>
  )
}
