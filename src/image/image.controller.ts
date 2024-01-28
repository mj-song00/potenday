import { Body, Controller, Get } from '@nestjs/common';
import { CreateImageDto } from './dto/image.dto';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('generate-image')
  async generateImage(@Body() createImageDto: CreateImageDto) {
    const negativePrompt = 'dark' + 'gloomy';

    try {
      const response = await this.imageService.generateImage(
        createImageDto,
        negativePrompt,
      );

      const imageUrl = response.data.images[0].image;

      return { imageUrl };
    } catch (error) {
      console.error('Error:', error);
      return { error: 'Failed to generate image.' };
    }
  }
}
