import { randomUUID } from 'crypto'

import { ImapFlow } from 'imapflow'
import nodemailer from 'nodemailer'

const SMTP_CONFIG = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
}

const IMAP_CONFIG = {
  host: process.env.IMAP_HOST,
  port: process.env.IMAP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  logger: false,
}

const validateConfig = () => {
  const requiredVars = [
    'SMTP_USER',
    'SMTP_PASS',
    'SMTP_HOST',
    'SMTP_PORT',
    'IMAP_HOST',
    'IMAP_PORT',
  ]
  const missing = requiredVars.filter((varName) => !process.env[varName])

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }

  if (isNaN(parseInt(process.env.SMTP_PORT))) {
    throw new Error('SMTP_PORT must be a valid number')
  }
}

const getSubject = () => `TonVille`

const sendTestEmail = async (uuid) => {
  const transporter = nodemailer.createTransport(SMTP_CONFIG)

  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: getSubject(),
    text: uuid,
  })

  console.log('Message sent successfully!')
  console.log('Message ID:', info.messageId)
  console.log('UUID sent:', uuid)
}

const checkEmail = async (uuid) => {
  const client = new ImapFlow(IMAP_CONFIG)

  try {
    await client.connect()
    const lock = await client.getMailboxLock('INBOX')

    try {
      const oneMinuteAgo = new Date()
      oneMinuteAgo.setMinutes(oneMinuteAgo.getMinutes() - 1)

      const messages = await client.search({
        since: oneMinuteAgo,
        subject: getSubject(),
      })

      if (!messages.length) {
        return null
      }

      for (const message of messages) {
        const fetch = await client.fetchOne(message, { source: true })
        if (fetch?.source) {
          const body = fetch.source.toString()

          if (body.includes(uuid)) {
            return {
              subject: getSubject(),
              text: uuid,
            }
          }
        }
      }

      return null
    } finally {
      lock.release()
    }
  } finally {
    await client.logout()
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const pollForEmail = async (uuid, timeoutSeconds = 60, intervalSeconds = 5) => {
  const startTime = Date.now()
  const timeoutMs = timeoutSeconds * 1000
  const intervalMs = intervalSeconds * 1000

  while (Date.now() - startTime < timeoutMs) {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)
    const remainingSeconds = timeoutSeconds - elapsedSeconds

    console.log(`\nChecking inbox (${elapsedSeconds}s elapsed, ${remainingSeconds}s remaining)...`)

    const result = await checkEmail(uuid)
    if (result) {
      return result
    }

    if (Date.now() - startTime < timeoutMs) {
      console.log(`Email not found yet, checking again in ${intervalSeconds}s...`)
      await sleep(intervalMs)
    }
  }

  throw new Error(`Email not found after ${timeoutSeconds} seconds`)
}

const main = async () => {
  try {
    validateConfig()
    console.log('Starting email test...')

    const testUUID = randomUUID()
    console.log('Generated UUID:', testUUID)

    console.log('\nSending email...')
    await sendTestEmail(testUUID)

    const message = await pollForEmail(testUUID)

    console.log('\nSuccess! Email test passed')
    console.log('Subject:', message.subject)
    console.log('UUID matched:', message.text)
  } catch (error) {
    console.error(
      '\nError during email test:',
      error instanceof Error ? error.message : 'Unknown error'
    )
    process.exit(1)
  }
}

main()
