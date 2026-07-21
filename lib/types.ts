export interface Business {
  id: string
  user_id: string
  business_name: string
  business_type: string | null
  business_description: string | null
  gbp_account_id: string | null
  gbp_location_id: string | null
  gbp_access_token: string | null
  gbp_refresh_token: string | null
  gbp_token_expires_at: string | null
  owner_phone: string | null
  owner_email: string | null
  tone_preferences: string
  past_responses: string[]
  notification_method: 'whatsapp' | 'email'
  active: boolean
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  business_id: string
  review_id: string
  rating: number
  review_text: string | null
  reviewer_name: string | null
  review_time: string | null
  language: string
  sentiment: string | null
  draft_reply: string | null
  final_reply: string | null
  flags: string[]
  status: 'pending_approval' | 'posted' | 'discarded' | 'error'
  edited_at: string | null
  posted_at: string | null
  discarded_at: string | null
  created_at: string
}

export type ReviewAction = 'approve' | 'edit_and_post' | 'edit_save' | 'discard'

export interface GBPLocation {
  name: string
  title: string
  accountId: string
  locationId: string
}

export interface UserProfile {
  id: string
  plan: 'solo' | 'growth'
  stripe_customer_id:     string | null
  stripe_subscription_id: string | null
}

export interface TeamMember {
  id: string
  owner_id: string
  member_email: string
  member_user_id: string | null
  role: string
  invited_at: string
  accepted_at: string | null
}
