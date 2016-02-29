import {Injectable} from "angular2/core";

import {IWorkout} from "./interfaces/workout"
import {IExercises} from "./interfaces/exercises"
// import Local services
import {LogService} from "./log"
import {CurrentPlanService} from "./current_plan"

@Injectable()
export class CurrentWorkoutService{
    name:String;
    exercises:Array<IExercises>;
    constructor() {
        this.name = "This is a test";
        this.exercises = [{test:'test'}];
        
        
    }
    
    // init workout service
    init(){
    }

}
