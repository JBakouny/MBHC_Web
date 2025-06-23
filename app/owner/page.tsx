import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function OwnerDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-4">
        <h1 className="font-heading text-4xl font-bold mb-4">Owner Dashboard</h1>
        <p className="text-muted-foreground">Manage site content and client feedback.</p>
        <ul className="list-disc ml-6 space-y-2">
          <li><a className="text-primary underline" href="/owner/add-dress">Add Dress to Collection</a></li>
          <li><a className="text-primary underline" href="/owner/comments">Approve Comments</a></li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}
