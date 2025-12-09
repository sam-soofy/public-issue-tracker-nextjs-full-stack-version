import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { IssuesTable } from "@/db/schema";

export const IssuePostBody = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().max(1000).optional(),
});

const IssueSchema = z.object({
  id: z.uuid().describe("Issue ID"),
  title: z.string().describe("Issue title"),
  description: z.string().describe("Issue description"),
  status: z
    .enum(["TODO", "IN_PROGRESS", "REVIEW", "DEBUG", "DONE", "DEPLOYED"])
    .describe("Issue status"),
  created_at: z.iso.datetime().describe("Creation time"),
  updated_at: z.iso.datetime().describe("Last update time"),
});

export const IssuePostResponse = z.object({
  status: z.literal("success"),
  data: IssueSchema,
});

export const IssuePostError = z.object({
  status: z.literal("error"),
  message: z.any(),
});

export const IssueGetAllResponse = z.object({
  status: z.literal("success"),
  data: z.array(IssueSchema),
});

/**
 * Create a new issue
 * @description Creates a new issue in the tracker
 * @body IssuePostBody
 * @response 201:IssuePostResponse
 * @response 400:IssuePostError
 * @openapi
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = IssuePostBody.safeParse(body);
  if (!validation.success) {
    const invalidFields = validation.error.issues[0].path.join(", ");
    return NextResponse.json(
      {
        status: "error",
        message: validation.error.issues[0].message + " : " + invalidFields,
      },
      { status: 400 },
    );
  }

  // Creating the Issue on DB
  const [newIssue] = await db
    .insert(IssuesTable)
    .values(validation.data)
    .returning();

  return NextResponse.json(
    {
      status: "success",
      data: newIssue,
    },
    { status: 201 },
  );
}

/**
 * Get all Issues
 * @description Fetches all the issues in the tracker
 * @body [IssueSchema]
 * @response 200:IssueGetAllResponse
 * @openapi
 */
export async function GET(req: NextRequest) {
  // For now we hard coded, but later we should get a query param
  const dateSort = "asc";
  const issues = await db.query.IssuesTable.findMany({
    // orderBy: (issues, { asc, desc, sql }) => [asc(issues.created_at)],
    orderBy: (issues, funcs) => funcs[dateSort](issues.created_at),
  });

  return NextResponse.json(
    {
      status: "success",
      data: issues,
    },
    { status: 200 },
  );
}

/**
 *
 */
