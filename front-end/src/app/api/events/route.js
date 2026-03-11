import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const body = await req.json();
  const { title, description, start, end } = body;

  const filePath = path.join(process.cwd(), "public/data/events.json");

  const fileData = fs.readFileSync(filePath, "utf-8");
  const events = JSON.parse(fileData);

  const newEvent = {
    id: events.length + 1,
    title: body.title,
    description: body.description,
    start: body.start,
    end: body.end,
  };

  events.push(newEvent);

  fs.writeFileSync(filePath, JSON.stringify(events, null, 2));

  return NextResponse.json(newEvent, { status: 201 });
}
