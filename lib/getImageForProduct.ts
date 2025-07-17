// lib/getImageForProduct.ts
export const staticImages = [
  "/images/jewelry1.png",
  "/images/jewelry2.png",
  "/images/jewelry3.png",
  "/images/jewelry4.png",
  "/images/jewelry5.png",
  "/images/jewelry6.png",
  "/images/jewelry7.png",
  "/images/jewelry8.png",
  "/images/jewelry9.png",
  "/images/jewelry10.png",
];

export function getImageForProductId(id: string): string {
  const index =
    [...id].reduce((acc, c) => acc + c.charCodeAt(0), 0) % staticImages.length;
  return staticImages[index];
}
