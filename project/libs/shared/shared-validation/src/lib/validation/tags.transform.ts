export const transformTags = (tags: string[]) => {
  const uniqueTags = Array.from(new Set<string>(tags));
  return uniqueTags.map((tag) => tag.toLowerCase());
};
