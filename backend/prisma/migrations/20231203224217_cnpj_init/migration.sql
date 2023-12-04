-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "wallet" TEXT,
    "role" TEXT,
    "cnpj" TEXT,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("cpf", "id", "nome", "password", "role", "wallet") SELECT "cpf", "id", "nome", "password", "role", "wallet" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
CREATE UNIQUE INDEX "User_wallet_key" ON "User"("wallet");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
