import {Injectable} from "angular2/core";

import {IWorkout} from "./interfaces/workout"
// import Local services
import {LogService} from "./log"
import {CurrentPlanService} from "./current_plan"

@Injectable()
export class CurrentWorkoutService implements IWorkout {
    constructor() {
        
    }
    
    // init workout service
    init(){
    }

}
