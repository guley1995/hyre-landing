import { NextResponse } from "next/server";

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function getRateLimitKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(key, { count: 1, resetAt: now + 3600000 });
    return true;
  }

  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

function sanitize(str: string): string {
  return str
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "")
    .slice(0, 2000)
    .trim();
}

export async function POST(request: Request) {
  try {
    const ip = getRateLimitKey(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte versuchen Sie es spaeter erneut." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, company, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, E-Mail und Nachricht sind Pflichtfelder." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Bitte geben Sie eine gueltige E-Mail-Adresse ein." },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: "Die Nachricht muss mindestens 10 Zeichen lang sein." },
        { status: 400 }
      );
    }

    const sanitizedData = {
      name: sanitize(name),
      email: sanitize(email),
      company: company ? sanitize(company) : "",
      phone: phone ? sanitize(phone) : "",
      message: sanitize(message),
      timestamp: new Date().toISOString(),
    };

    console.log("=== Neue Kontaktanfrage (huehyre.de) ===");
    console.log(JSON.stringify(sanitizedData, null, 2));

    return NextResponse.json({
      success: true,
      message: "Nachricht erfolgreich gesendet.",
    });
  } catch {
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten." },
      { status: 500 }
    );
  }
}
