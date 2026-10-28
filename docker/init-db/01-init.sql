-- Inisialisasi Database Portofolio Reyhan Albar
-- File ini otomatis dieksekusi saat container postgres pertama kali dibuat

CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_analytics (
    id SERIAL PRIMARY KEY,
    page_path VARCHAR(255) NOT NULL,
    user_agent TEXT,
    ip_hash VARCHAR(64),
    visited_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexing untuk query cepat
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_path ON site_analytics(page_path);
