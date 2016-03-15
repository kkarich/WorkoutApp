import {IExercise,IExerciseInstance} from "./exercise"

export interface IWorkout {
    _id?:string;
    _rev?:string;
    index?:number;
    plan_id:number;
    name: string;
    exercises:Array<IExercise>;
    completed?:boolean;
    
}

export interface IWorkoutInstance {
    id?:Number;
    plan_id:Number;
    name: String;
    exercises:Array<IExerciseInstance>;
    
}
