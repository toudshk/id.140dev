/**
 * Типы данных портфолио id.140dev.
 */

export type Block = {
  kind: "image" | "quote" | "text" | "spec" | "code";
  body: string;
  caption?: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  year: string;
  client: string;
  status: "live" | "private" | "wip";
  role: string;
  external?: { label: string; href: string };
  blocks: Block[];
};
