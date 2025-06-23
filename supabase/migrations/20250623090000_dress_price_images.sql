-- Add dress price images table
CREATE TABLE IF NOT EXISTS dress_price_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dress_id uuid REFERENCES dresses(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  price decimal(10,2) NOT NULL,
  alt_text text,
  is_primary boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE dress_price_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view priced dress images" ON dress_price_images
  FOR SELECT USING (true);

CREATE POLICY "Owners and admins can manage priced dress images" ON dress_price_images
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('owner', 'admin')
    )
  );

-- Index for faster retrieval by dress
CREATE INDEX IF NOT EXISTS idx_dress_price_images_dress ON dress_price_images(dress_id);
