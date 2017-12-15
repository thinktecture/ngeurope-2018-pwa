import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayText'
})
export class DisplayTextPipe implements PipeTransform {
  public transform(value: any, ...args: any[]): any {
    let displayText = value;

    if (Array.isArray(value)) {
      displayText = value.join(' ');
    }

    return displayText;
  }

}
