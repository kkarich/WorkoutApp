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
    logWorkout(workout:IWorkout) {
        console.log('log',workout)
        console.log('log',workout.exercises[0].reps.toString())
        // if id exists insert else update
        this.storage.query('insert into Workout_Logs(WorkoutIndex,PlanId,Name) values(' + workout.index + ',"' + workout.plan_id + '","' +  workout.name + '")')
            .then((resp) => {
                // ensure the response object exists
                if(resp && resp.res){
                    // init the workout log id, of the data that was just inserted
                    var workoutLogId = resp.res.insertId;
                    for(var i in workout.exercises){
                        var exercise = workout.exercises[i];
                        this.logExercise(workoutLogId, i , exercise)
                    }
                    
                }
            })
        
    }
    // logs a new exercise
    logExercise(workoutLogId: Number, exerciseIndex: Number,exercise:IExercise) {
        this.storage.query('insert into Exercise_Logs(WorkoutLogId,ExerciseIndex,ExerciseId, SetGoal, RepGoal, Reps, Weight) values(' 
        + workoutLogId + ',"' + exerciseIndex + '","' +  exercise.id + '","' +  exercise.set_goal + '","' +  exercise.rep_goal + '","' +  exercise.reps.toString() + '","' +  exercise.weight + '")')
    }
    // gets a workout by id
    getWorkout(id: Number):IWorkout {
        let workout:IWorkout;
         this.storage.query('select * from workout_Logs as wl join exercise_Logs as el on wl.id = el.workoutlogid where wl.id = ' + id)
            .then((resp) => {
                    // ensure the response object exists
                    if(resp && resp.res && resp.res.rows){
                        console.log('test')
                        // build workout
                        
                        // build workout exercises
                        workout.exercises = buildExercises(resp.res.rows)
                        
                    }
                })
            return workout
        
    }
    // check to see if there is a vialble current workout or returns info for next workout
    getCurrentWorkout() {

    }
                
}

function buildExercises(exercises_log):Array<IExercise>{
    var exercises:Array<IExercise>;
    for(var i in exercises_log){
        // init variables
        var exercise:IExercise;
        var e = exercises_log[i];
        console.log(e.Reps.split(','))
        // assign exercise properties from db
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