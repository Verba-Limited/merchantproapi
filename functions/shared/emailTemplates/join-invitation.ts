export const joinInvitation = (fullName: any, inviteName: any, inviteEmail: any, userEmail: any, userEmailHash: any, inviteCode: any) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Billon Invitation</title>

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
                style="background-color: #ffffff;
                  padding: 25px 20px;
                  border-radius: 8px;
                  margin-top: 40px;">
                <tbody>
                  <tr>
                    <td>
                      <p style="font-size: 16px; font-family: Switzer">
                        <strong>Hello ${inviteName}, </strong>
                      </p>

                      <p style="font-size: 16px;
                          font-weight: 400;
                          font-family: Switzer;
                          line-height: 24px;
                          margin-top: 20px;">
                        ${fullName} has invited you to become part of our
                        bill payment community! To accept the invitation and
                        create your BillOn account, please click on the link
                        below:
                      </p>

                      <a
                        style="
                          font-size: 16px;
                          font-weight: 600;
                          font-family: Switzer;
                          line-height: 24px;
                          color: #2b5ebe;"
                        href="https://billlonn.netlify.app/invitation/${userEmail}/${userEmailHash}/${inviteEmail}/${inviteCode}/accept">
                        https://billlonn.netlify.app/invitation/${userEmail}/${userEmailHash}/${inviteEmail}/${inviteCode}/accept
                      </a>

                      <p
                        style="font-size: 16px;
                          font-weight: 400;
                          font-family: Switzer;
                          line-height: 24px;
                          margin-top: 20px;
                          margin-bottom: 10px;">
                        Here are a few things to keep in mind as you get
                        started:
                      </p>

                      <ul>
                        <li
                          style="font-size: 16px;
                            font-weight: 400;
                            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                            line-height: 24px;
                            margin-top: 5px;">
                          <span style="font-weight: 600">Simplified Bill Payments:</span>
                          Say goodbye to manual bill payments. With Billon, you
                          can pay your bills quickly and easily, all in one
                          place.
                        </li>

                        <li style="font-size: 16px;
                            font-weight: 400;
                            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                            line-height: 24px;
                            margin-top: 20px;">
                          <span style="font-weight: 600">Transaction History:</span>
                          Access your complete transaction history, view past
                          payments, and keep track of your bills in one place.
                        </li>

                        <li style="font-size: 16px;
                            font-weight: 400;
                            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                            line-height: 24px;
                            margin-top: 20px;">
                          <span style="font-weight: 600">Bill Reminders:</span>
                          Never miss a payment again! Set up bill reminders and
                          receive timely notifications to ensure you stay on top
                          of your bills.
                        </li>

                        <li style="font-size: 16px;
                            font-weight: 400;
                            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                            line-height: 24px;
                            margin-top: 20px;">
                          <span style="font-weight: 600">Multi-Users:</span>
                          Cover your friends and family's bills with a
                          one-billing account. Share your account with your
                          friends and family as an Individual user. As a
                          corporate user, you can manage the access you give to
                          your business funds, Add your co-workers, allocate and
                          restrict petty funds and keep your business running.
                        </li>
                      </ul>

                      <p style="font-size: 16px;
                          font-weight: 400;
                          font-family: Switzer;
                          line-height: 24px;">
                        If you have any questions or need assistance, please
                        contact our support team at
                        <b>support@billon.ng</b>.
                      </p>

                      <p style="font-size: 16px;
                          font-weight: 400;
                          font-family: Switzer;
                          line-height: 24px;">
                        We're excited to have you on board BillOn💙
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
                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial,
                      sans-serif;
                    padding-right: 15px;">
                  4th & 5th Floor Fortune Towers, 27/29 Adeyemo Alakija Street,
                  Victoria Island, Lagos, Nigeria.
                </p>
              </td>
              <td>
                <div style="display: flex; margin-bottom: 25px">
                  <img
                    src="./assets/web.svg"
                    alt="icon"
                    style="margin: 0px 8px"/>
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
                <p style="color: #001c78; font-size: 14px; font-weight: 400; line-height: 16px;
                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                  © 2023 BillON. All rights reserved
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </table>
    </center>
  </body>
</html>`;
