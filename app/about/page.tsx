import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-4 py-16 space-y-16">
        <div className="text-center space-y-4">
          <h1 className="font-heading text-5xl font-bold">About Us</h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Discover the story behind Maria Badari Haute Couture.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="font-heading text-3xl font-semibold">Our Story</h2>
            <p className="text-muted-foreground">
              Maria Badari founded her atelier with a passion for timeless elegance and impeccable craftsmanship. Today our collection showcases luxurious designs inspired by modern romance.
            </p>
            <p className="text-muted-foreground">
              Each dress is created with meticulous attention to detail, ensuring you feel extraordinary on your special day.
            </p>
          </div>
          <div className="relative h-80">
            <Image src="/MBHC_logo.jpeg" alt="Maria Badari" fill className="object-contain" />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
