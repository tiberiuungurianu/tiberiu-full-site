export type GalleryItem = {
  id: string;
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  index: string;
  featured?: boolean;
};

export const gallery: GalleryItem[] = [
  {
    id: "beauty",
    src: "/images/tiberiu-ungurianu-beauty-editorial.webp",
    srcSet:
      "/images/tiberiu-ungurianu-beauty-editorial-1200.webp 1200w, /images/tiberiu-ungurianu-beauty-editorial.webp 1237w",
    width: 1237,
    height: 1600,
    alt: "Beauty editorial portrait of Tiberiu Ungurianu",
    caption: "Beauty",
    index: "01",
    featured: true,
  },
  {
    id: "roots",
    src: "/images/tiberiu-ungurianu-back-to-roots.webp",
    width: 1068,
    height: 1600,
    alt: "Back to Roots editorial of Tiberiu",
    caption: "Editorial",
    index: "02",
  },
  {
    id: "fashion",
    src: "/images/tiberiu-ungurianu-sunglasses-editorial-1200.webp",
    width: 1200,
    height: 1600,
    alt: "Fashion editorial of Tiberiu in sunglasses",
    caption: "Fashion",
    index: "03",
  },
  {
    id: "closeup",
    src: "/images/tiberiu-ungurianu-editorial-closeup.webp",
    srcSet:
      "/images/tiberiu-ungurianu-editorial-closeup-1200.webp 1200w, /images/tiberiu-ungurianu-editorial-closeup.webp 1236w",
    width: 1236,
    height: 1600,
    alt: "Editorial close-up of Tiberiu",
    caption: "Close-up",
    index: "04",
  },
  {
    id: "campaign",
    src: "/images/tiberiu-ungurianu-leather-editorial.webp",
    srcSet:
      "/images/tiberiu-ungurianu-leather-editorial-1200.webp 1200w, /images/tiberiu-ungurianu-leather-editorial.webp 1236w",
    width: 1236,
    height: 1600,
    alt: "Black and white leather campaign shot of Tiberiu",
    caption: "Campaign",
    index: "05",
  },
];
