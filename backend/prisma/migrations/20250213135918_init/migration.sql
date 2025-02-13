-- CreateTable
CREATE TABLE "UserUploads" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "emailName" TEXT NOT NULL,
    "uploadedFilname" TEXT NOT NULL,
    CONSTRAINT "UserUploads_emailName_fkey" FOREIGN KEY ("emailName") REFERENCES "Users" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
