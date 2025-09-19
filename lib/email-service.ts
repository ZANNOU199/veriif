
import nodemailer from "nodemailer"
import { generateEmailTemplate } from "./email-templates"
import type { TicketSubmission } from "./types"
import type { Language } from "./i18n"

interface EmailOptions {
  to: string
  subject: string
  html: string
  text: string
}

// Mock email service - In production, you would integrate with:
// - Resend (recommended for Vercel)
// - SendGrid
// - AWS SES
// - Nodemailer with SMTP
class EmailService {
  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "kirdabankcontact@gmail.com",
          pass: "gcuc nnqv xijl vfcx"
        }
      })

      await transporter.sendMail({
        from: "RechargeSecure <kirdabankcontact@gmail.com>",
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      })

      return true
    } catch (error) {
      console.error("[v0] Error sending email:", error)
      return false
    }
  }

  async sendConfirmationEmail(
    submission: TicketSubmission,
    language: Language = "fr",
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const emailType = submission.submission_type === "validation" ? "validation" : "reimbursement"
      const template = generateEmailTemplate(submission, emailType, language)

      const success = await this.sendEmail({
        to: submission.user_email,
        subject: template.subject,
        html: template.html,
        text: template.text,
      })

      if (!success) {
        return { success: false, error: "Failed to send email" }
      }

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }
    }
  }

  async sendStatusUpdateEmail(
    submission: TicketSubmission,
    status: "approved" | "rejected",
    language: Language = "fr",
    rejectionReason?: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const template = generateEmailTemplate(submission, status, language, rejectionReason)

      const success = await this.sendEmail({
        to: submission.user_email,
        subject: template.subject,
        html: template.html,
        text: template.text,
      })

      if (!success) {
        return { success: false, error: "Failed to send email" }
      }

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }
    }
  }

  async sendBulkEmails(
    submissions: TicketSubmission[],
    status: "approved" | "rejected",
    language: Language = "fr",
    rejectionReason?: string,
  ): Promise<{ success: boolean; sent: number; failed: number }> {
    let sent = 0
    let failed = 0

    for (const submission of submissions) {
      const result = await this.sendStatusUpdateEmail(submission, status, language, rejectionReason)
      if (result.success) {
        sent++
      } else {
        failed++
        console.error(`[v0] Failed to send email to ${submission.user_email}:`, result.error)
      }

      // Add delay between emails to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    return {
      success: failed === 0,
      sent,
      failed,
    }
  }
}

export const emailService = new EmailService()
