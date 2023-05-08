export enum Sorting {
  Asc = 'asc',
  Desc = 'desc',
}

export enum PublicationSortKind {
  PublishedDate = 'PublishedDate',
  Likes = 'Likes',
  Comments = 'Comments',
}

export const PublicationQueryDefaultSettings = {
  CountLimit: 25,
  PublishedDate: Sorting.Desc,
  Likes: Sorting.Desc,
  Comments: Sorting.Desc,
} as const;
