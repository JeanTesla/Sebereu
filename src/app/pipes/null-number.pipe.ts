import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'nullNumber'
})
export class NullNumberPipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) {}
  
  public transform(value: Number | null | undefined): Number {
   if(!value) return 0;
   else return Number(value);
  }

}