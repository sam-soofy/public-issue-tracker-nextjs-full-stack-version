import {
  pgTable,
  varchar,
  timestamp,
  uuid,
  text,
  pgEnum,
  unique,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

export const UserRoles = pgEnum("user_role", [
  "SUPER",
  "ADMIN",
  "SUPPORT",
  "BASIC",
]);

export const UsersTable = pgTable(
  "user",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    first_name: varchar("first_name", { length: 120 }).notNull(),
    last_name: varchar("last_name", { length: 120 }).notNull(),
    email: varchar("email", { length: 250 }).notNull().unique(),
    mobile: varchar("mobile", { length: 16 }).notNull().unique(),
    mobile_country_code: varchar("mobile_country_code", {
      length: 4,
    }).notNull(),
    role: UserRoles("user_role").default("BASIC").notNull(),
  },
  (table) => {
    return [
      // Example blow is a Composite Unique Constrain, that we do not want here!
      // unique("unique_email_and_mobile").on(table.email, table.mobile),
      uniqueIndex("email_index").on(table.email),
      uniqueIndex("mobile_index").on(table.mobile),
      index("mobile_country_code_index").on(table.mobile_country_code),
    ];
  },
);

export const IssueStatus = pgEnum("issue_status", [
  "TODO",
  "IN_PROGRESS",
  "REVIEW",
  "DEBUG",
  "DONE",
  "DEPLOYED",
]);

export const IssuesTable = pgTable("issue", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 120 }).notNull(),
  description: text("description").notNull(),
  status: IssueStatus("issue_status").default("TODO").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
