/** Prefix a public/ path with NEXT_PUBLIC_BASE_PATH for sub-folder hosting. */
export const asset = (path: string): string =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path.startsWith("/") ? path : `/${path}`}`;
