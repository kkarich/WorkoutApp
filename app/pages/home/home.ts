import {Page} from 'ionic-framework/ionic';

import{LogService} from '../../services/log';
import{CurrentWorkoutService} from '../../services/current_workout';


@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    log: LogService;
    currentWorkout:CurrentWorkoutService;
    constructor(log:LogService,CurrentWorkout:CurrentWorkoutService) {
        this.log = log;   
        this.currentWorkout = CurrentWorkout;
    }
}
