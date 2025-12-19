import { NextResponse } from "next/server";

export interface ApiResponse<T> {
  status: string;
  data?: T;
  message?: string;
}

export function apiResponse<T>(data: T, status: number = 200): NextResponse {
  return NextResponse.json({ status: "success", data }, { status });
}

export function apiError(error: string, status: number = 400): NextResponse {
    return NextResponse.json({ status: "error", message: error }, { status });
}