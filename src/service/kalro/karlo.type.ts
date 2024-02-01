export type Image = {
  id: string;
  model_version: string;
  images: {
    id: string;
    seed: number;
    image: string;
  };
};
