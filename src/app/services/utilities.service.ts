import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(
  ) {

  }

  hexToRgbColor(hex: any, opacity: number = 1): string | null {
    const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (normal) return 'rgba(' + normal.slice(1).map((e: string) => parseInt(e, 16)) + ',' + opacity.toString() + ')';

    const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
    if (shorthand) return 'rgba(' + shorthand.slice(1).map((e: string) => 0x11 * parseInt(e, 16)) + ',' + opacity.toString() + ')';

    return null;
  }

  capitalizeFirst(text: string | null): string | null{
    if(!text){ return text }
    const lowercase = text.toLowerCase();
    const firstCapitalize = lowercase.charAt(0).toUpperCase();

    return firstCapitalize + lowercase.slice(1);
  }

  formato_FechaString(fecha: Date): string {
    // Retorna una cadena con la fecha establecida
    // dd-MM-yyyy
    let month = '' + (fecha.getMonth() + 1);
    let day = '' + fecha.getDate();
    const year = fecha.getFullYear();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    return [day, month, year].join('-');
  }

  get screenSmall(): boolean{
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width < 768;
  }

  get screenMedium(): boolean{
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return (width >= 768 && width < 992);
  }

  get screenLarge(): boolean{
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width > 992;
  }


}
