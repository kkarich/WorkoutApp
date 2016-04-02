import {IExercise, Exercise} from "./exercise"
import {LogService} from '../services/log';

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
    log;
    // Build passed in 
    constructor({_id, _rev, name, exercises, index, plan_id}: IWorkout) {
        
        console.log("WORKOUT")
        // init variables
        this._id = _id;
        this._rev = _rev;
        this.name = name;
        this.index = index;
        this.plan_id = plan_id;

        this.log = new LogService();


        // map excercise 
        this.exercises = exercises.map((exercise) => {
            // generate exercise object from exercise constructor object
            return new Exercise(exercise);
        });
    }

    // log workout and return resp
    save() {
        return new Promise((resolve, reject) => {
            // log workout out and return response
            this.log.logWorkout(this).then((resp) => {
                // update revission number for future updates (a couchdb/pouchdb thing)
                this._rev = resp.rev;
                resolve(resp);
            });
        });
    }

}