export interface IExercise {
    id:Number;
    exercise_id:Number;
    name:string;
    musclegroup:string;
    repGoal:Number;
    setGoal:Number;
    weight?:Number;
    reps?:Array<Number>;
}
