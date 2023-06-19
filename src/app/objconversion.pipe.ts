import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objconversion'
})
export class ObjconversionPipe implements PipeTransform {

  val:any[]=[];
  transform(ob:any): any {
    for(let va of ob){
      this.val.push(va["item_text"]);
    }
    return this.val;
  }

}
