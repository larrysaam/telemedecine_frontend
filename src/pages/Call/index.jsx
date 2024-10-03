import './App.css';
import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";

import { getToken, createMeeting } from "./api";
import { CallControlBtn } from '../../layout/CallControlBtns';
import { FaVideo } from "react-icons/fa6";

const chunk = (arr) => {
  const newArr = [];
  while (arr.length) newArr.push(arr.splice(0, 3));
  return newArr;
};


function ParticipantView(props) {
  const webcamRef = useRef(null);
  const micRef = useRef(null);
  const screenShareRef = useRef(null);

  const {
    displayName,
    webcamStream,
    micStream,
    screenShareStream,
    webcamOn,
    micOn,
    screenShareOn
  } = useParticipant(props.participantId);

  useEffect(() => {
    if (webcamRef.current) {
      if (webcamOn) {

        try {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
    
            webcamRef.current.srcObject = mediaStream;
            webcamRef.current
              .play()
              .catch((error) =>
                console.error("videoElem.current.play() failed", error)
              );
        } catch (error) {
            console.error('Error accessing webcam:', error);
          // Handle user denial or other errors
        }
       
      } else {
        webcamRef.current.srcObject = null;
      }
    }
  }, [webcamStream, webcamOn]);



  useEffect(() => {
    if (micRef.current) {
      if (micOn) {

        try {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(micStream.track);

            micRef.current.srcObject = mediaStream;
            micRef.current
            .play()
            .catch((error) =>
                console.error("videoElem.current.play() failed", error)
            );
        } catch (error) {
            console.error('Error accessing mic:', error);
          // Handle user denial or other errors
        }
        
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  useEffect(() => {
    if (screenShareRef.current) {
      if (screenShareOn) {

        try {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(screenShareStream.track);

            screenShareRef.current.srcObject = mediaStream;
            screenShareRef.current
            .play()
            .catch((error) =>
                console.error("videoElem.current.play() failed", error)
            );
        } catch (error) {
            console.error('Error accessing share:', error);
        }
        
      } else {
        screenShareRef.current.srcObject = null;
      }
    }
  }, [screenShareStream, screenShareOn]);


  return (
    <div
        className='border-2 border-brightgreen rounded-2xl h-full w-full m-auto'
        key={props.participantId} >
      <audio ref={micRef} autoPlay />
      {webcamRef ||  micOn ? (<div>
      <h2>{localStorage.getItem('doctorName')}</h2>
      <video
        height={"100%"}
        width={"100%"}
        ref={webcamRef}
        autoPlay
      />
      </div>) : null }
      {screenShareOn ? (
      <div>
        <h2>Screen Shared</h2>
        <video
          height={"100%"}
          width={"100%"}
          ref={screenShareRef}
          autoPlay
        />
      </div>) : null }
      <br/>
      <span>Mic:{micOn ? "Yes": "No"}, Camera: {webcamOn ? "Yes" : "No"}, Screen Share: {screenShareOn ? "Yes" : "No"}</span>
    </div>
  );
}



function MeetingGrid(props) {
  const [joined, setJoined] = useState(false)
  const {
    join, 
    leave,  
    toggleMic,
    toggleWebcam,
    toggleScreenShare
  } = useMeeting()
  const { participants } = useMeeting();
  const joinMeeting = () => {
    setJoined(true)
    join()
  }
  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
      <header>Meeting Id: {props.meetingId}</header>
      {joined ? 
      (
        <div >
            <CallControlBtn VideoClick={toggleWebcam}  MuteClick={toggleMic} Endcall={leave}/>
        </div>
      ) 
      : (
        <button 
            className='w-24 h-8 ml-3 text-black font-semibold rounded-xl bg-brightgreen flex justify-center items-center'
            onClick={joinMeeting}
        >Join</button>
      )}
      <div className='w-full h-3/4 flex flex-col justify-center items-center ml-28'  >

        {chunk([...participants.keys()]).map((k) => (
          <Row  key={k}  gutter={80}>
              {k.map((l) => (
                <Col span={4}>
                  <ParticipantView key={l} participantId={l} />
                </Col>
              ))}
          </Row>
        ))}
      </div>
      
    </div>
  )
}

function JoinScreen({updateMeetingId, getMeetingAndToken}) {
  return(
    <div className='w-1/2 mt-7 flex justify-center items-center'>
      <input 
        className='rounded-xl bg-bggray p-1 pl-4'
        type="text" 
        placeholder="Enter Meeting Id" 
        onChange={(e) => {updateMeetingId(e.target.value)}}  
    />
      <button 
        className='w-24 h-8 ml-3 text-black font-semibold rounded-xl bg-brightgreen flex justify-center items-center'
        onClick={getMeetingAndToken}
    >
        Join
      </button>
      <button  
        className='w-44 h-8 ml-3 text-black font-semibold rounded-xl bg-brightgreen flex justify-center items-center'
        onClick={getMeetingAndToken}
        >
            <FaVideo className='w-5 h-5 text-white mr-2'/>
        Create Meeting
      </button>
    </div>
  );
}


export const  VideoCallView =()=> {
  const [token, setToken] = useState(null);
  const [meetingId, setMeetingId] = useState(null);

  const getMeetingAndToken = async () => {
    const token = await getToken();
    setToken(token);
    setMeetingId(meetingId ? meetingId : (await createMeeting({ token })));
  };

  const updateMeetingId = (meetingId) => {
    setMeetingId(meetingId)
  }

  return token && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "John doe",
      }}
      token={token}
    >
      <MeetingConsumer>
        {() => <MeetingGrid meetingId={meetingId} getMeetingAndToken={getMeetingAndToken}  />}
      </MeetingConsumer>
    </MeetingProvider>
  ) : (
    <JoinScreen updateMeetingId={updateMeetingId} getMeetingAndToken={getMeetingAndToken}   />
  );
}


// // After Video call view ( review page )
export const AfterCallReview = ()=>{

    const userType = 'doctor'

    const handleClick =()=>{
    }

    return(
        <div className="w-full h-full flex-col justify-center align-middle pt-24 gap-2">
            {/* <div className="w-full flex flex-col justify-center align-middle">
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
 */}

        </div>
    )
}








