"use client"
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { Comment } from '@/lib/types'
import { toast } from 'sonner'

export default function OwnerCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([])
  const supabase = createClient()

  const fetchComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select('*, client:profiles!comments_client_id_fkey(full_name)')
      .eq('approved', false)
      .order('created_at')
    setComments((data as any) || [])
  }

  useEffect(() => {
    fetchComments()
  }, [])

  const handleApprove = async (id: string) => {
    const { error } = await supabase
      .from('comments')
      .update({ approved: true })
      .eq('id', id)
    if (error) {
      toast.error('Failed to approve')
    } else {
      toast.success('Comment approved')
      fetchComments()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-6">
        <h1 className="font-heading text-4xl font-bold">Pending Comments</h1>
        {comments.length === 0 ? (
          <p className="text-muted-foreground">No comments awaiting approval.</p>
        ) : (
          comments.map((c) => (
            <Card key={c.id}>
              <CardHeader>
                <CardTitle>{c.client?.full_name || 'Anonymous'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="whitespace-pre-line">{c.content}</p>
                <p className="text-sm text-muted-foreground">Rating: {c.rating}</p>
                <Button onClick={() => handleApprove(c.id)}>Approve</Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      <Footer />
    </div>
  )
}
