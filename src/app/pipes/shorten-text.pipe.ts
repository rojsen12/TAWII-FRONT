import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText'
})
export class ShortenTextPipe implements PipeTransform {

  transform(value: string, limit: number = 200): string {
    if (!value) return '';

    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
