import Link from 'next/link'
import { Crown, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Crown className="h-8 w-8 text-primary" />
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold text-primary">
                  Maria Badari
                </span>
                <span className="text-xs text-muted-foreground -mt-1">
                  HAUTE COUTURE
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Exquisite haute couture wedding and evening dresses for the most special occasions. 
              Where luxury meets artistry.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://www.instagram.com/mariabadarihautecouture/" 
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/collection" className="text-muted-foreground hover:text-primary transition-colors">
                  Collection
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services#rentals" className="text-muted-foreground hover:text-primary transition-colors">
                  Dress Rentals
                </Link>
              </li>
              <li>
                <Link href="/services#custom" className="text-muted-foreground hover:text-primary transition-colors">
                  Custom Design
                </Link>
              </li>
              <li>
                <Link href="/services#alterations" className="text-muted-foreground hover:text-primary transition-colors">
                  Alterations
                </Link>
              </li>
              <li>
                <Link href="/services#consultation" className="text-muted-foreground hover:text-primary transition-colors">
                  Personal Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">info@mariabadarihc.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  123 Fashion Avenue<br />
                  New York, NY 10001
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Maria Badari Haute Couture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}