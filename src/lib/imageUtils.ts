export const CAMPUS_IMAGES = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=800"
];

export function getPlaceholderCampus(name: string = ""): string {
  if (!name) return CAMPUS_IMAGES[0];
  return CAMPUS_IMAGES[name.length % CAMPUS_IMAGES.length];
}

export function getPlaceholderLogo(name: string = ""): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Uni')}&size=128&background=4F46E5&color=fff&bold=true`;
}
