import { Image } from '../entities';

const defaultImageUrl: string =
  'https://ionicframework.com/docs/img/demos/avatar.svg';

export function getImageAdapter(
  images: Image[] | null,
  index: number = 0
): string {
  if (!images || index < 0 || index > images.length || !images[index].url)
    return defaultImageUrl;

  return images[index].url;
}
