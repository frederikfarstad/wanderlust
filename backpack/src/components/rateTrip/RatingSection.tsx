import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getRatingsOnTrip } from "../../firebase/asyncRequests"
import { RatingInterface } from "../../firebase/Interfaces"
import RatingDisplay from "./RatingDisplay"

/* 
IF EDIT MODE, RETURN CREATE COMPONENT INSTEAD?????

that is crazy what the hell

*/

export default function RatingSection() {
    const { tripId } = useParams()
    if (!tripId) throw new Error("tried navigating to invalid trip")

    console.log(tripId)

    const [ratings, setRatings] = useState<RatingInterface[]>([])

    const ratingQuery = useQuery({
        queryKey: ["trips", tripId, "ratings"],
        queryFn: () => getRatingsOnTrip(tripId),
        onSuccess: data => {
            setRatings(data)
        }
    })

    const ratingElements = ratings.map((r, i) => <RatingDisplay key={r.id} {...r}/>)


    return <div className="flex flex-col gap-4 p-4">
            {ratingElements}

        
    </div>
}