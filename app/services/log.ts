import {Injectable} from "angular2/core";
import {Storage, SqlStorage} from 'ionic-framework/ionic';

@Injectable()
export class LogService {
    storage: Storage;

    constructor() {
        this.storage = new Storage(SqlStorage);
        
        // create workout table
        this.storage.query(`
            CREATE TABLE IF NOT EXISTS Workout_Logs(
                id INTEGER PRIMARY KEY ASC, 
                WorkoutId INTEGER, 
                DateStarted TEXT, 
                DateCompleted TEXT
                )`
             )
             
        // create exercise table
        this.storage.query(`
            CREATE TABLE IF NOT EXISTS Exercise_Logs(
                id INTEGER PRIMARY KEY ASC, 
                WorkoutLogId INTEGER, 
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
    logWorkout(workout:) {
        // if id exists insert else update
        // this.storage.query('insert into Workout_Logs(workoutId) values(' + workoutId + ')');
    }
    // gets a workout by id
    getWorkout(id: Number) {

    }
    // check to see if there is a vialble current workout or returns info for next workout
    getCurrentWorkout() {

    }
    // logs a new exercise
    logExercise(workoutLogId: Number, id: Number) {
        // if id exists already update. If not insert.
        
    }

}