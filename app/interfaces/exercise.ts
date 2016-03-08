export interface IExercise {
    exercise_id:String;
    name:string;
    rep_goal:Number;
    set_goal:Number;
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
