import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  

await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: email,
  subject: 'veryfication code',
  html: `<p>
 مرحبا بكم في سماهات , <br />
  كود التاكيد الخاص بك : <strong>${token}</strong>
  </p>`
});
}

// send password token 
export const sendRestPasswordToken = async (email: string, token: string) => {
  

await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: email,
  subject: 'reset your password ',
  html: `<p>
 مرحبا بكم في سماهات , <br />
  كود تغيير كلمة السر الخاص بك : <strong>${token}</strong>
  </p>`
});
}