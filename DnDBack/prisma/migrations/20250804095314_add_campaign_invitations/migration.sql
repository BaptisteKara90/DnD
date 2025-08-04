-- AlterTable
ALTER TABLE "Npc" ADD COLUMN     "picture" TEXT;

-- CreateTable
CREATE TABLE "CampaignInvitation" (
    "id" SERIAL NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "invitedById" INTEGER NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CampaignInvitation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CampaignInvitation" ADD CONSTRAINT "CampaignInvitation_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignInvitation" ADD CONSTRAINT "CampaignInvitation_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
