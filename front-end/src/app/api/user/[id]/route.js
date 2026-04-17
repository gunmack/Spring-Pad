// User endpoint
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, uid } = body;

    const getUser = await fetch(
      `https://api-spring-pad.onrender.com/api/get_user/${body.uid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    let user;
    if (getUser.ok) {
      user = await getUser.json();
    }

    if (!user) {
      const createUser = await fetch(
        `https://api-spring-pad.onrender.com/api/create_user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, uid }),
        },
      );
      if (!createUser.ok) {
        const err = await createUser.json();
        return NextResponse.json({ error: err.message }, { status: 500 });
      }

      const newUser = await createUser.json();
      return NextResponse.json({ message: newUser }, { status: 201 });
    }
    return NextResponse.json({ message: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
