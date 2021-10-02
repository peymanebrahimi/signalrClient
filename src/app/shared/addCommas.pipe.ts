import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'addCommas' })
export class AddCommasPipe implements PipeTransform {
  transform(authors: null | string[]) {
    if (!authors) {
      return '';
    }

    switch (authors.length) {
      case 0:
        return '';
      case 1:
        return authors[0];
      case 2:
        return authors.join(' و ');
      default:
        const last = authors[authors.length - 1];
        const remaining = authors.slice(0, -1);
        return `${remaining.join('، ')}، و ${last}`;
    }
  }
}
