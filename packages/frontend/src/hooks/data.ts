import * as React from 'react';

export interface UseDataArgs {
  basePath: string;
  attribute?: string;
  id: string;
}

export const useData = <T>(args: UseDataArgs) => {
  const [data, setData] = React.useState<T>();

  React.useEffect(() => {
    const loadData = async () => {
      const booksUrl = (
        typeof args.attribute === 'string'
          ? new URL(`${args.basePath}/${args.id}/${args.attribute}`, `http://${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}`)
          : new URL(`${args.basePath}/${args.id}`, `http://${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}`)
      );
      const booksResponse = await fetch(booksUrl, {
        method: 'GET',
      });
      const booksData = await booksResponse.json();
      setData(booksData);
    };

    void loadData();
  }, [args.basePath, args.id, args.attribute]);

  return React.useMemo(() => ({
    data,
  }), [data]);
};
