import {Page,NavController} from 'ionic-framework/ionic';

import{LogService} from '../../services/log';
import{CurrentWorkoutService} from '../../services/current_workout';

import {WorkoutPage} from '../workout/workout';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    nav:NavController;
    
    log: LogService;
    currentWorkout:CurrentWorkoutService;
    
    constructor(nav: NavController, log:LogService,CurrentWorkout:CurrentWorkoutService) {
        this.nav = nav;
        
        this.log = log;   
        this.currentWorkout = CurrentWorkout;
    }
    openWorkout(){
        this.nav.push(WorkoutPage)
    }
}
