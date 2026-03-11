import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const body = await req.json();
  const { title, description, start, end } = body;

  const filePath = path.join(process.cwd(), "data/events.json");

  const fileData = fs.readFileSync(filePath, "utf-8");
  const events = JSON.parse(fileData);

  const newEvent = {
    id: crypto.randomUUID(),
    title: body.title,
    description: body.description,
    start: body.start,
    end: body.end,
  };

  events.push(newEvent);

  fs.writeFileSync(filePath, JSON.stringify(events, null, 2));

  return NextResponse.json(newEvent, { status: 201 });
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data/events.json");
    const fileData = fs.readFileSync(filePath, "utf-8");
    const events = JSON.parse(fileData);
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 },
    );
  }
}
