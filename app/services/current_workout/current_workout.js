import {Injectable} from "angular2/core";

@Injectable()
export class LogService {
    // define properties
    name: String;
    exercises:Array<Exercise>;

    constructor() {
    }
    
    // sets data for current workout
    set(name:string){
        
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
