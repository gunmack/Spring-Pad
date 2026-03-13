import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function DELETE(req, context) {
  try {
    const params = await context.params; // <-- unwrap the Promise
    const id = parseInt(params.id, 10);

    const filePath = path.join(process.cwd(), "data/notes.json");

    const fileData = fs.readFileSync(filePath, "utf-8");
    const notes = JSON.parse(fileData);

    const updatedNotes = notes.filter((n) => n.n_id !== id);

    fs.writeFileSync(filePath, JSON.stringify(updatedNotes, null, 2));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
