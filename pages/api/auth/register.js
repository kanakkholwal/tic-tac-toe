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