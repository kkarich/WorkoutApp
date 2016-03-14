import {Page, Alert, NavController} from 'ionic-framework/ionic';

import {CurrentWorkoutService} from '../../services/current_workout';
import {CurrentPlanService} from '../../services/current_plan';
import {LogService} from '../../services/log';


@Page({
    templateUrl: 'build/pages/workout/workout.html'
})
export class WorkoutPage {
    
    // init properties
    workout;
    plan: CurrentPlanService;
    log: LogService
    nav: NavController

    constructor(nav: NavController, currentPlan: CurrentPlanService, currentWorkout: CurrentWorkoutService, log: LogService) {
        this.workout = currentWorkout;
        this.plan = currentPlan;
        this.log = log;
        this.nav = nav;
    }
    
    // save the workout
    save() {
        this.workout.completed = true;
        
        // pass in this workout to log save method
        this.log.logWorkout(this.workout).then((resp) => {
            console.log(resp)
            this.workout.init();
            this.nav.pop();
        });
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
                    type: 'number',
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
                        console.log('Saved clicked', data);
                        exercise.weight = data.weight;
                    }
                }
            ]
        });
        this.nav.present(prompt);
    }
    // get value from passed in select object
    onWorkoutChange({value}) {
        if(value && value != this.workout.index){
            // get workout by index and set it to current workout.
            // we need to parse int to ensure we are not initing it with a string
            this.workout.set(this.plan.getWorkout(parseInt(value)));
        }
    }
}
