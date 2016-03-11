import {Injectable} from "angular2/core";

import {IWorkout} from "../interfaces/workout"
import {IExercise} from "../interfaces/exercise"


@Injectable()
export class LogService {
    storage: Storage;
    db;
    constructor() {
        this.db = new PouchDB('logs', { adapter: 'websql' });
    }
    // use pouchdb to log workout
    logWorkout({_id, _rev, name, index, exercises, completed}) {
        // ensure the id and rev work to update otherwise, create a new one with post
        if (_id, _rev) {
            this.db.put({ _id, _rev, name, index, exercises, completed });
        } else {
            this.db.post({ name, index, exercises, completed });
        }
    }
    // get workout by _id
    getWorkout(_id: String) {
        return new Promise((resolve, reject) => {
            this.db.get(_id).then((workout) => {
                resolve(workout);
            })
        });
    }
    // check to see if there is a vialble current workout or returns info for next workout
    // 3 possible out comes: returns the current workout, returns the previous workout index, or returns nothing: indicating we need to build the first workout
    getCurrentWorkout() {
        return new Promise((resolve, reject) => {
            this.db.allDocs({ limit: 1 }).then((result) => {
                // init the response object
                let response = { workout: null, index: null };
                
                // The row should contain exactly one response. 
                // if it does we either have an in progress workout or our last compelted workout
                if (result.rows.length === 1) {
                    this.getWorkout(result.rows[0].id).then((workout) => {
                        // if the workout is completed set the index and resove with a null workout
                        // else set the workout and resolve
                        if (workout.completed) {
                            response.index = workout.index;
                        } else {
                            response.workout = workout;
                        }
                        
                        resolve(response)
                    })
                } else {
                    // if we could not find a workout in the plan resolve with null.
                    // this indicates that we need to build our first workout
                    resolve(response)
                }
            }).catch((err) => {
                console.log(err)
            })
        });
    }
}