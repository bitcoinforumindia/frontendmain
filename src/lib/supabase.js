// Supabase configuration
// Fail fast if env vars are missing in production to surface clear error to users
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Import Supabase client
import { createClient } from '@supabase/supabase-js';
import { emailService } from './emailService';

// Create Supabase client (only if credentials are available)
export const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// Warn in development if Supabase is not configured
if (!supabase && import.meta.env.DEV) {
  console.warn('⚠️ Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env file to enable database features.');
}

// Database helper functions
export const dbHelpers = {
  // Contact queries
  async submitContactQuery(data) {
    if (!supabase) {
      console.error('Supabase not configured. Cannot submit contact query.');
      throw new Error('Database not configured. Please contact the administrator.');
    }

    const { data: result, error } = await supabase
      .from('contact_queries')
      .insert([{
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        phone: data.phone || null,
        created_at: new Date().toISOString()
      }]);

    if (error) throw error;

    // Send email notification
    try {
      await emailService.sendContactEmail(data);
    } catch (emailError) {
      console.warn('Failed to send email notification:', emailError);
      // Don't throw error - database submission was successful
    }

    return result;
  },

  // Student/Volunteer form
  async submitStudentVolunteer(data) {
    if (!supabase) throw new Error('Database not configured. Please contact the administrator.');
    const { data: result, error } = await supabase
      .from('student_volunteer_queries')
      .insert([{
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        university: (data.city ? `${data.university} - ${data.city}` : data.university) || null,
        role_interest: data.roleInterest || null,
        availability: data.availability || null,
        message: data.message,
        status: 'pending',
        created_at: new Date().toISOString()
      }]);
    if (error) throw error;

    // Send email notification
    try {
      await emailService.sendStudentVolunteerEmail(data);
    } catch (emailError) {
      console.warn('Failed to send email notification:', emailError);
      // Don't throw error - database submission was successful
    }

    return result;
  },

  // Media & Partnerships form
  async submitMediaPartnership(data) {
    if (!supabase) throw new Error('Database not configured. Please contact the administrator.');
    const { data: result, error } = await supabase
      .from('media_partnership_queries')
      .insert([{
        name: data.name,
        email: data.email,
        organization: data.organization || null,
        website: data.website || null,
        partnership_type: data.partnershipType || null,
        phone: data.phone || null,
        message: data.message,
        status: 'pending',
        created_at: new Date().toISOString()
      }]);
    if (error) throw error;

    // Send email notification
    try {
      await emailService.sendMediaPartnershipEmail(data);
    } catch (emailError) {
      console.warn('Failed to send email notification:', emailError);
      // Don't throw error - database submission was successful
    }

    return result;
  },

  // Speaker applications
  async submitSpeakerApplication(data) {
    if (!supabase) {
      console.error('Supabase not configured. Cannot submit speaker application.');
      throw new Error('Database not configured. Please contact the administrator.');
    }

    const { data: result, error } = await supabase
      .from('speaker_applications')
      .insert([{
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        job_title: data.jobTitle || null,
        bio: data.bio,
        topic_title: data.topicTitle,
        topic_abstract: data.topicAbstract,
        linkedin: data.linkedin || null,
        telegram: data.telegram || null,
        website: data.website || null,
        status: 'pending',
        created_at: new Date().toISOString()
      }]);

    if (error) throw error;

    // Send email notification
    try {
      await emailService.sendSpeakerApplicationEmail(data);
    } catch (emailError) {
      console.warn('Failed to send email notification:', emailError);
      // Don't throw error - database submission was successful
    }

    return result;
  },

  // Sponsorship inquiries
  async submitSponsorshipInquiry(data) {
    if (!supabase) {
      console.error('Supabase not configured. Cannot submit sponsorship inquiry.');
      throw new Error('Database not configured. Please contact the administrator.');
    }

    const { data: result, error } = await supabase
      .from('sponsorship_inquiries')
      .insert([{
        company_name: data.companyName,
        contact_name: data.contactName,
        contact_email: data.contactEmail,
        contact_phone: data.contactPhone,
        website: data.website || null,
        linkedin: data.linkedin || null,
        budget_range: null,
        message: data.message,
        status: 'pending',
        created_at: new Date().toISOString()
      }]);

    if (error) throw error;

    // Send email notification
    try {
      await emailService.sendSponsorApplicationEmail(data);
    } catch (emailError) {
      console.warn('Failed to send email notification:', emailError);
      // Don't throw error - database submission was successful
    }

    return result;
  }
};




