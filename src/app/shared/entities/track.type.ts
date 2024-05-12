export type Track = {
  id: string;
  image?: string;
  artists: [{ id: string; name: string }];
  duration: number;
  name: string;
  previewUrl: string;
};
