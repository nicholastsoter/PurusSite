export async function POST(request) {
  try {
    const body = await request.json()

    const endpoint = process.env.FEEDBACK_ENDPOINT
    if (!endpoint) {
      return Response.json({ error: 'Feedback endpoint not configured' }, { status: 503 })
    }

    const payload = JSON.stringify(body)

    // GAS runs doPost on the initial POST, then issues a 302 to a googleusercontent
    // echo URL where the response is stored. Node fetch with redirect:'follow' auto-
    // converts to GET on 302, which is exactly what we want to retrieve the response.
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: payload,
      redirect: 'follow',
    })

    if (!res.ok) {
      return Response.json({ error: 'Upstream error', status: res.status }, { status: 502 })
    }

    return Response.json({ result: 'success' })
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 })
  }
}
