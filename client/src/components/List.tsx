import { trpc } from '../App';
import type { Cat } from '../../../server/src/router';
import { useState } from 'react';

const List = () => {

    const [error, setError] = useState("");
    const cats = trpc.useQuery(['list']);
    console.log(cats);

    const catRow = (cat: Cat) => {
        return (
            <div key={cat.id}>
                <span>{cat.id}</span>
                <span>{cat.name}</span>
            </div>
        );
    };

    return (
        <div className="List">
             <h2>Cats</h2>
             <span>{error}</span>
             { cats.data && cats.data.map((cat) => {
               return catRow(cat);
             })}
        </div>
    );
}
export default List;
