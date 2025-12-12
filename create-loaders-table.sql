-- Create loaders table for managing loading screen animations
CREATE TABLE IF NOT EXISTS loaders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  css_code TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  display_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Insert the current loader as the default
INSERT INTO loaders (name, description, css_code, is_active, display_order)
VALUES (
  'Psychedelic Current',
  'Current loader with grain, particles, hexagons, energy waves, and glitch effects',
  'current',
  true,
  1
)
ON CONFLICT (name) DO NOTHING;
