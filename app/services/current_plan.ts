import {Injectable} from "angular2/core";

import {IWorkout} from "../interfaces/workout"
@Injectable()
export class CurrentPlanService {
    id: Number;
    name: String;
    description: String;
    workouts: Array<IWorkout>;
    constructor() {
        this.id = 6;
        this.name = "3 Day Split";
        this.description = "Testing out a 3 day split";
        this.workouts = [
            {
                "id": 6,
                "name": "Chest/Shoulders",
                "exercises": [
                    {
                        "id": 8,
                        "name": "Bench Press",
                        "exercise_id": 2,
                        "setGoal": 3,
                        "repGoal": 10,
                        "musclegroup": "chest"
                    },
                    {
                        "id": 9,
                        "name": "Flyes",
                        "exercise_id": 7,
                        "setGoal": 3,
                        "repGoal": 10,
                        "musclegroup": "chest"
                    },
                    {
                        "id": 10,
                        "name": "Incline Bench Press",
                        "exercise_id": 8,
                        "setGoal": 3,
                        "repGoal": 10,
                        "musclegroup": "chest"
                    },
                    {
                        "id": 11,
                        "name": "Incline Flyes",
                        "exercise_id": 9,
                        "setGoal": 3,
                        "repGoal": 10,
                        "musclegroup": "chest"
                    },
                    {
                        "id": 12,
                        "name": "Shoulder Press",
                        "exercise_id": 3,
                        "setGoal": 3,
                        "repGoal": 10,
                        "musclegroup": "Shoulder"
                    },
                    {
                        "id": 13,
                        "name": "Front Raises",
                        "exercise_id": 10,
                        "setGoal": 3,
                        "repGoal": 10,
                        "musclegroup": "Shoulder"
                    },
                    {
                        "id": 14,
                        "name": "Lateral Raises",
                        "exercise_id": 11,
                        "setGoal": 3,
                        "repGoal": 10,
                        "musclegroup": "Shoulder"
                    }
                ]
            }
        ];
    }
    // get next workout out if index is passed in, otherwas get first workout
    getNextWorkout(index?: number):IWorkout {
        // if this.workouts does not exist, return empty object
        if (this.workouts.length < 1) {
            return;
        }
        
        // init next workout
        var nextWorkout: IWorkout;
        // if index exists and it is not the last element in array, return next workout.
        // Otherwise, return first workout
        if (index && index + 1 != this.workouts.length) {
            nextWorkout = this.workouts[index + 1];
        } else {
            nextWorkout = this.workouts[0];
        }
        return nextWorkout;
    }

}
