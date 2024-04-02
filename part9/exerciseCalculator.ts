import { calculateExercises } from './calculateExercises';

interface Arguments {
    target: number;
    hours: number[];
}

const parseArguments = (args: string[]): Arguments => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const target = Number(args[2]);
    const hours = args.slice(3).map((arg) => Number(arg));
    if (hours.concat(target).some(isNaN)) {
        throw new Error('Provided values were not numbers!');
    } else {
        return { target, hours };
    }
};

try {
    const { target, hours } = parseArguments(process.argv);
    console.log(calculateExercises(hours, target));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
