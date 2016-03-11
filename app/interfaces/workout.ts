import {IExercise,IExerciseInstance} from "./exercise"

export interface IWorkout {
    _id?:String;
    _rev?:String;
    index:Number;
    plan_id:Number;
    name: String;
    exercises:Array<IExercise>;
    completed:Boolean;
    
}

export interface IWorkoutInstance {
    id?:Number;
    plan_id:Number;
    name: String;
    exercises:Array<IExerciseInstance>;
    
}
