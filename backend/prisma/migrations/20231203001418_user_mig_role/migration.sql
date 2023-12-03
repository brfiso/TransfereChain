/*
  Warnings:

  - You are about to drop the column `roles` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "wallet" TEXT,
    "role" TEXT,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("cpf", "id", "nome", "password", "wallet") SELECT "cpf", "id", "nome", "password", "wallet" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_nome_key" ON "User"("nome");
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
CREATE UNIQUE INDEX "User_wallet_key" ON "User"("wallet");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
