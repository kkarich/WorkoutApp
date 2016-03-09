import {Injectable} from "angular2/core";

import {IWorkout} from "../interfaces/workout"
import {IExercise} from "../interfaces/exercise"
// import Local services
import {LogService} from "./log"
import {CurrentPlanService} from "./current_plan"

@Injectable()
export class CurrentWorkoutService{
    currentPlan:CurrentPlanService;
    log:LogService;
    
    index:Number;
    plan_id:String;
    name:String;
    exercises:Array<IExercise>;
    
    constructor(CurrentPlan:CurrentPlanService, log:LogService) {
        this.currentPlan = CurrentPlan;
        this.log = log;
       
    }
    
    // init workout service
    init(){
        // 
        // var nextWorkout = this.currentPlan.getNextWorkout();
        var nextWorkout = this.log.getWorkout(1);
        
        this.set(nextWorkout);
    }
    // set curretn workout equal to past in workout
    set(workout:IWorkout){
        console.log(workout)
        this.name = workout.name;
        this.index = workout.index;
        this.plan_id = "123123123123123"
        this.exercises = workout.exercises;
    }

}
