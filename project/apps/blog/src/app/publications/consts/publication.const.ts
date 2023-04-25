export enum PublicationSorting {
  Asc = 'asc',
  Desc = 'desc',
}

export const PublicationQueryDefaultSettings = {
  CountLimit: 10,
  SortDirection: PublicationSorting.Desc,
} as const;
