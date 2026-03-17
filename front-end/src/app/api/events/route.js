import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();
    const { uid, title, description, start, end } = body;

    const filePath = path.join(process.cwd(), "data/events.json");

    const fileData = fs.readFileSync(filePath, "utf-8");
    const events = JSON.parse(fileData);

    const newEvent = {
      uid: body.uid,
      id: crypto.randomUUID(),
      title: body.title,
      description: body.description,
      start: body.start,
      end: body.end,
    };

    events.push(newEvent);

    fs.writeFileSync(filePath, JSON.stringify(events, null, 2));

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add event" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    const filePath = path.join(process.cwd(), "data/events.json");
    const fileData = fs.readFileSync(filePath, "utf-8");
    const events = JSON.parse(fileData);

    let fetchedEvents = events;

    if (uid) {
      fetchedEvents = events.filter((e) => e.uid === String(uid));
    }
    return NextResponse.json(fetchedEvents, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 },
    );
  }
}
