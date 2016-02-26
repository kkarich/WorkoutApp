import {Page} from 'ionic-framework/ionic';

import{LogService} from '../../services/log';


@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    log: LogService;
    constructor(log:LogService) {
        this.log = log;   
    }
}
