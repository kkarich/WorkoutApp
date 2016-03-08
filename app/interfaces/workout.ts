import {IExercise,IExerciseInstance} from "./exercise"

export interface IWorkout {
    id?:Number;
    plan_id:Number;
    name: String;
    exercises:Array<IExercise>;
    
}

export interface IWorkoutInstance {
    id?:Number;
    plan_id:Number;
    name: String;
    exercises:Array<IExerciseInstance>;
    
}
