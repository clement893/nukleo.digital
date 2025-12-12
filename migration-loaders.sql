-- Migration script for loaders table on Railway PostgreSQL
-- Execute this in Railway Dashboard → Database → Query

-- Create loaders table
CREATE TABLE IF NOT EXISTS loaders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  css_code TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  display_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Insert default loader
INSERT INTO loaders (name, description, css_code, is_active, display_order)
VALUES (
  'Psychedelic Crazy Arts',
  'Loader psychédélique avec effets visuels avancés, particules flottantes, hexagones rotatifs et ondes d''énergie',
  'psychedelic-crazy-arts',
  TRUE,
  1
)
ON CONFLICT (name) DO NOTHING;

-- Verify insertion
SELECT * FROM loaders;
