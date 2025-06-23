"use client"

import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { createClient } from '@/lib/supabase/client'
import { Profile } from '@/lib/types'

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      setProfile(data as Profile)
      setLoading(false)
    }
    void loadProfile()
  }, [supabase])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-heading text-4xl font-bold mb-6">My Profile</h1>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : profile ? (
          <div className="space-y-2">
            <p><span className="font-medium">Full Name:</span> {profile.full_name}</p>
            <p><span className="font-medium">Email:</span> {profile.email}</p>
            {profile.phone && (
              <p><span className="font-medium">Phone:</span> {profile.phone}</p>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground">Profile not found.</p>
        )}
      </div>
      <Footer />
    </div>
  )
}
