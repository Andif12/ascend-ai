export function parseSections(text) {
  if (!text) return [];

  const sections = text.split(/\d\.\s+/).filter(Boolean);

  const titles = [
    "Future You Says",
    "What Happens If Nothing Changes",
    "Hidden Opportunity",
    "Next 7 Days Plan",
    "Success Trajectory"
  ];

  return sections.map((item, index) => ({
    title: titles[index],
    content: item
  }));
}