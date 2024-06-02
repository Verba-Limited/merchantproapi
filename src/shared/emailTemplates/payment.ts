export const sendPaymentEmail = (
  fullName: string, 
  transactionMessage: string,
  transactionId: string,
  billerCategory: string, 
  billerName: string, 
  billAmount: string, 
  transactionDate: string,
  paymentMethod: string,
  narration: any,
  transactionStatus: string,
  failureReason: any) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Billon Payment Receipt</title>
    <style type="text/css">
      @media screen {
        @font-face {
          font-family: "Switzer";
          src: url("./assets/switzer.ttf") format("truetype");
        }
      }
      body { margin: 0px; padding: 0px; }
      p { font-family: "Switzer"; }
      table { border-spacing: 0px; }
      td { padding: 0px; }
      img { border: 0px; }
    </style>
  </head>
  <body style="background-color: #f1f4ff; width: 100%; height: 100%">
    <center style="width: 100%">
      <table style="width: 650px; margin: 20px 20px 0px 20px">
        <tr>
          <td>
            <div style="width: 100%; height: 95px; background: linear-gradient(180deg, #0194e7 0%, #1043b5 100%); border-radius: 8px 8px 0px 0px;">
              <div
                style="width: 100%;
                  height: 100%;
                  background-image: url(./assets/bg.svg);
                  background-size: cover;
                  background-repeat: no-repeat;
                  background-position: center;
                  display: flex;
                  justify-content: center;
                  align-items: center;">
                <img src="./assets/logo.svg" alt="logo" style="margin: 0px auto; width: 136px; height: auto" />
              </div>
            </div>
          </td>
        </tr>
        <tbody>
          <tr>
            <td>
              <table
                style="
                  background-color: #ffffff;
                  padding: 25px 20px;
                  border-radius: 0px 0px 8px 8px;">
                <tbody>
                  <tr>
                    <td>
                      <p style="font-size: 16px">
                        <span style="font-weight: 600">Hello ${fullName}, </span>
                      </p>

                      <p style="font-size: 16px;font-weight: 400;line-height: 24px;">
                        ${transactionMessage}
                      </p>

                      <p style="font-size: 16px;
                          font-weight: 400;
                          line-height: 24px;">
                        Here are the transaction details:
                      </p>

                      <p style="font-size: 16px; font-weight: 400; line-height: 24px; margin: 0px 0px !important;">
                        <span style="font-weight: 600">Transaction ID: </span>${transactionId}
                      </p>

                      <p style="font-size: 16px; font-weight: 400; line-height: 24px; margin: 0px 0px !important;">
                        <span style="font-weight: 600">Biller: </span> ${billerCategory}
                      </p>

                      <p style="font-size: 16px; font-weight: 400; line-height: 24px; margin: 0px 0px !important;">
                        <span style="font-weight: 600">Bill Type: </span> ${billerName}
                      </p>

                      <p style="font-size: 16px; font-weight: 400; line-height: 24px; margin: 0px 0px !important;">
                        <span style="font-weight: 600">Amount:</span> ${billAmount}
                      </p>

                      <p style="font-size: 16px; font-weight: 400; line-height: 24px; margin: 0px 0px !important;">
                        <span style="font-weight: 600">Payment Date:</span> ${transactionDate}
                      </p>

                      <p style="font-size: 16px; font-weight: 400; line-height: 24px; margin: 0px 0px !important;">
                        <span style="font-weight: 600">Payment Method:</span> ${paymentMethod}
                      </p>

                      <p style="font-size: 16px; font-weight: 400; line-height: 24px; margin: 0px 0px !important;">
                        <span style="font-weight: 600">Transaction Description:</span> ${narration}
                      </p>

                      <p style="font-size: 16px; font-weight: 400; line-height: 24px; margin: 0px 0px !important;">
                        <span style="font-weight: 600">Status:</span> ${transactionStatus}
                      </p>

                      ${transactionStatus == 'Failure' || transactionStatus == 'Declined' ? 
                        '<p style="font-size: 16px; font-weight: 400; line-height: 24px; margin: 0px 0px !important;">'+
                          '<span style="font-weight: 600">Reason for Decline:</span>'+failureReason+'</p>' 
                        : ''
                      }

                      <p style="font-size: 16px; font-weight: 400; margin-top: 25px; line-height: 24px;">
                        Keep this email for your records. If you have any
                        questions or concerns regarding this transaction, please
                        contact our support team at
                        <span style="font-weight: 600">support@billon.ng</span>
                      </p>

                      <p style="font-size: 16px; font-weight: 400; margin-top: 25px; line-height: 24px;">
                        Thank you for using BillOn to streamline your bill payments💙
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>

        <table
          style="
            background-color: #ffffff;
            padding: 25px 20px;
            border-radius: 8px;
            margin-top: 10px;
            width: 650px;">
          <tbody>
            <tr>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <img
                          src="./assets/logo2.svg"
                          alt="logo"
                          style="margin-bottom: 15px"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr style="margin-top: 30px">
              <td style="width: 290px">
                <p
                  style="
                    color: #001c78;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 16px;
                    padding-right: 15px;
                  "
                >
                  4th & 5th Floor Fortune Towers, 27/29 Adeyemo Alakija Street,
                  Victoria Island, Lagos, Nigeria.
                </p>
              </td>
              <td>
                <div style="display: flex; margin-bottom: 20px;">
                  <img
                    src="./assets/web.svg"
                    alt="icon"
                    style="margin: 0px 8px"
                  />
                  <img
                    src="./assets/whatsapp.svg"
                    alt="icon"
                    style="margin: 0px 8px"
                  />
                  <img
                    src="./assets/twitter.svg"
                    alt="icon"
                    style="margin: 0px 8px"
                  />
                  <img
                    src="./assets/facebook.svg"
                    alt="icon"
                    style="margin: 0px 8px"
                  />
                  <img
                    src="./assets/linkedin.svg"
                    alt="icon"
                    style="margin: 0px 8px"
                  />
                  <img
                    src="./assets/instagram.svg"
                    alt="icon"
                    style="margin: 0px 8px"
                  />
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <p
                  style="
                    color: #001c78;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 16px;">
                  © 2023 BillOn. All rights reserved
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </table>
    </center>
  </body>
</html>`;