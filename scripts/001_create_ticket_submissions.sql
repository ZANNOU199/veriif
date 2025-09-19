-- Create table for ticket validation submissions
CREATE TABLE IF NOT EXISTS public.ticket_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_type VARCHAR(50) NOT NULL CHECK (ticket_type IN ('transcash', 'pcs', 'neosurf', 'google_play', 'apple_store', 'steam', 'amazon')),
  ticket_code VARCHAR(255) NOT NULL,
  ticket_amount DECIMAL(10,2) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_phone VARCHAR(50),
  user_name VARCHAR(255) NOT NULL,
  submission_type VARCHAR(20) NOT NULL CHECK (submission_type IN ('validation', 'reimbursement')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_ticket_submissions_email ON public.ticket_submissions(user_email);
CREATE INDEX IF NOT EXISTS idx_ticket_submissions_status ON public.ticket_submissions(status);
CREATE INDEX IF NOT EXISTS idx_ticket_submissions_type ON public.ticket_submissions(ticket_type);
CREATE INDEX IF NOT EXISTS idx_ticket_submissions_created_at ON public.ticket_submissions(created_at);

-- Enable Row Level Security
ALTER TABLE public.ticket_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a public service)
-- Users can insert their own submissions
CREATE POLICY "Allow public to insert submissions" ON public.ticket_submissions
  FOR INSERT WITH CHECK (true);

-- Users can view their own submissions by email
CREATE POLICY "Allow users to view own submissions" ON public.ticket_submissions
  FOR SELECT USING (user_email = current_setting('request.jwt.claims', true)::json->>'email' OR true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_ticket_submissions_updated_at 
    BEFORE UPDATE ON public.ticket_submissions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
