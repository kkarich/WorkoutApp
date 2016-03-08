import {IExercise} from "./exercise"

export interface IWorkout {
    id?:Number;
    plan_id:Number;
    name: String;
    exercises:Array<IExercise>;
    
}
