import { firestore } from "../../../src/libs/firebase";

const Login = async (req, res) => {
    // increment the views
    if (req.method === 'POST') {


        const usersRef = firestore.collection('users').doc(req.body.username)




        usersRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    usersRef.onSnapshot(async (doc) => {
                        console.log(doc.data())
                        return res.status(200).json({ body: doc.data() })

                    });
                } else {

                    console.log("username : " + req.body.username + "  not exist")
                    return res.status(200).json({ body: "Username not exist" })

                }
            }).catch((err) => {

                console.log("error : ", err)
                return res.status(200).json({ body: err })
            })


    }


    // fetch the views
    if (req.method === 'GET') {
        return res.status(200).end("You are not authorized")
    }
}
export default Login;