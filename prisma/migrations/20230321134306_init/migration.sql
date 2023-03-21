-- CreateTable
CREATE TABLE "Tithe" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Tithe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneralTithe" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "amount" TEXT NOT NULL,

    CONSTRAINT "GeneralTithe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tithe" ADD CONSTRAINT "Tithe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
