import { OAuth2Client } from "google-auth-library";

// CLIENT URL: 1050060297577-cmjrj8344ocafvccg695v2hvt8se4pe4.apps.googleusercontent.com

// CLIENT SECRET: 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

// API KEY: AIzaSyCv7_oPItOYYUHfWjnJP0g_roRIuYgBRS8

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_ID = "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";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export class googleAuthController {    
    // public verifyGoogleToken = async (token: any) => {
    //     console.log("token--->", token);
    //     try {
    //         const ticket = await client.verifyIdToken({
    //             idToken: token,
    //             audience: GOOGLE_CLIENT_ID,
    //         });
    //         return { success: true, data: ticket.getPayload(), error: null };
    //     } catch (error) {
    //         // return { success: false,  error: "Invalid user/token" };
    //         return { success: false,  error: error };
    //     }
    // }
    public verifyGoogleToken = async (token: any) => {
        console.log("token--->", token);
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: GOOGLE_CLIENT_ID,
            });
            return { success: true, data: ticket.getPayload(), error: null };
        } catch (error) {
            // return { success: false,  error: "Invalid user/token" };
            return { success: false,  error: error };
        }
    }
}


// try {
//     // console.log({ verified: verifyGoogleToken(req.body.credential) });
//     if (req.body.credential) {
//       const verificationResponse = await verifyGoogleToken(req.body.credential);

//       if (verificationResponse.error) {
//         return res.status(400).json({
//           message: verificationResponse.error,
//         });
//       }

//       const profile = verificationResponse?.payload;

//       DB.push(profile);

//       res.status(201).json({
//         message: "Signup was successful",
//         user: {
//           firstName: profile?.given_name,
//           lastName: profile?.family_name,
//           picture: profile?.picture,
//           email: profile?.email,
//           token: jwt.sign({ email: profile?.email }, "myScret", {
//             expiresIn: "1d",
//           }),
//         },
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "An error occurred. Registration failed.",
//     });
//   }




// try {
//     if (req.body.credential) {
//       const verificationResponse = await verifyGoogleToken(req.body.credential);
//       if (verificationResponse.error) {
//         return res.status(400).json({
//           message: verificationResponse.error,
//         });
//       }

//       const profile = verificationResponse?.payload;

//       const existsInDB = DB.find((person) => person?.email === profile?.email);

//       if (!existsInDB) {
//         return res.status(400).json({
//           message: "You are not registered. Please sign up",
//         });
//       }

//       res.status(201).json({
//         message: "Login was successful",
//         user: {
//           firstName: profile?.given_name,
//           lastName: profile?.family_name,
//           picture: profile?.picture,
//           email: profile?.email,
//           token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
//             expiresIn: "1d",
//           }),
//         },
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: error?.message || error,
//     });
//   }


