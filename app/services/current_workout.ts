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
    _id:String;
    _rev:String;
    index:Number;
    plan_id:String;
    name:String;
    exercises:Array<IExercise>;
    completed:Boolean;
    
    constructor(CurrentPlan:CurrentPlanService, log:LogService) {
        this.currentPlan = CurrentPlan;
        this.log = log;
       
    }
    
    // init workout service
    init(){
        // Check
        // this.log.getCurrentWorkout().then((resolveObject)=>{
        //     console.log(resolveObject)
        //     // check if resolve object has an id. If it does than it is a workout.
        //     if(resolveObject.id){
        //         this.set(resolveObject);
        //     }else{
        //         this.set(this.currentPlan.getNextWorkout());
        //     }
        // })
        // this.log.getWorkout("364845D7-E5A3-F435-BE68-CA55A123E2E0").then((workout)=>{
        //     console.log("setting workout ",workout)
        //         this.set(workout);
        // })
        this.log.getCurrentWorkout().then((response)=>{
            console.log("setting workout ",response.workout)
                if(response.workout ){
                     this.set(response.workout);
                }else{
                     this.set(this.currentPlan.getNextWorkout(response.index));
                    
                }
        })
        
    }
    // set curretn workout equal to past in workout
    set(workout:IWorkout){
        console.log("workout",workout)
        this._id = workout._id;
        this._rev = workout._rev;
        this.name = workout.name;
        this.index = workout.index;
        this.plan_id = "123"
        this.exercises = workout.exercises;
        this.completed = workout.completed;
    }

}
