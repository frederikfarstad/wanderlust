# Firebase

This contains an overview of the data we store in Firebase. The structure of each collection is explained. After that there is a section explaining how we fetch data from firebase. At the end I will suggest ways to display the data we need on the website.

Current firebase collections:

- authentication (separate from the rest)
- trips
- users

## Authentication

This where login info is stored. The info can be access in the application by using an auth object, imported from firebase/firebase-config. This object is only needed to access the uid of the current user. With the uid of the current user we can compare to creators of trips to see if the current user is the owner. You can access the uid of the current user with

    const uid = getUid()    // imported from utils/FirebaseUtils




## trips

Information about the trips that have been posted. The interface for this is defined in /firebase/Interfaces.tsx. I give an overview of the fields, with an explanation of the data types. I leave out the obvious ones.

- trips (collection)
    * createdAt : timestamp from firebase
    * createdBy : the uid of creator
    * description
    * duration : number?
    * price : number
    * title
    * locations : string[]
        - area
        - country
        - province

## users

We need to store information about all users, outside of the auth object. The reason for this is that a user needs to see data from other users. This is not possible with auth. When registering, the information is put in the users collection, and looks like this:

- users (collection)
    * username
    * fullname
    * email
    * createdAt : timestamp from firebase
    * profilepicture: string
    * trips: string[]
    * likes: string[]
    * favorites: string[]



The idea is that trips/likes/favourites is an array, each element being the id of the trips. 

## Fetching data

Each collection (like `users`) contains documents.
Each document contains the data we store. For example, in the users collection, there is a document containing information about `user usersen`. Sometimes we want the whole collection (every user), and sometimes we want only one document (like `user usersen`).

I recommend using React Query to fetch data. [This video](https://www.youtube.com/watch?v=r8Dg0KVnfMA&t=2383s&ab_channel=WebDevSimplified) explains everything we need to know. It's long, and some things are not super well explained. I recommend experimenting to get used to it.

In `firebase/asyncRequests` I have made a large number of useful functions for fetching data. Use these along with the react query hooks for easy life. Example to get every document in `trips`:

    const tripsQuery = useQuery({
      queryKey: ["trips"],
      queryFn: getAllTrips
    })
That's literally all you need. `getAllTrips` is one of those functions from `firebase/asyncRequests`. Swap this out to get other results. The queryKey is important to understand. Read up on it, and ask if unclear. Example to get a user:

    const uid = getUid();
    const userQuery = useQuery({
      queryKey: ["users", uid],
      queryFn: () => getUserById(uid)
    })

And there you go. In this case the queryKey is ["users", uid]. This means that everytime we need to fetch this exact user, the information is stored in cache. Makes life super good and nice. `getUserById` is also one of those functions defined in asyncRequests.

