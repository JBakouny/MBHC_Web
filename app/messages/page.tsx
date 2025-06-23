"use client"

import { useState, useEffect, useCallback } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/lib/supabase/client'
import { Message, Profile } from '@/lib/types'
import { toast } from 'sonner'

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState<string>('')
  const [owner, setOwner] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchMessages = useCallback(
    async (uid: string) => {
      setLoading(true)
      const { data, error } = await supabase
        .from('messages')
        .select('*, sender:profiles!messages_sender_id_fkey(*), recipient:profiles!messages_recipient_id_fkey(*)')
        .or(`sender_id.eq.${uid},recipient_id.eq.${uid}`)
        .order('created_at', { ascending: false })

      if (error) {
        toast.error('Failed to load messages')
      } else {
        setMessages(data as any)
      }
      setLoading(false)
    },
    [supabase],
  )

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return
      setUserId(user.id)

      const { data: ownerProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'owner')
        .limit(1)
        .single()
      setOwner(ownerProfile)
      fetchMessages(user.id)
    }
    void init()
  }, [fetchMessages, supabase])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!owner) return
    if (!content.trim()) return

    const { error } = await supabase.from('messages').insert({
      sender_id: userId,
      recipient_id: owner.id,
      content,
    })

    if (error) {
      toast.error('Failed to send message')
    } else {
      toast.success('Message sent')
      setContent('')
      fetchMessages(userId)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-heading text-4xl font-bold mb-6">Messages</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <p className="text-muted-foreground">Loading messages...</p>
            ) : messages.length === 0 ? (
              <p className="text-muted-foreground">No messages yet.</p>
            ) : (
              messages.map((msg) => (
                <Card key={msg.id}>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      {msg.sender_id === userId ? 'You' : msg.sender?.full_name} → {msg.recipient_id === userId ? 'You' : msg.recipient?.full_name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line text-sm">{msg.content}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(msg.created_at).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>New Message</CardTitle>
              </CardHeader>
              <CardContent>
                {owner ? (
                  <form onSubmit={handleSend} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="message">Message to {owner.full_name}</Label>
                      <Textarea
                        id="message"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="min-h-[120px]"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                ) : (
                  <p className="text-sm text-muted-foreground">Owner account not found.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
