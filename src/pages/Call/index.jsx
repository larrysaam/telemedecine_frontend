import React, { useEffect, useMemo, useRef, useState } from "react";
import { EndCall, MuteMic, SaveFeedBackBtn } from "../../components/Button/Buttons"
import { CallControlBtn } from "../../layout/CallControlBtns"
import { VideoCallImage } from "../../layout/VideoCallImage"
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "../../API";
import ReactPlayer from "react-player";



function JoinScreen({ getMeetingAndToken }) {
    return null;
}

function ParticipantView(props) {
    return null;
}

function Controls(props) {
    return null;
}

function MeetingView(props) {
    return null;
}


export const VideoCallView = ()=>{

    const [mute, setMute] = useState(false)
    const { leave, toggleMic, toggleWebcam } = useMeeting();

    const VideoClick =()=>{

    }

    const MuteClick =()=>{

    }


    const Endcall =()=>{

    }

    var userName = "Larrien"


    

    const [meetingId, setMeetingId] = useState(null);

    //Getting the meeting id by calling the api we just wrote
    const getMeetingAndToken = async (id) => {
        const meetingId =
            id == null ? await createMeeting({ token: authToken }) : id;
            setMeetingId(meetingId);
    };

    
    //This will set Meeting Id to null when meeting is left or ended
    const onMeetingLeave = () => {
        setMeetingId(null);
    };





    return authToken && meetingId ? (
        <MeetingProvider
          config={{
            meetingId,
            micEnabled: true,
            webcamEnabled: true,
            name: "Nicot Telemedecine",
          }}
          token={authToken}
        >
          <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
        </MeetingProvider>
    ) : (
        <JoinScreen getMeetingAndToken={getMeetingAndToken} />
    );
    

    return(
        <div className="w-full h-full relative flex flex-col justify-start align-middle">

            {/* video top info bar */}
            <div className="w-full h-12 mt-7 bg-white flex align-middle justify-start pl-6">
                <label className="text-black text-lg font-semibold">{userName}</label>
            </div>

            {/* video viewer */}
            <VideoCallImage meetingId={meetingId} onMeetingLeave={onMeetingLeave} />

            {/* video call controll buttons */}
            <CallControlBtn VideoClick={()=>toggleWebcam()} mute={mute} MuteClick={() => toggleMic()} Endcall={() => leave()}/>
        </div>
    )
}



// After Video call view ( review page )
export const AfterCallReview = ()=>{

    const userType = 'doctor'

    const handleClick =()=>{
    }

    return(
        <div className="w-full h-full flex-col justify-center align-middle pt-24 gap-2">
            <div className="w-full flex flex-col justify-center align-middle">
                <label 
                    className="text-black text-5xl font-semibold font-sans flex justify-center align-middle text-center gap-2"
                > 
                    Call Ended 
                    <EndCall handleClick={handleClick}/>
                </label>

                <label className="text-lightgray text-lg text-center m-auto align-middle mt-2"> Dr. Paul</label>
            </div>
        
            <div className="w-96 m-auto mt-5">
                <p className="text-center text-lightgray text-sm font-sans">
                    Your feedback is crucial to our ongoing improvement. 
                    Please take a moment to rate your consultation with Dr. Paul.
                    Your review will help us refine our recommendation system and 
                    enhance the overall patient experience. 
                    Share your thoughts today!
                </p>
            </div>

            <div className="w-full flex justify-center align-bottom m-auto mt-20">
                <textarea 
                    name="message" 
                    rows="5" 
                    cols="30"
                    placeholder="Leave a review"
                    className="left-0 right-0 bg-bggray border-lightgray outline-lightgray rounded-xl p-4 text-black hover:w-96 delay-700"
                />
                <SaveFeedBackBtn/>
            </div>


        </div>
    )
}