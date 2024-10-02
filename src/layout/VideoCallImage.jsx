import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { CallControlBtn } from "./CallControlBtns";


export const VideoCallImage =(props)=>{


    const micRef = useRef(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
        useParticipant(props.participantId);

    const videoStream = useMemo(() => {
        if (webcamOn && webcamStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(webcamStream.track);
        return mediaStream;
        }
    }, [webcamStream, webcamOn]);

    useEffect(() => {
        if (micRef.current) {
        if (micOn && micStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(micStream.track);

            micRef.current.srcObject = mediaStream;
            micRef.current
            .play()
            .catch((error) =>
                console.error("videoElem.current.play() failed", error)
            );
        } else {
            micRef.current.srcObject = null;
        }
        }
    }, [micStream, micOn]);

    

    return(
        <div className="h-full w-full bg-lightgray">
            <div>
                <p>
                    Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                    {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} />
                {webcamOn && (
                    <ReactPlayer
                    //
                    playsinline // extremely crucial prop
                    pip={false}
                    light={false}
                    controls={false}
                    muted={true}
                    playing={true}
                    //
                    url={videoStream}
                    //
                    height={"500px"}
                    width={"500px"}
                    onError={(err) => {
                        console.log(err, "participant video error");
                    }}
                    />
                )}
            </div>
        </div>
    )
}



export const MeetingView = (props)=> {
    const [joined, setJoined] = useState(null);
    const { join } = useMeeting();
    const { participants } = useMeeting({
      onMeetingJoined: () => {
        setJoined("JOINED");
      },
      onMeetingLeft: () => {
        props.onMeetingLeave();
      },
    });
    const joinMeeting = () => {
      setJoined("JOINING");
      join();
    };
  
    return (
      <div className="container">
        <h3>Meeting Id: {props.meetingId}</h3>
        {joined && joined == "JOINED" ? (
          <div>
            <CallControlBtn />
            {[...participants.keys()].map((participantId) => (
              <VideoCallImage
                participantId={participantId}
                key={participantId}
              />
            ))}
          </div>
        ) : joined && joined == "JOINING" ? (
          <p>Joining the meeting...</p>
        ) : (
          <button onClick={joinMeeting}>Join</button>
        )}
      </div>
    );
  }