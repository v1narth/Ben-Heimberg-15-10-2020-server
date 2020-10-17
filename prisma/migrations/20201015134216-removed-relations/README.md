# Migration `20201015134216-removed-relations`

This migration has been generated by v1narth at 10/15/2020, 4:42:16 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Message" DROP CONSTRAINT "Message_receiverId_fkey"

ALTER TABLE "public"."Message" DROP CONSTRAINT "Message_senderId_fkey"

ALTER TABLE "public"."Message" DROP COLUMN "senderId",
DROP COLUMN "receiverId",
ADD COLUMN "sender" integer   NOT NULL ,
ADD COLUMN "receiver" integer   NOT NULL 
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201015061914-initial..20201015134216-removed-relations
--- datamodel.dml
+++ datamodel.dml
@@ -3,23 +3,19 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model Message {
-  id         Int      @id @default(autoincrement())
-  sender     User     @relation("messagesSent", fields: [senderId], references: [id])
-  senderId   Int
-  receiver   User     @relation("messagesReceived", fields: [receiverId], references: [id])
-  receiverId Int
-  message    String
-  subject    String
-  createdAt  DateTime @default(now())
+  id        Int      @id @default(autoincrement())
+  sender    Int
+  receiver  Int
+  message   String
+  subject   String
+  createdAt DateTime @default(now())
 }
 model User {
-  id               Int       @id @default(autoincrement())
-  messagesSent     Message[] @relation("messagesSent")
-  messagesReceived Message[] @relation("messagesReceived")
+  id Int @id @default(autoincrement())
 }
```

