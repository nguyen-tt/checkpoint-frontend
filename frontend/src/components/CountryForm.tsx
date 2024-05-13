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
    const [errorMessage, setErrorMessage] = useState("");

    const [addCountry, { loading: mutationLoading, error: mutationError }] = useMutation(mutationAddCountry, {
        refetchQueries: [queryCountries],
        onError: (error) => setErrorMessage(error.message)
    });

    const { data, loading, error } = useQuery(queryContinents);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (mutationLoading) return;
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
            setName("");
            setEmoji("");
            setCode("");
            setContinentId("");
        } catch (err) {
            const error = err as Error;
            console.error('Error adding country:', error);
            setErrorMessage('Failed to add country: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="countryForm">
            {loading && <p>Loading continents...</p>}
            {error && <p>Error loading continents: {error.message}</p>}
            {errorMessage && <p className="error">{errorMessage}</p>}
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
            <button type="submit" disabled={mutationLoading}>Add</button>
        </form>
    );
}
