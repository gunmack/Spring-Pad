export const loadEvents = async (uid) => {
  try {
    const response = await fetch(`/api/events?uid=${uid}`);
    if (!response.ok) throw new Error("Failed to fetch events");

    const data = await response.json();

    const convertedEvents = data.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));

    return convertedEvents;
  } catch (err) {
    console.error("Error loading events:", err);
    return [];
  }
};
