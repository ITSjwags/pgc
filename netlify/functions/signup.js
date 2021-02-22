const sgMail = require('@sendgrid/mail')
const axios = require('axios')

sgMail.setApiKey(process.env.GATSBY_SENDGRID_API_KEY)

exports.handler = async (event) => {
  const { formValues } = JSON.parse(event.body)

  const msg = {
    to: 'jvwagoner@gmail.com', // Change to your recipient
    from: 'jvwagoner@gmail.com', // Change to your verified sender
    subject: `PGC Member Signup - ${formValues.name}`,
    text: `${formValues.name} (${formValues.email}) just signed up for a PGC membership and has been added to the google sheet ${process.env.GATSBY_GOOGLE_SHEET_URL_MEMBERS}.`,
    html: `
      <div>
        <p>
          ${formValues.name} (${formValues.email}) just signed up for a PGC membership and has been added to the <a href="${process.env.GATSBY_GOOGLE_SHEET_URL_MEMBERS}">google sheet</a>.
        </p>
        <p>
          <strong>NAME:</strong> ${formValues.name} <br />
          <strong>EMAIL:</strong> ${formValues.email} <br />
          <strong>PHONE:</strong> ${formValues.phone} <br />
          <strong>INSTAGRAM:</strong> ${formValues.instagram} <br />
          <strong>GHIN:</strong> ${formValues.ghin} <br />
          <strong>VENMO:</strong> ${formValues.venmo}
        </p>
      </div>
    `,
  }

  try {
    // check for existing users before adding to avoid duplicates
    const existingMemberInfo = await axios.get(
      `${process.env.GATSBY_GOOGLE_SHEET_API}/EMAIL/${formValues.email}`
    )
    const isExistingMember = existingMemberInfo.data[0]
    // if email exists, let it pass but give error to ui
    if (isExistingMember) {
      return {
        statusCode: 200,
        body: 'Email already exists.',
      }
    }

    // if no email exists, send email and post to sheets
    await sgMail.send(msg)
    await axios.post(process.env.GATSBY_GOOGLE_SHEET_API, {
      NAME: formValues.name,
      EMAIL: formValues.email,
      PHONE: formValues.phone,
      INSTAGRAM: formValues.instagram,
      GHIN: formValues.ghin,
      VENMO: formValues.venmo,
    })

    return {
      statusCode: 200,
      body: 'Email sent and added to google sheet',
    }
  } catch (error) {
    // handle error
    return {
      statusCode: 500,
      body: error.message,
    }
  }
}
