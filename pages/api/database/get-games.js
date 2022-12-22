import { firestore } from "../../../src/libs/firebase";

const GetGames = async (req, res) => {
    // fetch the games
    if (req.method === 'GET') {

        const { username } = req.body
        const usersRef = firestore.collection('users').doc(username)




        usersRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    usersRef.onSnapshot(async (doc) => {
                        console.log(doc.data())
                        return res.status(200).json(doc.data().games)
                    });
                } else {

                    console.log("no document associated with this email  " + req.body.email + " ")
                    return res.status(200).json({ body: "no document associated with this email " })

                }
            }).catch((err) => {

                console.log("error : ", err)
                return res.status(200).json({ body: err })
            })

    }
}
export default GetGames;