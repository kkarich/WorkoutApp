import {Injectable} from "angular2/core";
import {Storage, SqlStorage} from 'ionic-framework/ionic';

import {IWorkout} from "../interfaces/workout"
import {IExercise} from "../interfaces/exercise"
@Injectable()
export class LogService {
    storage: Storage;

    constructor() {
        this.storage = new Storage(SqlStorage);
        
        // create workout table
        this.storage.query(`
            CREATE TABLE IF NOT EXISTS Workout_Logs(
                id INTEGER PRIMARY KEY ASC, 
                WorkoutIndex INTEGER,
                PlanId TEXT,
                Name TEXT,
                DateStarted TEXT, 
                DateCompleted TEXT
                )`
        )
             
        // create exercise table
        this.storage.query(`
            CREATE TABLE IF NOT EXISTS Exercise_Logs(
                id INTEGER PRIMARY KEY ASC, 
                WorkoutLogId INTEGER, 
                ExerciseIndex INTEGER,
                ExerciseId INTEGER, 
                SetGoal INTEGER, 
                RepGoal INTEGER, 
                Weight INTEGER,
                Reps TEXT,
                HitGoal INTEGER,
                FOREIGN KEY(WorkoutLogId) REFERENCES Workout_Logs(id)
                )`
        )
    }
    // creates a log for a workout
    logWorkout(workout: IWorkout, completed: boolean) {
        // ensure workout id is null if it does not exist. needed for sql storage
        if (!workout.id) {
            workout.id = null;
        }
        var dateCompleted = null;
        // if the workout has been completed, be sure to log it
        if (completed) dateCompleted = new Date().toLocaleDateString();

        console.log('dateCompleted', dateCompleted)
        // if id exists insert else update
        this.storage.query('insert or replace into Workout_Logs(Id, WorkoutIndex,PlanId,Name,DateCompleted) values('
            + workout.id + ',' + workout.index + ',"' + workout.plan_id + '","' + workout.name + '","' + dateCompleted + '")')
            .then((resp) => {
                // ensure the response object exists
                if (resp && resp.res) {
                    // init the workout log id, of the data that was just inserted
                    var workoutLogId = resp.res.insertId;
                    for (var i in workout.exercises) {
                        var exercise = workout.exercises[i];
                        this.logExercise(workoutLogId, i, exercise)
                    }

                }
            })

    }
    // logs a new exercise
    logExercise(workoutLogId: Number, exerciseIndex: Number, exercise: IExercise) {
        // ensure workout id is null if it does not exist. needed for sql storage
        if (!exercise.id) {
            exercise.id = null;
        }

        this.storage.query('insert or replace into Exercise_Logs(Id, WorkoutLogId,ExerciseIndex,ExerciseId, SetGoal, RepGoal, Reps, Weight) values('
            + exercise.id + ',' + workoutLogId + ',"' + exerciseIndex + '",' + exercise.id + ',"' + exercise.set_goal + '","' + exercise.rep_goal + '","' + exercise.reps.toString() + '","' + exercise.weight + '")')
    }
    // gets a workout by id
    getWorkout(id: Number) {
        // because we are doing a db query we will need to return a promise. That can then be used to get info
        return new Promise((resolve, reject) => {
            var workout: IWorkout = {};
            this.storage.query('select * from workout_Logs as wl join exercise_Logs as el on wl.id = el.workoutlogid where wl.id = ' + id)
                .then((resp) => {
                    // ensure the response object exists
                    if (resp && resp.res && resp.res.rows) {
                        // build workout, may eventually pull this out
                        workout.id = resp.res.rows[0].WorkoutLogId;
                        workout.name = resp.res.rows[0].Name;
                        workout.plan_id = resp.res.rows[0].PlanId;
                        workout.index = resp.res.rows[0].WorkoutIndex;
                        
                        // build workout exercises
                        workout.exercises = buildExercises(resp.res.rows)
                        resolve(workout);
                    }
                })

        });
    }
    // check to see if there is a vialble current workout or returns info for next workout
    // 3 possible out comes: returns the current workout, returns the previous workout index, or returns nothing: indicating we need to build the first workout
    getCurrentWorkout() {
        return new Promise((resolve, reject) => {
            this.storage.query('select * from workout_Logs limit 1')
                .then((resp) => {
                    // if the response has a row, return that rows id.
                    if (resp && resp.res && resp.res.rows && resp.res.rows.length === 1) {
                        var workout = resp.res.rows[0]
                        console.log(workout.id)
                        this.getWorkout(workout.id).then((currentWorkout)=>{
                            resolve(currentWorkout)
                        })
                    } else {
                        // did not find a workout. This indicates we need to build our first one
                    }
                });
        });

    };
}

function buildExercises(exercises_log): Array<IExercise> {
    var exercises: Array<IExercise> = [];
    for (var i in exercises_log) {
        console.log()
        // init variables
        var exercise: IExercise = {};
        var e = exercises_log[i];

        if (typeof e !== "object")
            continue
        console.log(e, i)
        // assign exercise properties from db
        exercise.id = e.id;
        exercise.name = e.Name;
        exercise.exercise_id = e.ExerciseId;
        exercise.set_goal = e.SetGoal;
        exercise.rep_goal = e.RepGoal;
        exercise.reps = e.Reps.split(',');
        exercise.weight = e.Weight;
        
        // push single exercise into exercises array we will return 
        exercises.push(exercise);

    }
    return exercises;
}