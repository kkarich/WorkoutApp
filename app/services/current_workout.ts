import {Injectable} from "angular2/core";

// import Local services
import {LogService} from "./log"
import {CurrentPlanService} from "./current_plan"

@Injectable()
export class CurrentWorkoutService {
    // define properties
    name: String;
    exercises:Array<Exercise>;

    constructor() {
    }
    
    // init workout service
    init(){
        
    }

}

interface Exercise {
    id:Number;
    name:string;
    repGoal:Number;
    setGoal:Number;
    weight:Number;
    reps:Array<Number>;
}
