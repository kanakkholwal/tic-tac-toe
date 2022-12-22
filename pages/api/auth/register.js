import { auth, firestore } from "../../../src/libs/firebase";

const Register = async (req, res) => {
    // increment the views
    if (req.method === 'POST') {



        const usersRef = firestore.collection('users').doc(req.body.username)

        usersRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    usersRef.onSnapshot((doc) => {

                        console.log("username : " + req.body.username + "  already exist")
                        return res.status(200).json({ body: "Username already exist" })
                    });
                } else {
                    auth.createUser({
                        email: req.body.email,
                        emailVerified: true,
                        password: req.body.password,
                        displayName: req.body.displayName,
                        disabled: false,
                    }).then(async (userRecord) => {
                        // See the UserRecord reference doc for the contents of userRecord.
                        console.log('Successfully created new user:', userRecord.uid);

                        usersRef.set({
                            email: req.body.email,
                            username: req.body.username,
                            displayName: req.body.displayName,
                            uid: userRecord.uid,
                            game: []
                        })
                        const doc = await usersRef.get();

                        return res.status(200).json({ body: doc.data() })


                    })
                        .catch((error) => {
                            console.log('Error creating new user:', error);
                            return res.status(200).json({
                                body: { type: "Error creating new user", error: error },
                            })
                        });



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
export default Register;