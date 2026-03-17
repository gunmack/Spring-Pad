export async function addNote(userEmail, newNoteContent, noteType) {
  try {
    console.log("Adding note for user:", userEmail, newNoteContent);
    const response = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: userEmail,
        noteType: noteType,
        noteData: newNoteContent,
      }),
    });

    if (!response.ok) throw new Error("Failed to add note");

    const savedNote = await response.json();
    console.log("Note added successfully:", savedNote);
    return savedNote;
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
}
