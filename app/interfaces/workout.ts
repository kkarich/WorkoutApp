import {IExercise, Exercise} from "./exercise"

export interface IWorkout {
    _id?: string;
    _rev?: string;
    index?: number;
    plan_id: number;
    name: string;
    exercises: Array<IExercise>;
    completed?: boolean;

}

// Workout class contains 
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
        this.index = index;
        this.plan_id = plan_id;
        
        // map excercise 
        this.exercises = exercises.map((exercise) => {
            // generate exercise object from exercise constructor object
            return new Exercise(exercise); 
        });
    }

}