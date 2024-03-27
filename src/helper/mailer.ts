import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import client from "@/db";


export async function sendEmail({ email, emailType, userId }) {
    try {

        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {

            const user = await client.user.update(
                
            );

        } else if (emailType === "RESET") {
            const user = await User.findByIdAndUpdate(
                userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                },
                { new: true },
            );

        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "2f7947f03fd168",
                pass: "b91e9a58d5d53e"
            }
        });

        const options = {
            from: "bgmibot500@gmail.com",
            to: email,
            subject: emailType,
            html: `<p>
            Click <a href="${process.env.domain}/verifyToken?token=${hashedToken}" >here</a>
          </p>`
        }

        const mailRes = await transport.sendMail(options);

        return mailRes;

    } catch (err: any) {
        throw new Error(err.message);
    }
}