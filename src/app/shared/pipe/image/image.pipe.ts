import {Pipe, PipeTransform} from "@angular/core";
import {Image} from "../../entities";

@Pipe({
  name: 'image',
  standalone: true,
})
export class ImagePipe implements PipeTransform {
  private readonly defaultImageUrl: string =
    'https://ionicframework.com/docs/img/demos/avatar.svg';

  transform(images: Image[] | undefined | undefined,
            index: number = 0): string {
    if (!images || index < 0 || index > images.length || !images[index].url)
      return this.defaultImageUrl;

    return images[index].url;
  }
}
