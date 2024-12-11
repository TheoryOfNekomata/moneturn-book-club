import * as React from 'react';
import { Author, Book } from '@/models';

export const useOmnisearch = () => {
  const [books, setBooks] = React.useState<Book[]>();
  const [authors, setAuthors] = React.useState<Author[]>();
  const [isBlankQuery, setIsBlankQuery] = React.useState(true);

  const handleSearchFormSubmit = React.useCallback<React.FormEventHandler<HTMLElementTagNameMap['form']>>(async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const queryRaw = formData.get('q');
    const query = typeof queryRaw === 'string' ? queryRaw.trim() : '';

    if (query.length > 0) {
      const search = new URLSearchParams({
        q: query,
      });

      const booksUrl = new URL('/api/books', `http://${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}`);
      booksUrl.search = search.toString();
      const booksResponse = await fetch(booksUrl, {
        method: 'GET',
      });
      const booksData = await booksResponse.json();
      setBooks(booksData);

      const authorsUrl = new URL('/api/authors', `http://${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}`);
      authorsUrl.search = search.toString();
      const authorsResponse = await fetch(authorsUrl, {
        method: 'GET',
      });
      const authorsData = await authorsResponse.json();
      setAuthors(authorsData);

      setIsBlankQuery(false);
      return;
    }

    setIsBlankQuery(true);
  }, []);

  return React.useMemo(() => ({
    handleSearchFormSubmit,
    books,
    authors,
    isBlankQuery,
  }), [books, authors, isBlankQuery, handleSearchFormSubmit]);
};

export const useFeatured = () => {
  const [featured, setFeatured] = React.useState<Book[]>();

  React.useEffect(() => {
    const loadBooks = async () => {
      const booksUrl = new URL('/api/books', `http://${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}`);
      const booksResponse = await fetch(booksUrl, {
        method: 'GET',
      });
      const booksData = await booksResponse.json();
      setFeatured(booksData);
    };

    void loadBooks();
  }, []);

  return React.useMemo(() => ({
    featured,
  }), [featured]);
};
