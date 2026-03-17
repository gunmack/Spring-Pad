import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userEmail, noteType, noteData } = body;

    const filePath = path.join(process.cwd(), "data/notes.json");

    const fileData = fs.readFileSync(filePath, "utf-8");
    const notes = JSON.parse(fileData);

    const newNote = {
      n_id: crypto.randomUUID(),
      n_owner: userEmail,
      n_type: noteType || "DEFAULT",
      n_data: noteData,
    };

    notes.push(newNote);

    fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add note" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("userEmail");

    const filePath = path.join(process.cwd(), "data/notes.json");
    const fileData = fs.readFileSync(filePath, "utf-8");
    const notes = JSON.parse(fileData);

    let fetchedNotes = notes;

    if (userEmail) {
      fetchedNotes = notes.filter((n) => n.n_owner === String(userEmail));
    }
    return NextResponse.json(fetchedNotes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 },
    );
  }
}
