# Firebase

This contains an overview of the data we store in Firebase. The structure of each collection is explained. After that there is a section explaining how we fetch data from firebase. At the end I will suggest ways to display the data we need on the website.

Current firebase collections:

- authentication (separate from the rest)
- Routes
- users

## Authentication

This where login info is stored. The info can be access in the application by using an auth object, imported from firebase/firebase-config. From this object you can access displayName, photoURL, uid. A hook has been created to access all this information quickly, in hooks/useUserInfo.tsx. How to use the hook:

`{pfp, username, uid} = useUserInfo()`

The advantage of using this hook is that a default profile picture will be displayed if the user has not uploaded theirs yet. 

Suggestion: we stop using this for other than uid. Since the username and profilepicture has to be stored other places regardless, we can use that instead.

## Routes

Information about the trips that have been posted. The interface for this is defined in /firebase/Datainterfaces.tsx. I give an overview of the fields, with an explanation of the data types. I leave out the obvious ones.

- Routes (collection)
    * createdAt : timestamp from firebase
    * createdBy : the uid of creator
    * description
    * duration
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
    * profilepicture: ?
    * posts: string[]
    * likes: string[]
    * favorites: string[]

**NOTE** posts/likes/favorites is not set up properly yet

The idea is that posts/likes/favourites is an array, each element being the id of the post. 

## Fetching data

Each collection (like `users`) contains documents.
Each document contains the data we store. For example, in the users collection, there is a document containing information about `user usersen`. Sometimes we want the whole collection (every user), and sometimes we want only one document (like `user usersen`).

The function for reading data from firebase using react is very strange, and it does not make a lot of sense immediately. [This video](https://youtu.be/2hR-uWjBAgw) goes through the basics from the start, with authentication and data fetching. 

### Fetching the whole collection

Here is the basic function for fetching data:

    ...
    const [data, setData] = usestate<Data[]>([])

    useEffect(() => {
      console.log("fetching data from ", uid)
      const fetchData = async () => {
        try {
          const data = await getDocs(collectionRef)
          const filteredData = data.docs.map(d => ({...d.data(), id: d.id})) as Route[]
          setData(filteredData)
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
    }, [])
What is going on here? A lot. I can't explain everything. The google docs are not sufficient, because they explain fetching in general, and not how we do it in react. When searching, make sure you look at explanations for firebase 9, the latest version.

I have created a hook that can fetch the whole collection. You can do that by doing this:

    const { data: collectionData, loading, error } = useFirebaseCollection<Type>("collectionName");

We are probably never going to use loading and error, so a simpler way is this:

    const { data: collectionData} = useFirebaseCollection<Type>("collectionName");

You also need to tell the function what kind of data you are fetching. That is what the _Type_ is. This is an interface. The most common interfaces will be defined in `firebase/DataInterfaces`. Ask if unclear.

### Fetching a single document

The function for this is very similar to fetching the whole collection. The main difference is that you have to specify the id of the document, and which collection you are getting the data from. An example can be found in `utils/FirebaseUtils.ts`, called `getUserInfo`. 