export async function POST(request) {
  try {
    const body = await request.json()

    const endpoint = process.env.FEEDBACK_ENDPOINT
    if (!endpoint) {
      return Response.json({ error: 'Feedback endpoint not configured' }, { status: 503 })
    }

    const payload = JSON.stringify(body)

    // Google Apps Script issues a 302 redirect on the initial POST.
    // Node fetch with redirect:'follow' converts the reissued request to GET,
    // so doPost never runs. We follow the redirect manually to keep POST.
    let res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: payload,
      redirect: 'manual',
    })

    if ([301, 302, 307, 308].includes(res.status)) {
      const location = res.headers.get('location')
      if (location) {
        res = await fetch(location, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: payload,
        })
      }
    }

    if (!res.ok) {
      return Response.json({ error: 'Upstream error', status: res.status }, { status: 502 })
    }

    return Response.json({ result: 'success' })
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 })
  }
}
