// Shared site navigation. Used by the header and the footer.
// Client menu only: Edito · Beauté · Lifestyle · Gourmet · Design · In & Out
export const categories = [
  { key: "edito", label: { EN: "Edito", FR: "Edito" }, to: "/edito" },
  { key: "beauty", label: { EN: "Beauty", FR: "Beauté" }, to: "/#beauty" },
  { key: "lifestyle", label: { EN: "Lifestyle", FR: "Lifestyle" }, to: "/lifestyle" },
  { key: "gourmet", label: { EN: "Gourmet", FR: "Gourmet" }, to: "/gourmet" },
  { key: "design", label: { EN: "Design", FR: "Design" }, to: "/design" },
  // IN = likes = UP / OUT = dislikes = DOWN
  { key: "in-out", label: { EN: "In & Out", FR: "In & Out" }, to: "/in-out" },
];

// Sections that are linked from the site but do not have content yet.
export const forthcomingPages = {
  lifestyle: { title: { EN: "Lifestyle", FR: "Lifestyle" } },
  gourmet: { title: { EN: "Gourmet", FR: "Gourmet" } },
  design: { title: { EN: "Design", FR: "Design" } },
  privacy: { title: { EN: "Privacy Policy", FR: "Confidentialité" } },
  terms: { title: { EN: "Terms & Conditions", FR: "Conditions générales" } },
};
