import { CoursePart } from '../types';
import { Part } from './Part';

export const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <div>
            {courseParts.map((p) => (
                <Part part={p} />
            ))}
        </div>
    );
};
