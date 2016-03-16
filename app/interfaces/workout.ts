import {IExercise, IExerciseInstance} from "./exercise"

export interface IWorkout {
    _id?: string;
    _rev?: string;
    index?: number;
    plan_id: number;
    name: string;
    exercises: Array<IExercise>;
    completed?: boolean;

}

// 
export class Workout implements IWorkout {
    _id;
    _rev;
    index;
    plan_id;
    name;
    exercises;
    completed;
    // Build passed in 
    constructor({name, exercises,index, plan_id}: IWorkout) {
        // init variables
        this.name = name;
        this.exercises = exercises;
        this.index = index;
        this.plan_id = plan_id;
        
        // map excercise 
        this.exercises.map((exercise) => {
            // default reps array
            exercise.reps = initArray(exercise.set_goal);

            // TODO: Get suggested weight from previous workout
            // define weight
            exercise.weight = null;
            return exercise;
        });
    }

}

// init array should init an array with length 'length' initialized with null values
function initArray(length) {
    var array = [];
    for (var i = 0; i < length; i++) {
        array.push(null)
    }
    return array;
}