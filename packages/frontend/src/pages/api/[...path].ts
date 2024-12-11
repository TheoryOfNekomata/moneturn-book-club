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

  console.log(backendUrl.toString());

  const response = await fetch(backendUrl, {
    method: req.method,
  });

  if (!response.ok) {
    res.status(502).end();
    return;
  }

  const data = await response.json();

  res.status(response.status).json(data);
};

export default handler;
