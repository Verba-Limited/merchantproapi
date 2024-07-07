export const sendOTPEmail = (fullName: string, otpCode: string) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Billon OTP</title>

    <style type="text/css">
      @media screen {
        @font-face {
          font-family: "Switzer";
          src: url("./assets/switzer.ttf") format("truetype");
        }
      }

      body {
        margin: 0px;
        padding: 0px;
      }

      p {
        font-family: "Switzer";
      }

      table {
        border-spacing: 0px;
      }

      td {
        padding: 0px;
      }

      img {
        border: 0px;
      }
    </style>
  </head>
  <body style="background-color: #f1f4ff; width: 100%; height: 100%">
    <center style="width: 100%">
      <table style="width: 650px; margin: 20px 20px 0px 20px">
        <tr>
          <td style="display: flex; justify-content: center">
            <img src="./assets/logo.svg" alt="logo" style="margin: 0px auto" />
          </td>
        </tr>

        <tbody>
          <tr>
            <td>
              <table
                style="
                  background-color: #ffffff;
                  padding: 25px 20px;
                  border-radius: 8px;
                  margin-top: 40px;
                ">
                <tbody>
                  <tr>
                    <td>
                      <p style="font-size: 16px; font-family: Switzer">
                        <strong>Hi ${fullName}, </strong>
                      </p>

                      <p style="
                          font-size: 16px;
                          font-weight: 400;
                          font-family: Switzer;
                          line-height: 24px;
                          margin-top: 20px;
                        ">
                        To ensure the security of your Billon account, we have
                        generated a One-Time Password (OTP) for you. Use the OTP
                        below to complete your action:
                      </p>

                      <div style="width: 100%;
                          height: 80px;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          text-align: center;
                          vertical-align: middle;
                          margin: 20px 0px;">
                        <p style="color: #000000;
                            font-size: 40px;
                            font-weight: 500; text-align: center;">
                          ${otpCode}
                        </p>
                      </div>

                      <p style="
                          font-size: 16px;
                          font-weight: 400;
                          font-family: Switzer;
                          line-height: 24px;">
                        If you haven't requested this OTP or need assistance,
                        please contact our support team immediately at
                        <span style="font-weight: 600">support@billon.ng</span>
                        .
                      </p>

                      <p style="font-size: 16px;
                          font-weight: 400;
                          font-family: Switzer;
                          line-height: 24px;
                          margin-top: 20px;">
                        Stay secure and enjoy hassle-free bill payments with
                        Billon! With love
                      </p>
                      <p style="font-size: 16px;
                          font-weight: 400;
                          font-family: Switzer;
                          line-height: 24px;
                          margin-top: 20px;">
                        from the Billon team 💙
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>

        <table style="
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
                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial,
                      sans-serif;
                    padding-right: 15px;
                  "
                >
                  4th & 5th Floor Fortune Towers, 27/29 Adeyemo Alakija Street,
                  Victoria Island, Lagos, Nigeria.
                </p>
              </td>
              <td>
                <div style="display: flex; margin-bottom: 25px">
                  <img
                    src="./assets/web.svg"
                    alt="icon"
                    style="margin: 0px 8px"
                  />
                  <img
                    src="./assets/whatsapp.svg"
                    alt="icon"
                    style="margin: 0px 8px"/>
                  <img
                    src="./assets/twitter.svg"
                    alt="icon"
                    style="margin: 0px 8px"/>
                  <img
                    src="./assets/facebook.svg"
                    alt="icon"
                    style="margin: 0px 8px"/>
                  <img
                    src="./assets/linkedin.svg"
                    alt="icon"
                    style="margin: 0px 8px"/>
                  <img
                    src="./assets/instagram.svg"
                    alt="icon"
                    style="margin: 0px 8px"/>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <p style="
                    color: #001c78;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 16px;
                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
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
