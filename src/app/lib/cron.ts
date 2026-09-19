import cron from 'node-cron'
import { prisma } from './prisma';

export const deleteUserFromDB = async () => {
  cron.schedule("0 0 1 * *", async () => {
    try {
      const oneMonthAgo = new Date(Date.now() - 60 * 60 * 24 * 30 * 1000);
      const deleteUsers = await prisma.user.deleteMany({
        where: {
          deletedAt: {
            lt: oneMonthAgo
          }
        }
      })

      if (deleteUsers.count > 0) {
        console.log(`Cron: Deletd ${deleteUsers.count} users from db`)
      }
    } catch (error) {
      console.log('failed to delted user')
    }
    console.log('Cron job trigger successfully')
  })
}