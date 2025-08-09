export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  return Response.json({ submitted: true, data: body }, { status: 201 });
}