import { REGION_MAP } from "./maps";

export const makeBadges = (r) => [
  {
    text: REGION_MAP[r.region_id],
    color: "blue",
  },
  ...(r.categories ?? []).map((c) => ({
    text: c.category_name,
    color: "teal",
  })),
];
