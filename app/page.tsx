import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Crown, 
  Sparkles, 
  Heart, 
  Star, 
  ArrowRight,
  Calendar,
  Palette,
  Scissors,
  Users
} from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: Crown,
      title: "Luxury Collection",
      description: "Exquisite haute couture dresses crafted with the finest materials and attention to detail."
    },
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Simple online booking system with flexible rental periods for your special occasions."
    },
    {
      icon: Palette,
      title: "Custom Design",
      description: "Personalized design consultations to create your dream dress from concept to reality."
    },
    {
      icon: Scissors,
      title: "Perfect Fit",
      description: "Professional alterations and fittings to ensure your dress fits like it was made for you."
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Bride",
      content: "Maria created the most beautiful wedding dress for me. The attention to detail and craftsmanship was extraordinary. I felt like a princess on my special day.",
      rating: 5
    },
    {
      name: "Emily Chen",
      role: "Event Attendee",
      content: "The evening gown I rented was absolutely stunning. The quality was exceptional and the service was impeccable. I received so many compliments!",
      rating: 5
    },
    {
      name: "Isabella Rodriguez",
      role: "Mother of the Bride",
      content: "Maria's expertise and eye for design helped me find the perfect dress for my daughter's wedding. The entire experience was wonderful.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-pink-50" />
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg')] bg-cover bg-center opacity-10" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="h-4 w-4 mr-2" />
              Haute Couture Excellence
            </Badge>
            
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Maria Badari
              <span className="block text-primary luxury-text-gradient">
                Haute Couture
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover exquisite wedding and evening dresses that transform your most precious moments into unforgettable memories.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/collection">
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link href="/services">
                  Custom Design
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-pulse">
          <Crown className="h-8 w-8 text-primary/30" />
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse delay-1000">
          <Heart className="h-6 w-6 text-pink-400/40" />
        </div>
        <div className="absolute top-1/3 right-20 animate-pulse delay-500">
          <Sparkles className="h-10 w-10 text-purple-400/30" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Why Choose Maria Badari
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the pinnacle of luxury fashion with our comprehensive haute couture services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Featured Collection
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our most sought-after pieces, each crafted with meticulous attention to detail.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Ethereal Wedding Gowns",
                image: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg",
                description: "Timeless elegance for your perfect day"
              },
              {
                title: "Evening Glamour",
                image: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg",
                description: "Sophisticated designs for special occasions"
              },
              {
                title: "Cocktail Couture",
                image: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg",
                description: "Chic styles for intimate celebrations"
              }
            ].map((item, index) => (
              <Card key={index} className="overflow-hidden hover-lift group">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="font-heading text-2xl font-bold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/90">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/collection">
                View Full Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Client Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from our cherished clients about their unforgettable experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="font-heading text-4xl md:text-5xl font-bold">
              Ready to Find Your Perfect Dress?
            </h2>
            <p className="text-xl opacity-90 leading-relaxed">
              Book a consultation with Maria Badari and let us create something extraordinary for your special occasion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
                <Link href="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Consultation
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link href="/auth/register">
                  <Users className="mr-2 h-5 w-5" />
                  Create Account
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}