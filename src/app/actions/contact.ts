'use server';

import { Resend } from 'resend';

export interface ContactActionResult {
  success: boolean;
  message: string;
}

export async function sendContactEmail(
  prevState: ContactActionResult | null,
  formData: FormData
): Promise<ContactActionResult> {
  const honey = formData.get('website_url'); // Honeypot field
  if (honey) {
    // Silently reject bots
    return {
      success: true,
      message: 'Pesan Anda telah diterima. Terima kasih!'
    };
  }

  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const subject = formData.get('subject')?.toString().trim() || 'Pesan Baru dari Portofolio Web';
  const message = formData.get('message')?.toString().trim();

  if (!name || !email || !message) {
    return {
      success: false,
      message: 'Mohon lengkapi nama, email, dan pesan Anda.'
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'rayhanalbar75@gmail.com';

  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured');
    return {
      success: false,
      message: 'Layanan email belum dikonfigurasi. Silakan hubungi langsung via WhatsApp atau email manual.'
    };
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: 'Reyhan Portfolio <onboarding@resend.dev>',
      to: [receiverEmail],
      replyTo: email,
      subject: `[Portfolio Inbound] ${subject} - dari ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e5e5; border-radius: 12px; background: #ffffff;">
          <h2 style="color: #0a0a0a; margin-top: 0;">Pesan Baru dari Portofolio</h2>
          <div style="background: #f7f7f8; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0 0 8px 0; color: #525252; font-size: 14px;"><strong>Pengirim:</strong> ${name}</p>
            <p style="margin: 0 0 8px 0; color: #525252; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #10b981;">${email}</a></p>
            <p style="margin: 0; color: #525252; font-size: 14px;"><strong>Subjek:</strong> ${subject}</p>
          </div>
          <h4 style="color: #0a0a0a; margin-bottom: 8px;">Isi Pesan:</h4>
          <div style="white-space: pre-wrap; line-height: 1.6; color: #171717; background: #fafafa; padding: 16px; border-left: 4px solid #10b981; border-radius: 4px;">
            ${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0 16px 0;" />
          <p style="font-size: 12px; color: #a3a3a3; margin: 0;">Dikirim otomatis melalui formulir kontak portofolio Reyhan Albar Fahryan.</p>
        </div>
      `
    });

    if (error) {
      console.error('Resend API error:', error);
      return {
        success: false,
        message: 'Gagal mengirim email. Silakan hubungi langsung via WhatsApp atau email manual.'
      };
    }

    return {
      success: true,
      message: 'Pesan berhasil terkirim! Terima kasih telah menghubungi saya, saya akan segera merespons.'
    };
  } catch (err) {
    console.error('Server action error:', err);
    return {
      success: false,
      message: 'Terjadi kendala teknis saat mengirim pesan. Silakan coba kembali.'
    };
  }
}
