import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const data = [
    { id: 1, name: "Begad", age: 23 },
    { id: 2, name: "yara", age: 23 },
  ];
  return NextResponse.json(data);
}
