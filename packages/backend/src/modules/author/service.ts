import { Author } from '../../models';

const DUMMY_DATA: Author[] = [
  {
    id: '1',
    name: 'Author name',
  },
  {
    id: '2',
    name: 'Very long author name',
  },
  {
    id: '3',
    name: 'Author name',
  },
  {
    id: '4',
    name: 'Very long author name',
  },
  {
    id: '5',
    name: 'Author name',
  },
  {
    id: '6',
    name: 'Very long author name',
  },
  {
    id: '7',
    name: 'Author name',
  },
  {
    id: '8',
    name: 'Very long author name',
  },
];

export const findMultipleAuthors = async (query?: string): Promise<Author[]> => {
  if (typeof query === 'undefined') {
    return DUMMY_DATA;
  }

  const queryNormalized = query.toLowerCase();
  return DUMMY_DATA.filter((d) => {
    const name = d.name.toLowerCase();
    return name.includes(queryNormalized);
  });
};

export const findOneAuthor = async (authorId: Author['id']): Promise<Author | undefined> => {
  return DUMMY_DATA.find((d) => d.id === authorId);
};

export const createNewAuthor = async (authorDataParams: Partial<Author>): Promise<Author | undefined> => {
  const newAuthor = authorDataParams as Author;
  DUMMY_DATA.push(newAuthor);
  return newAuthor;
};

export const updateExistingAuthor = async (authorId: Author['id']) => {
  const existingAuthorIndex = DUMMY_DATA.findIndex((d) => d.id === authorId);
  return async (authorDataParams: Partial<Author>): Promise<Author | undefined> => {
    if (existingAuthorIndex > -1) {
      const newData = { ...authorDataParams, id: authorId } as Author;
      DUMMY_DATA.splice(existingAuthorIndex, 1, newData);
      return newData;
    }
    return undefined;
  };
};

export const deleteExistingAuthor = async (authorId: Author['id']): Promise<void> => {
  const existingAuthorIndex = DUMMY_DATA.findIndex((d) => d.id === authorId);
  if (existingAuthorIndex > -1) {
    DUMMY_DATA.splice(existingAuthorIndex, 1);
  }
};
