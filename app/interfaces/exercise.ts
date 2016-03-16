export interface IExercise {
    id?:Number;
    exercise_id:String;
    name:string;
    rep_goal:Number;
    set_goal:Number;
    weight?:Number;
    reps?:Array<Number>;
}

export interface IExerciseInstance {
    id?:Number;
    exercise_id:String;
    name:string;
    rep_goal:Number;
    set_goal:Number;
    weight:Number;
    reps:Array<Number>;
}
