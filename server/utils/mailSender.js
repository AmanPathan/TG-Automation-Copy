const nodemailer = require("nodemailer");

const mailSender = async(email, title, body) => {
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })
            let info = await transporter.sendMail({
                from: 'STUDY NOTION || COMPANY',
                to: `${email}`,
                subject:`${title}`,
                html:`
                <h2>Dr.D Y Patil College of Engineering,Akurdi</h2>
                <h3>OTP for Signup: ${body} </h3>`,
            })
            console.log(info);
            return info;
    }
    catch(error){
        console.log(error);
    }
}

const sendEmailWithAttachment = async (email, subject, text, attachmentPath, reportData) => {
    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER, // Your Gmail address
            pass: process.env.MAIL_PASS // Your Gmail password
        }
    });

    const htmlBody = `
        <html>
        <head>
            <style>
                table {
                    border-collapse: collapse;
                    width: 100%;
                }
                th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h2>${subject}</h2>
            <p>${text}</p>
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Attendance</th>
                        <th>Unit Tests</th>
                        <th>Prelim</th>
                        <th>InSem</th>
                    </tr>
                </thead>
                <tbody>
                    ${reportData.map(entry => `
                        <tr>
                            <td>${entry.subject}</td>
                            <td>${entry.attendance}</td>
                            <td>${entry.unitTests ? entry.unitTests.join(', ') : ''}</td>
                            <td>${entry.prelim}</td>
                            <td>${entry.inSem}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </body>
        </html>
    `;

    // Message object
    let message = {
        from: process.env.MAIL_USER, // Sender address
        to: `${email}`, // List of recipients
        subject: `${subject}`, // Subject line
        attachments: [{ // Binary Buffer attachment
            filename: 'report.pdf',
            path: `${attachmentPath}`
        }]
    };
    
    try {
        // Send email
        let info = await transporter.sendMail(message);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error occurred while sending email:', error);
        throw error;
    }
}

module.exports = {sendEmailWithAttachment, mailSender};