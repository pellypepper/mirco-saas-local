export const changeEmailTemplate = (confirmationUrl: string, currentEmail: string, newEmail: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Confirm Your Email Change</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#f6f8fa;color:#24292f;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f8fa;padding:40px 0;">
<tr>
<td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.1);overflow:hidden;">

<tr>
   <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #0077b6 0%, #8ecae6 100%);">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Welcome to ServiceHub!</h1>
                        </td>
</tr>

<tr>
<td style="padding:40px;">
<h2 style="margin:0 0 20px;font-size:20px;color:#24292f;font-weight:600;">Confirm Your Email Change</h2>

<p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#57606a;">
We received a request to change the email address associated with your ServiceHub account from ${currentEmail} to ${newEmail}.
To complete this change, please confirm by clicking the button below.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="margin:30px 0;">
<tr>
<td align="center">
<a href="${confirmationUrl}" style="display:inline-block;padding:14px 32px;background-color:#fb8500;color:#ffffff;text-decoration:none;border-radius:6px;font-size:16px;font-weight:600;">
Confirm Email Change
</a>
</td>
</tr>
</table>

<p style="margin:20px 0 0;font-size:14px;color:#57606a;">
If the button doesn’t work, copy and paste this link into your browser:
</p>

<p style="margin:10px 0 0;font-size:13px;word-break:break-all;color:#0077b6;">
<a href="${confirmationUrl}" style="color:#0077b6;text-decoration:underline;">
${confirmationUrl}
</a>
</p>
</td>
</tr>

<tr>
<td style="padding:30px 40px;background-color:#f6f8fa;border-top:1px solid #d0d7de;">
<p style="margin:0 0 10px;font-size:13px;color:#57606a;">
If you did not request this email change, please secure your account immediately.
</p>
<p style="margin:0;font-size:13px;color:#8c959f;">
This confirmation link will expire in 24 hours.
</p>
</td>
</tr>

</table>

<table width="600" cellpadding="0" cellspacing="0" style="margin-top:20px;">
<tr>
<td align="center" style="padding:20px;">
<p style="margin:0;font-size:12px;color:#8c959f;">
© 2026 ServiceHub. All rights reserved.
</p>
</td>
</tr>
</table>

</td>
</tr>
</table>
</body>
</html>
`;