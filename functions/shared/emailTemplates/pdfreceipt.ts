export const pdfReceiptTemplate = (
  payerName: string,
  reference: string,
  phoneNumber: string, 
  meterType: string,
  tokenNumber: string,
  billerName: string, 
  billAddress: any,
  billAmount: string, 
  transactionDate: string,
  vat: any) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Receipt</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: white;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        border-radius: 10px;
        overflow: hidden;
        padding: 20px 0px;
        width: 100%;
      }

      .rt {
        text-align: right;
        font-size: 14px;
        font-weight: 300;
      }
      .blue-box {
        background-color: #3050b8;
        border-radius: 10px;
        color: white;
        padding: 20px;
        text-align: center;
        margin: 0px auto;
        width: 100%;
        max-width: 400px;
      }
      .blue-box h2 {
        margin: 0;
        padding: 0;
        font-size: 24px;
        line-height: 30px;
      }
      .centered-text {
        text-align: center;
        margin: 20px 0;
        font-size: 18px;
        color: gray;
      }
      .details {
        padding: 20px;
        font-size: 16px;
        color: black;
      }
      .details-row {
        display: table;
        width: 100%;
        margin-bottom: 30px;
        border-bottom: 1px dashed #ebf1f6;
        padding-bottom: 5px;
      }

      .title-row {
        display: table;
        width: 100%;
        /* margin-bottom: 30px; */
        border-bottom: 1px dashed #ebf1f6;
        line-height: 0px;
        margin-top: 50px;
        margin-bottom: 15px;
      }

      .title {
        font-size: 16px;
        font-weight: 600;
        color: #000;
      }
      .details-key {
        display: table-cell;
        padding-right: 10px;
        font-size: 14px;
        font-weight: 500;
      }
    </style>
  </head>
  <body>
    <table class="container" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <table class="blue-box" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td>
                <h2 style="font-size: 14px; font-weight: 500">You just paid</h2>
                <h2 style="font-size: 32px; font-weight: 800">N ${billAmount}</h2>
                <h2 style="font-size: 14px; font-weight: 500">
                  to ${billerName}
                </h2>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table
            class="centered-text"
            cellpadding="0"
            cellspacing="0"
            width="100%">
            <tr class="title-row">
              <td>
                <p class="title">Transaction Receipt</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table class="details" cellpadding="0" cellspacing="0" width="100%">
            <tr class="details-row">
              <td class="details-key">Payer's Name</td>
              <td class="rt">${payerName}</td>
            </tr>
            <tr class="details-row">
              <td class="details-key">Phone Number</td>
              <td class="rt">${phoneNumber}</td>
            </tr>
            <tr class="details-row">
              <td class="details-key">Address</td>
              <td class="rt">${billAddress}</td>
            </tr>

            <tr class="details-row">
              <td class="details-key">Meter Type</td>
              <td class="rt">${meterType}</td>
            </tr>

            <tr class="details-row">
              <td class="details-key">Token Number</td>
              <td class="rt">${tokenNumber}</td>
            </tr>

            <tr class="details-row">
              <td class="details-key">Reference</td>
              <td class="rt">${reference}</td>
            </tr>

            <tr class="details-row">
              <td class="details-key">Date and Time</td>
              <td class="rt">${transactionDate}</td>
            </tr>

            <tr class="details-row">
              <td class="details-key">VAT(5%)</td>
              <td class="rt">${vat}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;