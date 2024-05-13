import { mutationAddCountry } from "@/graphql/mutationAddCountry";
import { queryContinents } from "@/graphql/queryContinents";
import { queryCountries } from "@/graphql/queryCountries";
import { useMutation, useQuery } from "@apollo/client";
import { FormEvent, useState } from "react";

type Continent = {
    id: string;
    name: string;
};

export default function CountryForm() {
    const [name, setName] = useState("");
    const [emoji, setEmoji] = useState("");
    const [code, setCode] = useState("");
    const [continentId, setContinentId] = useState("");

    const [addCountry] = useMutation(mutationAddCountry, {
        refetchQueries: [queryCountries]
    });

    const { data } = useQuery(queryContinents);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await addCountry({
                variables: {
                    data: {
                        name,
                        emoji,
                        code,
                        continent: { id: Number(continentId) }
                    }
                }
            });
        } catch (err) {
            console.error('Error adding country:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="countryForm">
            <div className="inputContainer">
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="emoji">Emoji</label>
                    <input 
                        id="emoji"
                        type="text"
                        value={emoji}
                        onChange={(e) => setEmoji(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="code">Code</label>
                    <input 
                        id="code"
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="continent">Continent</label>
                    <select id="continent" value={continentId} onChange={(e) => setContinentId(e.target.value)}>
                        <option value="">Select a continent</option>
                        {data && data.continents.map((continent: Continent) => (
                            <option key={continent.id} value={continent.id}>
                                {continent.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <button type="submit">Add</button>
        </form>
    );
}
