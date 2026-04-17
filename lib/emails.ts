import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Email 1: Welcome (sent immediately on signup) ───────────────────────────

export async function sendWelcomeEmail(to: string, name?: string) {
  await resend.emails.send({
    from: "ProposalDraft <onboarding@resend.dev>",
    replyTo: "proposaldraftowner@gmail.com",
    to,
    subject: "Welcome to ProposalDraft — here's how to win your first job",
    html: `
      <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; color: #1f2937;">

        <div style="background: #2563eb; border-radius: 12px; padding: 24px; margin-bottom: 28px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 22px; margin: 0;">Welcome to ProposalDraft 🎉</h1>
          <p style="color: #bfdbfe; font-size: 14px; margin: 8px 0 0;">Your 14-day free trial has started.</p>
        </div>

        <p style="font-size: 15px; line-height: 1.7; margin-bottom: 16px;">
          Hey${name ? ` ${name}` : ""}! You just made a great decision.
          Contractors who send professional proposals win more jobs — it really is that simple.
        </p>

        <p style="font-size: 15px; line-height: 1.7; margin-bottom: 24px;">
          Here's how to get your first proposal out the door in the next 5 minutes:
        </p>

        <div style="background: #f9fafb; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
          ${[
            ["01", "Go to your dashboard", "Head to ProposalDraft and click New Proposal."],
            ["02", "Describe the job", "Fill in your client's name, job details, and line items. Plain language is totally fine."],
            ["03", "Generate and send", "Hit Generate Proposal, review it, then click Send to Client to get a shareable link instantly."],
          ].map(([step, title, desc]) => `
            <div style="display: flex; gap: 16px; margin-bottom: 16px;">
              <div style="background: #2563eb; color: #ffffff; font-weight: bold; font-size: 12px; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; padding-top: 6px; text-align: center;">${step}</div>
              <div>
                <p style="font-weight: bold; font-size: 14px; margin: 0 0 4px;">${title}</p>
                <p style="font-size: 13px; color: #6b7280; margin: 0;">${desc}</p>
              </div>
            </div>
          `).join("")}
        </div>

        <div style="text-align: center; margin-bottom: 28px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
            style="background: #2563eb; color: #ffffff; font-weight: bold; font-size: 15px; padding: 14px 32px; border-radius: 10px; text-decoration: none; display: inline-block;">
            Create My First Proposal →
          </a>
        </div>

        <p style="font-size: 13px; color: #6b7280; line-height: 1.6;">
          Your trial runs for 14 days. After that it's just $39/month —
          less than the profit on a single extra job you win because your proposal looked better.
        </p>

        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #9ca3af; margin: 0;">
            ProposalDraft · You're receiving this because you started a free trial.
          </p>
        </div>

      </div>
    `,
  });
}

// ─── Email 2: Day 3 Tips (schedule this for 3 days after signup) ─────────────

export async function sendDayThreeEmail(to: string) {
  await resend.emails.send({
    from: "ProposalDraft <onboarding@resend.dev>",
    replyTo: "proposaldraftowner@gmail.com",
    to,
    subject: "3 tips to win more jobs with ProposalDraft",
    html: `
      <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; color: #1f2937;">

        <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 8px;">
          Getting the most out of ProposalDraft 💡
        </h2>
        <p style="font-size: 14px; color: #6b7280; margin-bottom: 24px;">
          You've had a few days to explore — here are three things that make a real difference.
        </p>

        ${[
          {
            tip: "Be specific in your job description",
            detail: "The more detail you give the AI, the better the proposal. Instead of \"paint house exterior\" try \"paint 2-story exterior, 2,200 sq ft, two coats Benjamin Moore, includes trim and shutters.\" Specific inputs = specific, impressive outputs."
          },
          {
            tip: "Use the Not Included section strategically",
            detail: "Every proposal automatically lists what's NOT included. Review this carefully — it's your protection against scope creep. If a client tries to add work later, you can point right to it."
          },
          {
            tip: "Send the link, don't attach the PDF",
            detail: "The client share link is more powerful than a PDF attachment. Clients can open it on their phone, and you get notified the instant they accept. No more chasing for an answer."
          },
        ].map(({ tip, detail }) => `
          <div style="background: #f9fafb; border-left: 3px solid #2563eb; border-radius: 6px; padding: 16px; margin-bottom: 16px;">
            <p style="font-weight: bold; font-size: 14px; margin: 0 0 6px;">✓ ${tip}</p>
            <p style="font-size: 13px; color: #6b7280; margin: 0; line-height: 1.6;">${detail}</p>
          </div>
        `).join("")}

        <div style="text-align: center; margin-top: 28px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
            style="background: #2563eb; color: #ffffff; font-weight: bold; font-size: 14px; padding: 12px 28px; border-radius: 10px; text-decoration: none; display: inline-block;">
            Create a Proposal →
          </a>
        </div>

        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #9ca3af; margin: 0;">
            ProposalDraft · You're receiving this because you started a free trial.
          </p>
        </div>

      </div>
    `,
  });
}

// ─── Email 3: Day 12 Trial Ending (schedule this for 12 days after signup) ───

export async function sendTrialEndingEmail(to: string) {
  await resend.emails.send({
    from: "ProposalDraft <onboarding@resend.dev>",
    replyTo: "proposaldraftowner@gmail.com",
    to,
    subject: "Your ProposalDraft trial ends in 2 days",
    html: `
      <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; color: #1f2937;">

        <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 12px; padding: 20px; margin-bottom: 24px; text-align: center;">
          <p style="font-size: 15px; font-weight: bold; color: #92400e; margin: 0;">
            ⏰ Your free trial ends in 2 days
          </p>
        </div>

        <p style="font-size: 15px; line-height: 1.7; margin-bottom: 16px;">
          Your 14-day ProposalDraft trial is almost up. We hope you've had a chance
          to see how much faster and more professional your proposals can look.
        </p>

        <p style="font-size: 15px; line-height: 1.7; margin-bottom: 24px;">
          To keep generating proposals after your trial ends, continue with
          ProposalDraft Pro for just <strong>$39/month</strong>.
        </p>

        <div style="background: #f9fafb; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
          <p style="font-weight: bold; font-size: 14px; margin: 0 0 12px;">What you keep with Pro:</p>
          ${[
            "Unlimited AI-generated proposals",
            "Branded PDF downloads",
            "Client share links with one-click acceptance",
            "Instant email notifications when clients accept",
          ].map(f => `
            <p style="font-size: 13px; color: #374151; margin: 0 0 8px;">✓ ${f}</p>
          `).join("")}
        </div>

        <div style="text-align: center; margin-bottom: 20px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/pricing"
            style="background: #2563eb; color: #ffffff; font-weight: bold; font-size: 15px; padding: 14px 32px; border-radius: 10px; text-decoration: none; display: inline-block;">
            Continue with Pro — $39/mo →
          </a>
        </div>

        <p style="font-size: 13px; color: #6b7280; text-align: center;">
          No action needed if you already have a card on file — you'll be
          automatically continued at $39/month.
        </p>

        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #9ca3af; margin: 0;">
            ProposalDraft · You're receiving this because your trial is ending soon.
          </p>
        </div>

      </div>
    `,
  });
}