import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import { Phone, Mail, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-4 py-16 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="font-heading text-5xl font-bold">Contact Us</h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            We would love to hear from you. Reach out with any questions or requests.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4 text-lg">
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-primary" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-primary" />
              <span>info@mariabadari.com</span>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Already have an account? Send us a direct message.
            </p>
            <Button asChild>
              <Link href="/messages">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
