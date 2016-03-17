import {Page, Alert, NavController} from 'ionic-framework/ionic';

import {CurrentWorkoutService} from '../../services/current_workout';
import {CurrentPlanService} from '../../services/current_plan';
import {LogService} from '../../services/log';
import {debounce} from '../../services/utility';


@Page({
    templateUrl: 'build/pages/workout/workout.html'
})
export class WorkoutPage {
    // init properties
    workout;
    plan: CurrentPlanService;
    log: LogService
    nav: NavController
    exerciseIsCompleted;

    constructor(nav: NavController, currentPlan: CurrentPlanService, currentWorkout: CurrentWorkoutService, log: LogService) {
        this.workout = currentWorkout;
        this.plan = currentPlan;
        this.log = log;
        this.nav = nav;

        this.exerciseIsCompleted = debounce((exercise) => {
            // default to true, for easier 
            var isCompleted = true;

            // check each rep to make sure it is not null 
            for (var i in exercise.reps) {
                var rep = exercise.reps[i];
                // if rep is null return false
                if (!rep && rep !== 0) {
                    return;
                }
            }
            // if the exercise is completed, make sure to handle it
            this.handleCompletedExercise(exercise);
        }, 1000, false);

    }

    // save the workout
    save() {
        this.workout.completed = true;

        // pass in this workout to log save method
        this.log.logWorkout(this.workout).then((resp) => {
            this.workout.init();
            this.nav.pop();
        });
    }

    // logic for when someone clicks on a rep
    handleRepClick(exerciseIndex, repIndex) {
        var exercise = this.workout.exercises[exerciseIndex];

        // 3 options. Either rep is null needs to be set to max, 0 needs to be set to null, or it can be decremented
        if (exercise.reps[repIndex] !== 0 && !exercise.reps[repIndex]) {
            exercise.reps[repIndex] = exercise.rep_goal;
        } else if (exercise.reps[repIndex] === 0) {
            exercise.reps[repIndex] = null;
        } else {
            exercise.reps[repIndex]--;
        };

        // check to see if exercise is completed
        this.exerciseIsCompleted(exercise);
    }

    // handles completed exercise. ie: markes as complete, calculates suggested weight, ...
    handleCompletedExercise(exercise) {
        console.log("COMPLETED")
        exercise.message = "This is a test";
        exercise.suggestedWeight = exercise.weight + 5;
    }
    // prompt to adjust weight for clicked exercise
    adjustWeightPrompt(exercise) {
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

    // prompt to change workout to different workout in plan
    changeWorkoutPrompt() {
        // Init prompt values
        let prompt = Alert.create({
            title: 'Change Workout',
            message: "",
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
                        this.changeWorkout(data)
                    }
                }
            ]
        });
        // add in the plans workout options
        // key the value as the index, used to get the workout
        for (var i in this.plan.workouts) {
            var workout = this.plan.workouts[i];
            prompt.addInput({
                type: 'radio',
                label: workout.name,
                value: i,
                checked: this.workout.index == workout.index
            });

        }

        // present alert to screen
        this.nav.present(prompt);
    }

    // get value from passed in select object
    changeWorkout(value) {
        if (value && value != this.workout.index) {
            // get workout by index and set it to current workout.
            // we need to parse int to ensure we are not initing it with a string
            this.workout.set(this.plan.getWorkout(parseInt(value)));
        }
    }
}
