import {Injectable} from "angular2/core";

import {IWorkout} from "../interfaces/workout"
import {IExercise} from "../interfaces/exercise"
// import Local services
import {LogService} from "./log"
import {CurrentPlanService} from "./current_plan"

@Injectable()
export class CurrentWorkoutService {
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
        this.currentPlan = CurrentPlan;
        this.log = log;

    }
    
    // init workout service
    init() {
        // look for current workout
        this.log.getCurrentWorkout().then((response) => {
            // if the workout exists in the response use that to set it
            // otherwise, use the index found to build the next workout
            if (response.workout) {
                this.set(response.workout);
            } else {
                this.set(this.currentPlan.getNextWorkout(response.index));

            }
        })

    }
    // set curretn workout equal to past in workout
    set(workout: IWorkout) {
        console.log("workout", workout)
        this._id = workout._id;
        this._rev = workout._rev;
        this.name = workout.name;
        this.index = workout.index;
        this.plan_id = "123"
        this.exercises = workout.exercises;
        this.completed = workout.completed;
    }

}
