import {Injectable} from "angular2/core";

import {IWorkout, Workout} from "../interfaces/workout"

import {LogService} from "./log"


@Injectable()
export class CurrentPlanService {
    _id: String;
    _rev: String;
    name: String;
    description: String;
    workouts: Array<IWorkout>;
    log: LogService;
    constructor(log: LogService) {
        this.log = log;
        this._id = "9a37c055b6b221b2c66fa543fc87188d";
        this._rev = "4-be013c7a98e049f3914a455a6394c94c";
        this.name = "PHUL";
        this.description = "PHUL workout test";
        this.workouts = [
            {
                "plan_id": 1,
                "name": "Upper Power",
                "exercises": [
                    {
                        "exercise_id": "",
                        "name": "Bench Press",
                        "set_goal": 3,
                        "rep_goal": 5
                    },
                    {
                        "exercise_id": "",
                        "name": "Incline Dumbell Bench Press",
                        "set_goal": 3,
                        "rep_goal": 10
                    },
                    {
                        "exercise_id": "",
                        "name": "Bent Over Row",
                        "set_goal": 3,
                        "rep_goal": 5
                    },
                    {
                        "exercise_id": "",
                        "name": "Lat Pull Down",
                        "set_goal": 3,
                        "rep_goal": 10
                    },
                    {
                        "exercise_id": "",
                        "name": "Overhead Press",
                        "set_goal": 2,
                        "rep_goal": 8
                    },
                    {
                        "exercise_id": "",
                        "name": "Barbell Curl",
                        "set_goal": 2,
                        "rep_goal": 10
                    },
                    {
                        "exercise_id": "",
                        "name": "Skullcrusher",
                        "set_goal": 2,
                        "rep_goal": 10
                    }
                ]
            },
            {
                "plan_id": 1,
                "name": "Lower Power",
                "exercises": [
                    {
                        "exercise_id": "",
                        "name": "Squat",
                        "set_goal": 3,
                        "rep_goal": 5
                    },
                    {
                        "exercise_id": "",
                        "name": "Deadlift",
                        "set_goal": 3,
                        "rep_goal": 5
                    },
                    {
                        "exercise_id": "",
                        "name": "Leg Press",
                        "set_goal": 3,
                        "rep_goal": 15
                    },
                    {
                        "exercise_id": "",
                        "name": "Leg Curl",
                        "set_goal": 3,
                        "rep_goal": 10
                    },
                    {
                        "exercise_id": "",
                        "name": "Calf Exercise",
                        "set_goal": 4,
                        "rep_goal": 10
                    }
                ]
            },
            {
                "plan_id": 1,
                "name": "Upper Hypertrophy",
                "exercises": [
                    {
                        "exercise_id": "",
                        "name": "Incline Barbell Bench Press",
                        "set_goal": 3,
                        "rep_goal": 12
                    },
                    {
                        "exercise_id": "",
                        "name": "Dumbell Flye",
                        "set_goal": 3,
                        "rep_goal": 12
                    },
                    {
                        "exercise_id": "",
                        "name": "Seated Cable Row",
                        "set_goal": 3,
                        "rep_goal": 12
                    },
                    {
                        "exercise_id": "",
                        "name": "One Arm Dumbell Row",
                        "set_goal": 3,
                        "rep_goal": 12
                    },
                    {
                        "exercise_id": "",
                        "name": "Lateral Raise",
                        "set_goal": 3,
                        "rep_goal": 12
                    },
                    {
                        "exercise_id": "",
                        "name": "Incline Dumbbell Curl",
                        "set_goal": 3,
                        "rep_goal": 12
                    },
                    {
                        "exercise_id": "",
                        "name": "Cable Tricep Extension",
                        "set_goal": 3,
                        "rep_goal": 12
                    }
                ]
            },
            {
                "plan_id": 1,
                "name": "Lower Hypertrophy",
                "exercises": [
                    {
                        "exercise_id": "",
                        "name": "Front Squat",
                        "set_goal": 3,
                        "rep_goal": 12
                    },
                    {
                        "exercise_id": "",
                        "name": "Barbell Lunge",
                        "set_goal": 3,
                        "rep_goal": 12
                    },
                    {
                        "exercise_id": "",
                        "name": "Leg Extension",
                        "set_goal": 3,
                        "rep_goal": 15
                    },
                    {
                        "exercise_id": "",
                        "name": "Leg Curl",
                        "set_goal": 3,
                        "rep_goal": 15
                    },
                    {
                        "exercise_id": "",
                        "name": "Seated Calf Raise",
                        "set_goal": 3,
                        "rep_goal": 12
                    },
                    {
                        "exercise_id": "",
                        "name": "Calf Press",
                        "set_goal": 3,
                        "rep_goal": 12
                    }
                ]
            }
        ]
    }
    // get next workout out if index is passed in, otherwas get first workout
    getWorkout(index?: number) {
        return new Promise((resolve, reject) => {
            // if this.workouts does not exist, return empty object
            if (this.workouts.length < 1) {
                return;
            }
            // init next workout
            var workout: IWorkout;
            // if index exists and it is not the last element in array, return next workout.
            // Otherwise, return first workout
            if (index !== null && index < this.workouts.length) {
                workout = this.workouts[index];
                workout.index = index;
            } else {
                workout = this.workouts[0];
                workout.index = 0;
            }
            
            // get the last workout in the plan that we logged
            this.log.getPreviousWorkout(workout.index).then(response => {
                if (response) {
                    // if the response is truthy (contains a workout)
                    // update the workout exercises with the suggested weight from the last workout
                    workout.exercises.map((exercise, index) => {
                        exercise.weight = response.exercises[index].suggested_weight;
                    });
                }
                // pass the next workout to the build workout function and its value
                resolve(workout);
            })
        });
    }

}