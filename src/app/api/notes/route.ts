// Minimal API route to satisfy Next.js module typing
export async function GET() {
  return Response.json({ status: "ok" });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  return Response.json({ received: body ?? null }, { status: 201 });
}