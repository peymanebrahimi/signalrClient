import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({
  name: 'jalaliDate'
})
export class JalaliDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // return moment(value).format('jYYYY/jMM/jDD');
    let MomentDate = moment(value);
    return MomentDate.locale('fa').format("YYYY/M/D");
  }

}

@Pipe({
  name: 'jalaliTime'
})
export class JalaliTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return moment(value).format('jYYYY/jMM/jDD hh:mm:ss');
  }

}
