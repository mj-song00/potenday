import { CreateImageDto } from 'src/diary/dto/image.dto';

export type imageArgs = CreateImageDto;

export type Image = {
  id: string;
  model_version: string;
  images: {
    id: string;
    seed: number;
    image: string;
  };
};
