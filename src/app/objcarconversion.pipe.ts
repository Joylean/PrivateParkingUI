import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objcarconversion'
})
export class ObjcarconversionPipe implements PipeTransform {

  val: any[] = [];
  transform(ob: any): any {
    for (let va of ob) {
      this.val.push(va["car_text"]);
    }
    return this.val;
  }

}
