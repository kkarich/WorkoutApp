import {Injectable} from "angular2/core";

import {IWorkout} from "../interfaces/workout"
@Injectable()
export class CurrentPlanService {
    _id: String;
    _rev: String;
    name: String;
    description: String;
    workouts: Array<IWorkout>;
    constructor() {
        this._id = "9a37c055b6b221b2c66fa543fc87188d";
        this._rev = "4-be013c7a98e049f3914a455a6394c94c";
        this.name = "PHUL";
        this.description = "PHUL workout test";
        this.workouts = [
            {
                "plan_id":1,
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
                "plan_id":1,
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
                "plan_id":1,
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
                "plan_id":1,
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
getNextWorkout(index ?: number):IWorkout {
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
        
    // pass the next workout to the build workout function and its value
    return this.buildWorkout(nextWorkout);
}
// build workout takes a workout and builds it into an instance.
// That is that it will contain a reps array and either a suggest weight value or a defaulted weight value
buildWorkout(workout:IWorkout):IWorkout{
    // map excercise 
    workout.exercises.map((exercise) => {
        // default reps array
        exercise.reps = initArray(exercise.set_goal);
            
        // define weight
        exercise.weight = 120;
        return exercise;
    });
        
    // return mapped workout
    return workout;
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
