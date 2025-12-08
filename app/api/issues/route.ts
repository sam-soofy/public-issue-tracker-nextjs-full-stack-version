import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { IssuesTable } from "@/db/schema";

const issuePostBody = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().max(1000),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = issuePostBody.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      {
        status: "error",
        message: validation.error,
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
