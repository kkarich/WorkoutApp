import {Injectable} from "angular2/core";

import {IWorkout} from "../interfaces/workout"
import {IExercise} from "../interfaces/exercise"
// import Local services
import {LogService} from "./log"
import {CurrentPlanService} from "./current_plan"

@Injectable()
export class CurrentWorkoutService{
    currentPlan:CurrentPlanService;
    constructor(CurrentPlan:CurrentPlanService) {
        this.currentPlan = CurrentPlan;
        console.log(this.currentPlan.getNextWorkout())
        
        
        
    }
    
    // init workout service
    init(){
    }

}
