-- AlterTable
ALTER TABLE "CampaignInvitation" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "CampaignInvitation" ADD CONSTRAINT "CampaignInvitation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
