import {Injectable} from "angular2/core";

import {IWorkout, Workout} from "../interfaces/workout"
import {IExercise} from "../interfaces/exercise"


@Injectable()
export class LogService {
    storage: Storage;
    db;
    constructor() {
        this.db = new PouchDB('logs', { adapter: 'websql' });
        // this.db.destroy().then(function(response) {
        //     // success
        // }).catch(function(err) {
        //     console.log(err);
        // });
    }
    // use pouchdb to log workout
    logWorkout({_id, _rev, name, index, exercises, completed}) {
        return new Promise((resolve, reject) => {
            // ensure the id and rev work to update otherwise, create a new one with post
            if (_id, _rev) {
                this.db.put({ _id, _rev, name, index, exercises, completed }).then((resp) => {
                    resolve(resp)
                });
            } else {
                _id = new Date().toJSON() + Math.random();
                this.db.put({ _id, name, index, exercises, completed }).then((resp) => {
                    resolve(resp)
                });
            }
        });
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
            this.db.allDocs({ limit: 1, descending: true, include_docs: true }).then((result) => {
                console.log("alldocs", result)
                // init the response object
                let response = { workout: null, index: null };

                // The row should contain exactly one response. 
                // if it does we either have an in progress workout or our last compelted workout
                if (result.rows.length === 1) {
                    var workout = result.rows[0].doc
                    console.log("latest workout", workout)
                    // if the workout is completed set the index and resove with a null workout
                    // else set the workout and resolve
                    if (workout.completed) {
                        response.index = workout.index;
                    } else {
                        response.workout = workout;
                    }

                    resolve(response)
                } else {
                    // if we could not find a workout in the plan resolve with -1.
                    // this indicates that we need to build our first workout
                    response.index = -1;
                    resolve(response)
                }
            }).catch((err) => {
                console.log(err)
            })
        });
    }
    // get previous workout, will eventually take a plan id.
    // This function should return a promise with that last workout completed at the provided index. (if any)
    getPreviousWorkout(index) {
        return new Promise((resolve, reject) => {
            this.db.query(function(doc, emit) {
                if (doc.index === index) {
                    emit(doc);
                }
            },
                { limit: 1, descending: true, include_docs: true }
            ).then(function(result) {
                // handle result
                if (result.rows.length > 0) resolve(result.rows[0].doc);
                else resolve(null);
            }).catch(function(err) {
                console.log(err);
            });
        });
    }
}
