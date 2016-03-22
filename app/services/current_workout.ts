import {Injectable} from "angular2/core";

import {IWorkout, Workout} from "../interfaces/workout"
import {IExercise} from "../interfaces/exercise"
// import Local services
import {LogService} from "./log"
import {CurrentPlanService} from "./current_plan"

@Injectable()
export class CurrentWorkoutService extends Workout{
    currentPlan: CurrentPlanService;
    log: LogService;
    _id: String;
    _rev: String;
    index: Number;
    plan_id: String;
    name: String;
    exercises: Array<IExercise>;
    completed: Boolean;

    constructor(CurrentPlan: CurrentPlanService, log: LogService) {
        super({plan_id:null, exercises:[],name:null});
        this.currentPlan = CurrentPlan;
        this.log = log;

    }
    // extend base class workout method. in this case we re init the current workout
    save() {
        return new Promise((resolve, reject) => {
            super.save().then((resp) => {
                // reinitialize the current workout
                this.init();
                
                // return the response
                resolve(resp);
            });
        });
    }
    
    // init workout service
    init() {
        // look for current workout
        this.log.getCurrentWorkout().then((response:{workout?:IWorkout,index?:number}) => {
            // if the workout exists in the response use that to set it
            // otherwise, use the index found to build the next workout
            if (response.workout) {
                this.set(new Workout(response.workout));
            } else {
                this.set(new Workout(this.currentPlan.getWorkout(response.index + 1)));
            }
        })

    }
    // set curretn workout equal to past in workout
    set(workout: Workout) {
        this._id = workout._id;
        this._rev = workout._rev;
        this.name = workout.name;
        this.index = workout.index;
        this.plan_id = "123"
        this.exercises = workout.exercises;
        this.completed = workout.completed;
    }

}
