import { useEffect, useState } from "react";
import { myProfile } from "../api";
import { UserTypes } from "../types";


const MyProfile = () => {
    const [myProfileData, setMyProfileData] = useState<UserTypes|null>(null);
    
    useEffect(() => {
        myProfile()
        .then((data) => {
            setMyProfileData(data.jsonData);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    return(
        <div className="my_profile">
            <pre>{JSON.stringify(myProfileData, null, `\t`)}</pre>
        </div>
    )
};

export default MyProfile;