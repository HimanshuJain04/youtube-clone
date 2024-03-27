import nodemailer from "nodemailer";

export async function sendEmail(email: string, url: string) {
    try {

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
            subject: "Verify Email",
            html: `<p> Click <a href=${url} >here</a> </p>`
        }

        const mailRes = await transport.sendMail(options);

        return mailRes;

    } catch (err: any) {
        throw new Error(err.message);
    }
}