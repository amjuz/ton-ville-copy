import { execSync } from 'child_process'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('Enter migration name: ', (migrationName) => {
  const cleanName = migrationName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '_')

  if (!cleanName) {
    console.error('Please provide a valid migration name')
    rl.close()
    process.exit(1)
  }

  try {
    const output = execSync(`supabase db diff --local -f ${cleanName}`, { encoding: 'utf-8' })
    console.log('Migration file created successfully!')
    console.log(output)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }

  rl.close()
  process.exit(0)
})
