"use client";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import dynamic from "next/dynamic";

const CometChatPopup = (props: { event_id: string }) => {
  const [user, setUser] = useState<any>(null);
  const [group, setGroup] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      _loginUser();
    }
  }, []);

  const _loginUser = async () => {
    const CometChatUIKit = (await import("@cometchat/chat-uikit-react"))
      .CometChatUIKit;
    await CometChatUIKit.getLoggedinUser()
      .then(async (res) => {
        console.log("LogedInUser Success Res : ", res);
        if (!res) {
          CometChatUIKit.login(props.event_id + "-client")
            .then(async (res) => {
              console.log("Login Success Res : ", res);
              setUser(res);
              await _getGroup();
            })
            .catch((err) => console.log("Login Error : ", err));
        } else {
          await _getGroup();
        }
      })
      .catch((err: any) => {
        console.log("LogedInUser -> Error : ", err);
      });
  };

  const _getGroup = async () => {
    const CometChatUIKit = (await import("@cometchat/chat-sdk-javascript"))
      .CometChat;
    CometChatUIKit.getGroup(props.event_id + "-client-chat")
      .then((res) => {
        setGroup(res);
      })
      .catch((err: any) => {
        console.error("Get Group Error : ", err);
      });
  };

  const ChatComponent = useCallback(
    dynamic(
      () =>
        import("@cometchat/chat-uikit-react").then(
          (module) => module.CometChatMessages
        ),
      {
        ssr: false,
      }
    ),
    []
  );

  return (
    <div className={styles.container}>
      <div
        className={`${styles.chatContainer} ${
          isVisible ? styles.chatVisible : styles.chatHidden
        }`}
      >
        <ChatComponent group={group} />
      </div>
      <div className={styles.chatBtn} onClick={() => setIsVisible(!isVisible)}>
        btn
      </div>
    </div>
  );
};

export default CometChatPopup;
