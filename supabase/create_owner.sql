-- Create initial owner user account
-- Run this after the base schema is installed

insert into auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_sso_user
) values (
  uuid_generate_v4(),
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'owner@example.com',
  crypt('OwnerPass123!', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  false
);

insert into profiles (id, email, full_name, role)
select id, email, 'Owner User', 'owner'
from auth.users
where email = 'owner@example.com';
