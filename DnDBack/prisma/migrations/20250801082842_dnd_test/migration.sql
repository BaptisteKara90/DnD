-- CreateEnum
CREATE TYPE "WeaponType" AS ENUM ('melee', 'ranged', 'thrown');

-- CreateEnum
CREATE TYPE "DamageType" AS ENUM ('slashing', 'piercing', 'bludgeoning', 'fire', 'cold', 'lightning', 'poison', 'acid', 'necrotic', 'radiant', 'force', 'thunder', 'psychic');

-- CreateEnum
CREATE TYPE "Ability" AS ENUM ('STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA');

-- CreateEnum
CREATE TYPE "ProficiencyType" AS ENUM ('weapon', 'armor', 'tool', 'skill', 'saving_throw');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PLAYER', 'DM', 'ADMIN');

-- CreateEnum
CREATE TYPE "CampaignRole" AS ENUM ('DM', 'PLAYER');

-- CreateTable
CREATE TABLE "Race" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trait" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "raceId" INTEGER,
    "classId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trait_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "hitDice" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Archetype" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "classId" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "Archetype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spell" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "school" TEXT NOT NULL,
    "castingTime" TEXT NOT NULL,
    "range" TEXT NOT NULL,
    "components" TEXT[],
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Spell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpellSlot" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "max" INTEGER NOT NULL,
    "used" INTEGER NOT NULL,

    CONSTRAINT "SpellSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weapon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "WeaponType" NOT NULL,
    "damageDice" TEXT NOT NULL,
    "damageType" "DamageType" NOT NULL,
    "properties" TEXT[],
    "isMagical" BOOLEAN NOT NULL DEFAULT false,
    "bonus" INTEGER,
    "weight" DOUBLE PRECISION,
    "cost" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proficiency" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ProficiencyType" NOT NULL,

    CONSTRAINT "Proficiency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT,
    "weight" DOUBLE PRECISION,
    "equipped" BOOLEAN NOT NULL DEFAULT false,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ability" "Ability" NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterSkill" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,
    "proficient" BOOLEAN NOT NULL DEFAULT false,
    "bonus" INTEGER,

    CONSTRAINT "CharacterSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "raceId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "archetypeId" INTEGER,
    "armorClass" INTEGER NOT NULL,
    "initiative" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "maxHp" INTEGER NOT NULL,
    "currentHp" INTEGER NOT NULL,
    "temporayHp" INTEGER,
    "hitDiceAvailable" TEXT NOT NULL,
    "strength" INTEGER NOT NULL,
    "dexterity" INTEGER NOT NULL,
    "constitution" INTEGER NOT NULL,
    "intelligence" INTEGER NOT NULL,
    "wisdom" INTEGER NOT NULL,
    "charisma" INTEGER NOT NULL,
    "background" TEXT,
    "alignment" TEXT,
    "languages" TEXT[],
    "picture" TEXT,
    "userId" INTEGER NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavingThrow" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "ability" "Ability" NOT NULL,
    "proficient" BOOLEAN NOT NULL DEFAULT false,
    "bonus" INTEGER,

    CONSTRAINT "SavingThrow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Npc" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "role" TEXT,
    "alignment" TEXT,
    "race" TEXT,
    "class" TEXT,
    "level" INTEGER,
    "hp" INTEGER NOT NULL,
    "stats" JSONB NOT NULL,
    "createdById" INTEGER,
    "campaignId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Npc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monster" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT,
    "type" TEXT NOT NULL,
    "alignment" TEXT,
    "armorClass" INTEGER NOT NULL,
    "hitPoints" INTEGER NOT NULL,
    "speed" TEXT NOT NULL,
    "stats" JSONB NOT NULL,
    "languages" TEXT[],
    "challengeRating" DOUBLE PRECISION NOT NULL,
    "traits" TEXT[],
    "actions" TEXT[],
    "legendaryActions" TEXT[],
    "campaignId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Monster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'PLAYER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "summary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignMembership" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "role" "CampaignRole" NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CampaignMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterToSpell" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CharacterToSpell_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CharacterToWeapon" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CharacterToWeapon_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CharacterProficiencies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CharacterProficiencies_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Race_name_key" ON "Race"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_key" ON "Class"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Weapon_name_key" ON "Weapon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "_CharacterToSpell_B_index" ON "_CharacterToSpell"("B");

-- CreateIndex
CREATE INDEX "_CharacterToWeapon_B_index" ON "_CharacterToWeapon"("B");

-- CreateIndex
CREATE INDEX "_CharacterProficiencies_B_index" ON "_CharacterProficiencies"("B");

-- AddForeignKey
ALTER TABLE "Trait" ADD CONSTRAINT "Trait_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trait" ADD CONSTRAINT "Trait_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Archetype" ADD CONSTRAINT "Archetype_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpellSlot" ADD CONSTRAINT "SpellSlot_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSkill" ADD CONSTRAINT "CharacterSkill_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSkill" ADD CONSTRAINT "CharacterSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_archetypeId_fkey" FOREIGN KEY ("archetypeId") REFERENCES "Archetype"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavingThrow" ADD CONSTRAINT "SavingThrow_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Npc" ADD CONSTRAINT "Npc_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Npc" ADD CONSTRAINT "Npc_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monster" ADD CONSTRAINT "Monster_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignMembership" ADD CONSTRAINT "CampaignMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignMembership" ADD CONSTRAINT "CampaignMembership_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToSpell" ADD CONSTRAINT "_CharacterToSpell_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToSpell" ADD CONSTRAINT "_CharacterToSpell_B_fkey" FOREIGN KEY ("B") REFERENCES "Spell"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToWeapon" ADD CONSTRAINT "_CharacterToWeapon_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToWeapon" ADD CONSTRAINT "_CharacterToWeapon_B_fkey" FOREIGN KEY ("B") REFERENCES "Weapon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterProficiencies" ADD CONSTRAINT "_CharacterProficiencies_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterProficiencies" ADD CONSTRAINT "_CharacterProficiencies_B_fkey" FOREIGN KEY ("B") REFERENCES "Proficiency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
