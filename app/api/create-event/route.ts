// app/api/create-event/route.ts
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !(session as any).accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const accessToken = (session as any).accessToken as string
  const body = await req.json()
  const { fullName, email, phone, company, date, preferredTime, notes } = body

  // date comes from client as "YYYY-MM-DD" (Calendar default)
  const [year, month, day] = date.split("-").map(Number)
  const start = new Date(Date.UTC(year, month - 1, day, Number(preferredTime.split(":")[0]), 0, 0))
  const end = new Date(start.getTime() + 60 * 60 * 1000)

  const event = {
    subject: `Booking: ${fullName}`,
    body: {
      contentType: "HTML",
      content: `<p><strong>Booked by:</strong> ${fullName} (${email})</p>
                <p><strong>Phone:</strong> ${phone || "—"}</p>
                <p><strong>Company:</strong> ${company || "—"}</p>
                <p><strong>Notes:</strong><br/>${notes || "—"}</p>`,
    },
    start: { dateTime: start.toISOString(), timeZone: "UTC" },
    end: { dateTime: end.toISOString(), timeZone: "UTC" },
    attendees: [{ emailAddress: { address: email, name: fullName }, type: "required" }],
  }

  try {
    const resp = await fetch("https://graph.microsoft.com/v1.0/me/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    })

    const data = await resp.json()
    if (!resp.ok) return NextResponse.json({ error: data }, { status: resp.status })
    return NextResponse.json({ success: true, event: data }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}