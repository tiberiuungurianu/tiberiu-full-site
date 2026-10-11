export type GalleryItem = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  index: string;
  featured?: boolean;
  objectPosition?: string;
};

export const gallery: GalleryItem[] = [
  {
    id: "beauty",
    src: "/images/tiberiu-ungurianu-beauty-editorial.JPG",
    width: 1583,
    height: 2048,
    alt: "Beauty editorial portrait of Tiberiu Ungurianu",
    caption: "Beauty",
    index: "01",
    featured: true,
    objectPosition: "50% 18%",
  },
  {
    id: "roots",
    src: "/images/tiberiu-ungurianu-back-to-roots.JPG",
    width: 2734,
    height: 4096,
    alt: "Back to Roots editorial of Tiberiu",
    caption: "Roots",
    index: "02",
    objectPosition: "48% 30%",
  },
  {
    id: "fashion",
    src: "/images/tiberiu-ungurianu-sunglasses-editorial.JPG",
    width: 3024,
    height: 4032,
    alt: "Fashion editorial of Tiberiu in sunglasses",
    caption: "Sunglasses",
    index: "03",
    objectPosition: "55% 22%",
  },
  {
    id: "closeup",
    src: "/images/tiberiu-ungurianu-editorial-closeup.JPG",
    width: 2550,
    height: 3300,
    alt: "Editorial close-up of Tiberiu",
    caption: "Close",
    index: "04",
    objectPosition: "50% 12%",
  },
  {
    id: "campaign",
    src: "/images/tiberiu-ungurianu-leather-editorial.JPG",
    width: 2550,
    height: 3300,
    alt: "Black and white leather campaign shot of Tiberiu",
    caption: "Leather",
    index: "05",
    objectPosition: "42% 28%",
  },
];
