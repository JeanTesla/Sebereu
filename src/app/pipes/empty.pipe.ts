import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'empty'
})
export class EmptyPipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) {}
  
  public transform(value: String): String {
   return value == "" ? "Não informado" : value;
  }

}