import app from "./app"
import config from "./app/config/env"
import { deleteUserFromDB } from "./app/lib/cron"

import { prisma } from "./app/lib/prisma"
import { seedSiteConfig } from "./app/utils/seed"
import { seedSuperAdmin, seedTesterAdmin } from "./app/utils/seed"
import cron from 'node-cron'

const PORT = config.port

const main = async () => {
  try {
    await prisma.$connect()
    console.log('Connected to the database successfully.')
    app.listen(PORT, () => {
      console.log(`server is running port ${PORT}`)
    })
    await seedSiteConfig()
    await seedSuperAdmin()
    await seedTesterAdmin()

    // cron.schedule('*/5 * * * * *', () => {
    //   console.log('running a task every 5 second')
    // })
    await deleteUserFromDB()

  } catch (error) {
    console.error('Error statring the server', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}



main()