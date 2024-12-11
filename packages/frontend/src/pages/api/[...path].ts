import type { NextApiRequest, NextApiResponse } from 'next';

const getBookData = async () => {
  return [

  ];
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  // TODO make this a proxy instead to the backend
  const pathStrRaw = typeof req.query.path === 'string' ? req.query.path : req.query.path.join('/');
  const pathStr = pathStrRaw.startsWith('/') ? pathStrRaw : `/${pathStrRaw}`;
  switch (pathStr) {
    case '/books':
      res.status(200).json(await getBookData());
      return;
    case '/authors':
      res.status(200)
  }

  res.status(404).json({});
};

export default handler;
