interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (hours: number[], target: number): Result => {
    const average = hours.reduce((s, h) => s + h, 0) / hours.length;
    const avgOfTarget = average / target;
    const rating = avgOfTarget >= 2 ? 3 : avgOfTarget >= 1 ? 2 : 1;
    const ratingDescription =
        rating === 3
            ? 'well done, exceeded target greatly'
            : rating === 2
            ? 'well done'
            : 'goal not met';
    return {
        periodLength: hours.length,
        trainingDays: hours.filter((h) => h > 0).length,
        success: rating >= 2,
        rating,
        ratingDescription,
        target,
        average,
    };
};
