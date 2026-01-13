// Email service using Vercel API routes to avoid CORS issues

// Email service helper functions
export const emailService = {
  // Send contact form email
  async sendContactEmail(formData) {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'contact',
          formData: formData
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }

      console.log('Contact email sent successfully:', result);
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending contact email:', error);
      return { success: false, message: 'Failed to send email' };
    }
  },

  // Send speaker application email
  async sendSpeakerApplicationEmail(formData) {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'speaker',
          formData: formData
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }

      console.log('Speaker application email sent successfully:', result);
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending speaker application email:', error);
      return { success: false, message: 'Failed to send email' };
    }
  },

  // Send sponsor application email
  async sendSponsorApplicationEmail(formData) {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'sponsor',
          formData: formData
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }

      console.log('Sponsor application email sent successfully:', result);
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending sponsor application email:', error);
      return { success: false, message: 'Failed to send email' };
    }
  },

  // Send student/volunteer email
  async sendStudentVolunteerEmail(formData) {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'student-volunteer',
          formData: formData
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }

      console.log('Student/volunteer email sent successfully:', result);
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending student/volunteer email:', error);
      return { success: false, message: 'Failed to send email' };
    }
  },

  // Send media partnership email
  async sendMediaPartnershipEmail(formData) {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'media-partnership',
          formData: formData
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }

      console.log('Media partnership email sent successfully:', result);
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending media partnership email:', error);
      return { success: false, message: 'Failed to send email' };
    }
  }
};



