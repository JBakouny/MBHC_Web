import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Image from 'next/image'

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-4 py-16 space-y-20">
        <div className="text-center space-y-4">
          <h1 className="font-heading text-5xl font-bold">Our Services</h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Discover the luxury experience of Maria Badari Haute Couture.
          </p>
        </div>

        <div id="custom" className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="font-heading text-3xl font-semibold">Custom Design</h2>
            <p className="text-muted-foreground">
              Work directly with Maria to create a one-of-a-kind dress tailored to your vision.
            </p>
          </div>
          <div className="relative h-80">
            <Image src="/Juliette_MBHC.jpg" alt="Custom Design" fill className="object-cover rounded" />
          </div>
        </div>

        <div id="rentals" className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-last md:order-first relative h-80">
            <Image src="/Background_MBHC.jpeg" alt="Dress Rentals" fill className="object-cover rounded" />
          </div>
          <div className="space-y-4">
            <h2 className="font-heading text-3xl font-semibold">Dress Rentals</h2>
            <p className="text-muted-foreground">
              Select from our exclusive collection for your special event.
            </p>
          </div>
        </div>

        <div id="alterations" className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="font-heading text-3xl font-semibold">Alterations</h2>
            <p className="text-muted-foreground">Perfect fit guaranteed for every dress.</p>
          </div>
          <div className="relative h-80">
            <Image src="/MBHC_logo.jpeg" alt="Alterations" fill className="object-cover rounded" />
          </div>
        </div>

        <div id="consultation" className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-last md:order-first relative h-80">
            <Image src="/Juliette_MBHC.jpg" alt="Consultation" fill className="object-cover rounded" />
          </div>
          <div className="space-y-4">
            <h2 className="font-heading text-3xl font-semibold">Personal Consultation</h2>
            <p className="text-muted-foreground">Schedule a private session to discuss your ideas.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
