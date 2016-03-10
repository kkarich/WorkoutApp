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
    id:Number;
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
        // Check
        var nextWorkout = this.currentPlan.getNextWorkout();
            this.set(nextWorkout);
        this.log.getWorkout(1).then((nextWorkout)=>{
            console.log(nextWorkout)
            this.set(nextWorkout);
        })
    }
    // set curretn workout equal to past in workout
    set(workout:IWorkout){
        console.log("workout",workout)
        this.id = workout.id;
        this.name = workout.name;
        this.index = workout.index;
        this.plan_id = "123"
        this.exercises = workout.exercises;
    }

}
