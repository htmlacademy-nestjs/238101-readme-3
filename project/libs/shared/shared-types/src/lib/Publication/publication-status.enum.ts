export const PublicationStatus = {
  Draft: 'Draft',
  Published: 'Published',
} as const;

export type PublicationStatus =
  (typeof PublicationStatus)[keyof typeof PublicationStatus];
