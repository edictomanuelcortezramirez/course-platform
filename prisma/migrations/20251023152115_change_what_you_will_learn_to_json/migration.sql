-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "image" TEXT,
    "accessType" TEXT,
    "hasCertificate" BOOLEAN NOT NULL DEFAULT false,
    "hasEvaluation" BOOLEAN NOT NULL DEFAULT false,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "instructorId" INTEGER NOT NULL,
    "language" TEXT,
    "updateDate" DATETIME,
    "whatYouWillLearn" JSONB NOT NULL DEFAULT [],
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Course" (
  "accessType", "createdAt", "description", "hasCertificate", "hasEvaluation",
  "id", "image", "instructorId", "isPaid", "isPublished",
  "language", "price", "title", "updateDate", "updatedAt", "whatYouWillLearn"
)
SELECT 
  "accessType", "createdAt", "description", "hasCertificate", "hasEvaluation",
  "id", "image", "instructorId", "isPaid", "isPublished",
  "language", "price", "title", "updateDate", "updatedAt",
  coalesce("whatYouWillLearn", '') AS "whatYouWillLearn"
FROM "Course";

DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
