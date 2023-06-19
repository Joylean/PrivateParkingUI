import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateconversion'
})
export class DateconversionPipe implements PipeTransform {

  transform(dateInput: any): any {

    const todayComplex=new Date(dateInput);
    let month = '' + (todayComplex.getMonth() + 1);
    let day = '' + (todayComplex.getDate()-1);
    const year = todayComplex.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    const today=[year, month, day].join('-');

    return today;
  }

}
