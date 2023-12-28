import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class FormatDateService {
  formatDate(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }
}
