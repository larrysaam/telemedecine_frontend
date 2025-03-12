import axios from "axios";


const sendDM =async(url, sender, receiver, content, messagetype, timestamp)=>{
    const headers = {'Content-Type': 'application/json'};
    console.log(url, sender, receiver, content, messagetype, timestamp)

    return await axios.patch(url,
        {
            sender,
            receiver,
            content,
            messagetype,
            timestamp
        },
        { headers: headers}
    ).then((response) => {
        // Code
        console.log(response)
        return response
    }).catch((error) => {
        // Code
        console.log(error)
        return error
    })  
}

export default sendDM