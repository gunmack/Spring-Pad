export const loadNotes = async (userEmail) => {
  try {
    const response = await fetch(`/api/notes?userEmail=${userEmail}`);
    if (!response.ok) throw new Error("Failed to fetch notes");

    const data = await response.json();

    const groupedNotes = data.reduce((acc, note) => {
      const type = note.n_type || "DEFAULT";
      const { n_id, n_type, n_data } = note;

      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push({ n_id, n_type, n_data });

      return acc;
    }, {});

    return groupedNotes;
  } catch (err) {
    console.error("Error loading notes:", err);
    return {};
  }
};
