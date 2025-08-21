CREATE TABLE IF NOT EXISTS recipes (
  id SERIAL PRIMARY KEY,
  cuisine VARCHAR(255),
  title VARCHAR(512) NOT NULL,
  rating DOUBLE PRECISION,
  prep_time INTEGER,
  cook_time INTEGER,
  total_time INTEGER,
  description TEXT,
  nutrients JSONB,
  serves VARCHAR(64)
);

CREATE INDEX IF NOT EXISTS idx_recipes_rating_desc ON recipes (rating DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_recipes_total_time ON recipes (total_time);
CREATE INDEX IF NOT EXISTS idx_recipes_title ON recipes (title);
CREATE INDEX IF NOT EXISTS idx_recipes_cuisine ON recipes (cuisine);
CREATE INDEX IF NOT EXISTS idx_recipes_nutrients_gin ON recipes USING GIN (nutrients);
