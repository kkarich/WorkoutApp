import {Page,NavController} from 'ionic-framework/ionic';

import{LogService} from '../../services/log';
import{CurrentWorkoutService} from '../../services/current_workout';
import{CurrentPlanService} from '../../services/current_plan';

import {WorkoutPage} from '../workout/workout';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    nav:NavController;
    
    log: LogService;
    currentWorkout:CurrentWorkoutService;
    currentPlan:CurrentPlanService;
    
    constructor(nav: NavController, log:LogService,CurrentPlanService:CurrentPlanService, CurrentWorkout:CurrentWorkoutService) {
        this.nav = nav;
        
        this.log = log;   
        this.currentWorkout = CurrentWorkout;
        this.currentPlan = CurrentPlanService;
    }
    openWorkout(){
        this.nav.push(WorkoutPage)
    }
}
