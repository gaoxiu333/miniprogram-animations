-- CreateTable
CREATE TABLE "Drink" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isSpecial" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "abv" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "taste" TEXT,
    "special_recipe" BOOLEAN,
    "features" TEXT,
    "price" REAL,
    "occasion" TEXT,
    "type" TEXT,
    "href" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Drink_uid_key" ON "Drink"("uid");
