import {Injectable} from "angular2/core";

import {IWorkout} from "../interfaces/workout"
import {IExercise} from "../interfaces/exercise"
// import Local services
import {LogService} from "./log"
import {CurrentPlanService} from "./current_plan"

@Injectable()
export class CurrentWorkoutService{
    currentPlan:CurrentPlanService;
    name:String;
    exercises:Array<IExercise>;
    
    constructor(CurrentPlan:CurrentPlanService) {
        this.currentPlan = CurrentPlan;
        
        
        
    }
    
    // init workout service
    init(){
        // 
        var nextWorkout = this.currentPlan.getNextWorkout();
        this.set(nextWorkout);
    }
    // set curretn workout equal to past in workout
    set(workout:IWorkout){
        this.name = workout.name;
        this.exercises = workout.exercises;
    }

}
