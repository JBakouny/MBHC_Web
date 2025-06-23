-- Add comments table for client testimonials
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  content text NOT NULL,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Policies
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view approved comments" ON comments
  FOR SELECT USING (approved = true);

CREATE POLICY "Clients can insert comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Owners and admins can approve comments" ON comments
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('owner','admin'))
  );
