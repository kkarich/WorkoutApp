import {Page, Alert, NavController} from 'ionic-framework/ionic';

import {CurrentWorkoutService} from '../../services/current_workout';
import {LogService} from '../../services/log';


@Page({
    templateUrl: 'build/pages/workout/workout.html'
})
export class WorkoutPage {
    
    // init properties
    workout;
    log: LogService
    nav:NavController

    constructor(nav:NavController, currentWorkout: CurrentWorkoutService, log: LogService) {
        this.workout = currentWorkout;
        this.log = log;
        this.nav = nav;
    }
    
    // save the workout
    save() {
        this.workout.completed = true;
        // pass in this workout to log save method
        this.log.logWorkout(this.workout);
    }
    
    // login for when someone clicks on a rep
    handleRepClick(exerciseIndex, repIndex) {
        var exercise = this.workout.exercises[exerciseIndex];
        if (!exercise.reps[repIndex]) {
            exercise.reps[repIndex] = exercise.rep_goal;
        } else if (exercise.reps[repIndex] === 0) {
            exercise.reps[repIndex] = null;
        } else {
            exercise.reps[repIndex]--;
        };
    }

    adjustWeightPrompt(exercise) {
        console.log(exercise)
        let prompt = Alert.create({
            title: 'Adjust Weight',
            message: "",
            inputs: [
                {
                    type:'number',
                    name: 'weight',
                    value: exercise.weight,
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Update',
                    handler: data => {
                        console.log('Saved clicked',data);
                        exercise.weight = data.weight;
                    }
                }
            ]
        });
        this.nav.present(prompt);
    }
}
