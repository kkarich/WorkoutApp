import {IExercise} from "./exercise"

export interface IWorkout {
    id?:Number;
    name: String;
    exercises:Array<IExercise>;
    
}
