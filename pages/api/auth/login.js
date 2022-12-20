import { db } from "../../../src/libs/firebase";

const Login = async (req, res) => {
    // increment the views
    if (req.method === 'POST') {


        const ref = db.ref('users')



        await ref.orderByChild("username").equalTo(req.body.username).once("value", (snapshot) => {

            if (snapshot.exists()) {

                console.log(snapshot.val())


                return res.status(200).json({ body: snapshot.val()[req.body.username] })

            }

            else {
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