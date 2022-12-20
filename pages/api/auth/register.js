import { auth, db } from "../../../src/libs/firebase";

const Register = async (req, res) => {
    // increment the views
    if (req.method === 'POST') {



        const ref = db.ref('users')



        await ref.orderByChild("username").equalTo(req.body.username).once("value", async (snapshot) => {

            if (!snapshot.exists()) {



                auth.createUser({
                    email: req.body.email,
                    emailVerified: true,
                    password: req.body.password,
                    displayName: req.body.displayName,
                    disabled: false,
                })
                    .then(async (userRecord) => {
                        // See the UserRecord reference doc for the contents of userRecord.
                        console.log('Successfully created new user:', userRecord.uid);

                        const childRef = ref.child(req.body.username)
                        const { snapshot } = await childRef.transaction((user) => {

                            return {
                                email: req.body.email,
                                username: req.body.username,
                                uid: userRecord.uid,
                            }
                        });

                        return res.status(200).json({ body: snapshot.val() })

                        // auth.setCustomUserClaims(userRecord.uid, { username: req.body.username }).then(() => {
                        //     // The new custom claims will propagate to the user's ID token the
                        //     // next time a new one is issued.

                        //     console.log('Successfully created new username', req.body.username);

                        //     auth.createCustomToken(userRecord.uid, { username: req.body.username })
                        //         .then(async (Token) => {
                        //             // Send token back to client
                        //             const ref = db.ref('pages/views').child(req.query.view)
                        //             const { snapshot } = await ref.transaction((currentViews) => {
                        //                 if (currentViews === null) {
                        //                     return 1
                        //                 }


                        //                 return currentViews + 1
                        //             })
                        //             return res.status(200).json({
                        //                 body: {
                        //                     uid: userRecord.uid,
                        //                     token: Token
                        //                 },
                        //             })
                        //         })
                        //         .catch((error) => {
                        //             console.log('Error creating custom token:', error);
                        //             return res.status(200).json({
                        //                 body: { type: "", error: error },
                        //             })
                        //         });
                        // }).catch((error) => {
                        //     console.log('Error Setting Username', error);
                        //     return res.status(200).json({
                        //         body: { type: "Error Setting Username", error: error },
                        //     })
                        // });


                    })
                    .catch((error) => {
                        console.log('Error creating new user:', error);
                        return res.status(200).json({
                            body: { type: "Error creating new user", error: error },
                        })
                    });
            }

            else {
                console.log("username : " + req.body.username + "  already exist")
                return res.status(200).json({ body: "Username already exist" })
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