import { Admin } from "../../../src/libs/firebase";

const Uid = async (req, res) => {
    // increment the views
    if (req.method === 'POST') {


        Admin.auth().getUser(req.body.uid)
            .then(function (userRecord) {
                if (userRecord && req.body.fetching == true)
                    return res.status(200).json({ body: { ...userRecord.providerData[0] } })
                else if (userRecord)
                    return res.status(200).json({ body: { isValid: true } })


            })
            .catch(function (error) {
                if (error)
                    return res.status(200).json({ body: { isValid: false } })

            });



    }


    // fetch the views
    if (req.method === 'GET') {
        return res.status(200).end("You are not authorized")
    }
}
export default Uid;