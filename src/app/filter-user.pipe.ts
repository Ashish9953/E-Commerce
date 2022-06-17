import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(value: any, name:any): any {
    if(name===''){
      return value;
    }
    return value.filter((value1:any)=>
    ((String(value1.id).startsWith(name))||
      (value1.firstName).toLowerCase().startsWith(name))
   
    );
  }


}
