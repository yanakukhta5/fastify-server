import { Pool } from 'pg'
import 'dotenv/config'

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

type TDeductBalanceProps = {
  userId: number
  amount: number
}

export async function deductBalance({ userId, amount }: TDeductBalanceProps) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    const res = await client.query('SELECT balance FROM users WHERE id = $1', [
      userId,
    ])
    const currentBalance = res.rows[0].balance

    if (currentBalance < amount)
      throw new Error('Insufficient funds in the account.')

    const newBalance = currentBalance - amount
    await client.query('UPDATE users SET balance = $1 WHERE id = $2', [
      newBalance,
      userId,
    ])

    await client.query('COMMIT')
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Error when writing off balance:', error.message)
  } finally {
    client.release()
  }
}
