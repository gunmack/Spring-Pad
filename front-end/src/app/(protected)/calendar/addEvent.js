export const handleAdd = async (data) => {
  try {
    const response = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Status:", response.status);
    console.log("OK:", response.ok);

    const text = await response.text();
    console.log("Response body:", text);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
