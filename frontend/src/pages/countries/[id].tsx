import { queryCountry } from "@/graphql/queryCountry";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function Country() {
    const router = useRouter();
    const countryCode = router.query.id;

    const { data } = useQuery(queryCountry, {
        variables: { code: countryCode },
    });
    
    return (
        <div className="countryCard">
            <div className="emoji">
                {data?.country.emoji}
            </div>
            <p>
                Name : {data?.country.name} [{data?.country.code}]
            </p>
            <p>
                Continent : {data?.country.continent?.name}
            </p>
        </div>
    );
}
