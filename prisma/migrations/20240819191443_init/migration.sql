-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_userId_title_key" ON "Task"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
