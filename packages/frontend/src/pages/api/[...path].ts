import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { path: pathRaw, ...etcQueryRaw } = req.query;
  const pathStr = typeof pathRaw === 'string' ? pathRaw : (pathRaw?.join('/') ?? '');
  const backendUrl = new URL(`/api/${pathStr}`, `http://${process.env.BACKEND_BASE_URL}`);
  const etcQuery = Object.fromEntries(
    Object.entries(etcQueryRaw).map(([key, value]) => [
      key,
      typeof value === 'string' ? value : value?.join('') ?? ''
    ])
  );
  const query = new URLSearchParams(etcQuery);
  backendUrl.search = query.toString();

  const method = req.method ?? 'GET';
  const fetchInit = {
    method,
    headers: {
      'Accept': 'application/json',
    },
  };

  if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) && req.body) {
    (fetchInit as Record<string, unknown>).body = JSON.stringify(req.body);
    (fetchInit.headers as Record<string, unknown>)['Content-Type'] = 'application/json';
  }

  const response = await fetch(backendUrl, fetchInit);

  if (!response.ok) {
    if (400 <= response.status && response.status <= 499) {
      res.status(response.status).end();
      return;
    }
    res.status(502).end();
    return;
  }

  const data = await response.json();

  res.status(response.status).json(data);
};

export default handler;
