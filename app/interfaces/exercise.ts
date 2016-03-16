export interface IExercise {
    id?: number;
    exercise_id: string;
    name: string;
    rep_goal: number;
    set_goal: number;
    weight?: number;
    reps?: Array<number>;
}

export class Exercise implements IExercise {
    id;
    exercise_id;
    name;
    rep_goal;
    set_goal;
    weight;
    reps;
    constructor({exercise_id, name, rep_goal, set_goal}: IExercise) {
        // init properties
        this.name = name;
        this.exercise_id = exercise_id;
        this.rep_goal = rep_goal;
        this.set_goal = set_goal;
        
        // default reps array
        this.reps = initArray(set_goal);

        // TODO: Get suggested weight from previous workout
        // define weight
        this.weight = null;
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
