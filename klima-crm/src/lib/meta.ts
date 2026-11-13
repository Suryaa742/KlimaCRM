export const meta = (title: string, description: string) => ({
  meta: [
    { title: `${title} – KlimaCRM` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} – KlimaCRM` },
    { property: "og:description", content: description },
  ],
});
