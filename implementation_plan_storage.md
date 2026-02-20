# Implementation Plan - Complaint Storage

The goal is to persist incident reports to the Supabase database.

## 1. Database Schema
The `reports` table should have the following structure:
- `id`: uuid (primary key)
- `created_at`: timestamptz (default: now())
- `reporter_id`: uuid (references auth.users.id)
- `platform`: text
- `category`: text
- `incident_description`: text
- `victim_details`: jsonb (alias, gender, age, relation)
- `suspect_info`: jsonb (name, handle)
- `evidence_filenames`: text[]
- `risk_score`: int (default: 0)
- `status`: text (default: 'new')

## 2. Frontend Changes
- **Step 1 (ComplaintStep1.tsx):** 
    - Capture `platform`, `category`, and `files`.
    - Save to `sessionStorage` under `report_step_1`.
- **Step 2 (ComplaintStep2.tsx):** 
    - Implement form state for `incident_description`, victim, and suspect info.
    - Save to `sessionStorage` under `report_step_2`.
- **Step 3 (AnalysisReview.tsx):**
    - Collect data from both `sessionStorage` keys.
    - Fetch authenticated `user_id` from `supabase.auth.getUser()`.
    - Insert into `reports` table.
    - Clear `sessionStorage` on success.
    - Navigate to `Success` page.

## 3. Verification
- Attempt a report submission and check for database insertion.
- Note: This assumes the `reports` table exists or will be created in Supabase.
