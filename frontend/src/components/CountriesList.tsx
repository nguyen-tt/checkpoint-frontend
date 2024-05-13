import { queryCountries } from "@/graphql/queryCountries";
import { useQuery } from "@apollo/client";
import Link from "next/link";

type Country = {
    name: string;
    emoji: string;
    code: string;
};

export default function CountriesList() {
    const { data } = useQuery(queryCountries);
    
    return (
        <div className="countriesList">
        {data?.countries.map((country: Country) => (
            <Link key={country.code} href={`/countries/${country.code}`}>
            <button style={{ display: 'block', margin: '10px', padding: '10px' }}>
                <p>{country.name}</p>
                <p>{country.emoji}</p>
            </button>
            </Link>
        ))}
        </div>
    );
}
