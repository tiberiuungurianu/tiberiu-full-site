export type SocialLink = {
  label: string;
  detail?: string;
  href: string;
  hero?: boolean;
  verified?: boolean;
  sameAs?: boolean;
  visible?: boolean;
};

export type LinksContent = {
  email: {
    label: string;
    href: string;
  };
  links: SocialLink[];
};

export const linksContent: LinksContent = {
  email: {
    label: "contactiberiu@gmail.com",
    href: "mailto:contactiberiu@gmail.com",
  },
  links: [
    {
      label: "TikTok",
      detail: "@tiberiu",
      href: "https://www.tiktok.com/@tiberiu",
      hero: true,
      verified: true,
    },
    {
      label: "TikTok II",
      detail: "@tiberiu.ungurianu",
      href: "https://www.tiktok.com/@tiberiu.ungurianu",
    },
    {
      label: "Instagram",
      detail: "@tiberiuuuus",
      href: "https://www.instagram.com/tiberiuuuus",
      hero: false,
      visible: false,
    },
    {
      label: "Instagram II",
      detail: "@tiberiu.ungurianu",
      href: "https://www.instagram.com/tiberiu.ungurianu/",
      hero: true,
    },
    {
      label: "YouTube",
      detail: "@tiberiuus",
      href: "https://youtube.com/@tiberiuus?si=awtEfoIEmd600K22",
      hero: false,
      visible: false,
    },
    {
      label: "Famous Birthdays",
      detail: "Profile",
      href: "https://www.famousbirthdays.com/people/tiberiu-ungurianu.html",
    },
    {
      label: "Pinterest",
      detail: "tiberiuseptimiu",
      href: "https://www.pinterest.co.uk/tiberiuseptimiu/",
    },
    {
      label: "Snapchat",
      detail: "tiberiungurianu",
      href: "https://www.snapchat.com/add/tiberiungurianu",
    },
    {
      label: "Wishlist",
      href: "https://www.amazon.co.uk/hz/wishlist/ls/NGODZZNVYEVX?ref_=wl_share",
      sameAs: false,
    },
    {
      label: "Linktree",
      href: "https://linktr.ee/tiberiu.ungurianu",
      visible: false,
    },
  ],
};

export function visibleLinks() {
  return linksContent.links.filter((link) => link.visible !== false);
}

export function sameAsLinks() {
  return linksContent.links
    .filter((link) => link.sameAs !== false)
    .map((link) => link.href);
}
