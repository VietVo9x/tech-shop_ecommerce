import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.TYPE_MAIL,
      auth: {
        user: process.env.NAME_MAIL,
        pass: process.env.PASSWORD_MAIL,
      },
    });
  }

  async sendMail(to: string, subject: string) {
    const mailOptions = {
      from: 'vietvonhu18@gmail.com',
      to,
      subject,
      html: `
     <html>
       <head>
       <style>
       /* CSS styles */
       body {
         font-family: Arial, sans-serif;
         background-color: #f0f0f0;
         margin: 0;
         padding: 0;
       }
       .container {
         max-width: 960px;
         margin: 0 auto;
         padding: 20px;
         background-color: #ffffff;
         border-radius: 5px;
         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
       }
       .infoTwitter {
         display: flex;
         align-items: center;
         color: #1da1f2;
         margin-bottom: 20px;
       }
       .infoTwitter img {
         width: 80px;
         height: auto;
         object-fit: cover;
       }
       .infoTwitter h3 {
         font-size: 24px;
         margin: 0;
       }
       h1 {
         color: #333333;
         margin: 0;
       }
       .content {
         color: #555555;
         font-size: 18px;
       }
     </style>
       </head>
       <body>
       <h1>Chúc mừng bạn đã đăng ký thành công!</h1>
       <p class="content">Hãy khám phá chúng tôi và trải nghiệm những điều thú vị.</p>
     </div>
       </body>
     </html>
   `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
