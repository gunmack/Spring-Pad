export const loadNotes = async (userEmail) => {
  try {
    const response = await fetch(`/api/notes?userEmail=${userEmail}`);
    if (!response.ok) throw new Error("Failed to fetch notes");

    const data = await response.json();

    const convertedNotes = data.map((note) => ({
      ...note,
      id: note.n_id, // add n_idr as a copy of n_id
    }));

    return convertedNotes;
  } catch (err) {
    console.error("Error loading notes:", err);
    return [];
  }
};
