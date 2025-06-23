"use client"
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Search, Filter, Heart, Eye, Star } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Dress, Category, Color, Size, DressFilters } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'

const SUPABASE_ASSET_URL =
  'https://zrjthioylovvarhpelym.supabase.co/storage/v1/object/public/website-assets'

export default function CollectionPage() {
  const [dresses, setDresses] = useState<Dress[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [colors, setColors] = useState<Color[]>([])
  const [sizes, setSizes] = useState<Size[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<DressFilters>({
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    colors: [],
    sizes: [],
    available: true
  })
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState('name')
  
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchDresses()
  }, [filters, sortBy])

  const fetchData = async () => {
    try {
      const [categoriesRes, colorsRes, sizesRes] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase.from('colors').select('*').order('name'),
        supabase.from('sizes').select('*').order('name')
      ])

      if (categoriesRes.data) setCategories(categoriesRes.data)
      if (colorsRes.data) setColors(colorsRes.data)
      if (sizesRes.data) setSizes(sizesRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load filter options')
    }
  }

  const fetchDresses = async () => {
    setIsLoading(true)
    try {
      let query = supabase
        .from('dresses')
        .select(`
          *,
          category:categories(*),
          images:dress_images(*),
          colors:dress_colors(color:colors(*)),
          sizes:dress_sizes(size:sizes(*))
        `)

      // Apply filters
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
      }
      
      if (filters.category) {
        query = query.eq('category_id', filters.category)
      }
      
      if (filters.available !== undefined) {
        query = query.eq('available', filters.available)
      }
      
      query = query.gte('price_per_day', filters.minPrice || 0)
      query = query.lte('price_per_day', filters.maxPrice || 1000)

      // Apply sorting
      switch (sortBy) {
        case 'price_low':
          query = query.order('price_per_day', { ascending: true })
          break
        case 'price_high':
          query = query.order('price_per_day', { ascending: false })
          break
        case 'newest':
          query = query.order('created_at', { ascending: false })
          break
        default:
          query = query.order('name', { ascending: true })
      }

      const { data, error } = await query

      if (error) throw error

      // Filter by colors and sizes on client side (due to junction table complexity)
      let filteredData = data || []
      
      if (filters.colors && filters.colors.length > 0) {
        filteredData = filteredData.filter(dress => 
          dress.colors?.some((dc: any) => filters.colors?.includes(dc.color.id))
        )
      }
      
      if (filters.sizes && filters.sizes.length > 0) {
        filteredData = filteredData.filter(dress => 
          dress.sizes?.some((ds: any) => filters.sizes?.includes(ds.size.id))
        )
      }

      setDresses(filteredData)
    } catch (error) {
      console.error('Error fetching dresses:', error)
      toast.error('Failed to load dresses')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (key: keyof DressFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleColorToggle = (colorId: string) => {
    const currentColors = filters.colors || []
    const newColors = currentColors.includes(colorId)
      ? currentColors.filter(id => id !== colorId)
      : [...currentColors, colorId]
    handleFilterChange('colors', newColors)
  }

  const handleSizeToggle = (sizeId: string) => {
    const currentSizes = filters.sizes || []
    const newSizes = currentSizes.includes(sizeId)
      ? currentSizes.filter(id => id !== sizeId)
      : [...currentSizes, sizeId]
    handleFilterChange('sizes', newSizes)
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: 0,
      maxPrice: 1000,
      colors: [],
      sizes: [],
      available: true
    })
    setPriceRange([0, 1000])
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label>Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search dresses..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={filters.category || ''}
          onValueChange={(value) =>
            handleFilterChange('category', value === 'all' ? '' : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <Label>Price Range</Label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => {
              setPriceRange(value)
              handleFilterChange('minPrice', value[0])
              handleFilterChange('maxPrice', value[1])
            }}
            max={1000}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-2">
        <Label>Colors</Label>
        <div className="grid grid-cols-2 gap-2">
          {colors.map((color) => (
            <div key={color.id} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color.id}`}
                checked={filters.colors?.includes(color.id) || false}
                onCheckedChange={() => handleColorToggle(color.id)}
              />
              <Label htmlFor={`color-${color.id}`} className="text-sm flex items-center gap-2">
                {color.hex_code && (
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.hex_code }}
                  />
                )}
                {color.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-2">
        <Label>Sizes</Label>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <div key={size.id} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size.id}`}
                checked={filters.sizes?.includes(size.id) || false}
                onCheckedChange={() => handleSizeToggle(size.id)}
              />
              <Label htmlFor={`size-${size.id}`} className="text-sm">
                {size.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="available"
          checked={filters.available || false}
          onCheckedChange={(checked) => handleFilterChange('available', checked)}
        />
        <Label htmlFor="available">Available only</Label>
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full">
        Clear Filters
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Our Collection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover our exquisite selection of haute couture dresses, each piece crafted with meticulous attention to detail.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Filters</h3>
                <FilterContent />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filters & Sort */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your search to find the perfect dress
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Sort & Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {dresses.length} {dresses.length === 1 ? 'dress' : 'dresses'} found
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dress Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="aspect-[3/4] bg-muted animate-pulse" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                      <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : dresses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No dresses found matching your criteria.</p>
                <Button onClick={clearFilters} variant="outline" className="mt-4">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {dresses.map((dress) => (
                  <Card key={dress.id} className="overflow-hidden hover-lift group">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={dress.images?.[0]?.image_url || `${SUPABASE_ASSET_URL}/Juliette_MBHC.jpg`}
                        alt={dress.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 right-4">
                        <Button size="icon" variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button asChild className="w-full">
                          <Link href={`/collection/${dress.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </Button>
                      </div>
                      {!dress.available && (
                        <div className="absolute top-4 left-4">
                          <Badge variant="destructive">Unavailable</Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg line-clamp-1">{dress.name}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {dress.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg">${dress.price_per_day}</span>
                            <span className="text-muted-foreground text-sm">/day</span>
                          </div>
                          {dress.category && (
                            <Badge variant="secondary">{dress.category.name}</Badge>
                          )}
                        </div>
                        {dress.colors && dress.colors.length > 0 && (
                          <div className="flex items-center gap-1">
                            {dress.colors.slice(0, 4).map((dc: any) => (
                              <div
                                key={dc.color.id}
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: dc.color.hex_code }}
                                title={dc.color.name}
                              />
                            ))}
                            {dress.colors.length > 4 && (
                              <span className="text-xs text-muted-foreground ml-1">
                                +{dress.colors.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}