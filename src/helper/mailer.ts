import nodemailer from "nodemailer";

export async function sendEmail(email: string, url: string) {
    try {

        //true for 465 and false for 587
        const transporter = nodemailer.createTransport(
            {
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
            }
        );

        const options = {
            from: "bgmibot500@gmail.com",
            to: email,
            subject: "Verify Email",
            html: `<p> Click <a href="${url}">here</a> </p>`
        };

        const mailRes = await transporter.sendMail(options);

        return mailRes;

    } catch (err) {
        // Better to log the error rather than throwing it
        console.error("Error sending email:", err);
        throw new Error("Failed to send email. Please try again later.");
    }
}
