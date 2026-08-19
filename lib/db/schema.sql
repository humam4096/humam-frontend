-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  industry TEXT,
  service TEXT,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'contacted', 'resolved')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster queries by email and status
CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at DESC);
