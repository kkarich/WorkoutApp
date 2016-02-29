import {Injectable} from "angular2/core";

import {IWorkout} from "../interfaces/workout" 
@Injectable()
export class CurrentPlanService {
    id:Number;
    name:String;
    description:String;
    workouts:Array<IWorkout>;
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
                        "sets": 3,
                        "reps": 10,
                        "musclegroup": "chest"
                    },
                    {
                        "id": 9,
                        "name": "Flyes",
                        "exercise_id": 7,
                        "sets": 3,
                        "reps": 10,
                        "musclegroup": "chest"
                    },
                    {
                        "id": 10,
                        "name": "Incline Bench Press",
                        "exercise_id": 8,
                        "sets": 3,
                        "reps": 10,
                        "musclegroup": "chest"
                    },
                    {
                        "id": 11,
                        "name": "Incline Flyes",
                        "exercise_id": 9,
                        "sets": 3,
                        "reps": 10,
                        "musclegroup": "chest"
                    },
                    {
                        "id": 12,
                        "name": "Shoulder Press",
                        "exercise_id": 3,
                        "sets": 3,
                        "reps": 10,
                        "musclegroup": "Shoulder"
                    },
                    {
                        "id": 13,
                        "name": "Front Raises",
                        "exercise_id": 10,
                        "sets": 3,
                        "reps": 10,
                        "musclegroup": "Shoulder"
                    },
                    {
                        "id": 14,
                        "name": "Lateral Raises",
                        "exercise_id": 11,
                        "sets": 3,
                        "reps": 10,
                        "musclegroup": "Shoulder"
                    }
                ]
            }
        ];
    }
    // get next workout out if index is passed in, otherwas get first workout
    getNextWorkout(index){
        var nextWorkout:IWorkout;
        return nextWorkout;
    }

}
