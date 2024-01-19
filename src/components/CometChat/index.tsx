"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import dynamic from "next/dynamic";
import Image from "next/image";
import useOutsideClick from "@/hooks/useOutsideClick";
import { CC_Contstants } from "@/lib/constants";

const CometChatPopup = (props: { event_id: string }) => {
  const [user, setUser] = useState<any>(null);
  const [group, setGroup] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [isUnreadMessagesLoaded, setIsUnreadMessagesLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setIsVisible(false));

  useEffect(() => {
    if (typeof window !== "undefined") {
      _loginUser();
    }
  }, []);

  useEffect(() => {
    if (!isVisible) {
      _messagesListener();
    }
  }, [isVisible, messageCount]);

  useEffect(() => {
    if (group && !isUnreadMessagesLoaded) {
      // console.log("Render : ", group);
      
      _getUnreadCount(group?.getGuid())
    };
  }, [group]);

  const _getUnreadCount = async (id: string) => {
    setIsUnreadMessagesLoaded(true)
    const messageCountString = localStorage.getItem(CC_Contstants.LOCAL_STORAGE_ADDRESS);
    const messageCountNumber = messageCountString ? Number(messageCountString) : 0
    const CometChat = (await import("@cometchat/chat-sdk-javascript"))
      .CometChat;
    CometChat.getUnreadMessageCountForGroup(id, true)
      .then((res: any) => {
        // console.log("Unread Count Res : ", res);
        if (Object.keys(res).length > 0) {
          let totalMessageCount = res[props.event_id + "-client-chat"] + messageCountNumber;
          localStorage.setItem(CC_Contstants.LOCAL_STORAGE_ADDRESS, JSON.stringify(totalMessageCount))
          setMessageCount(totalMessageCount);
          // console.log("Res not empty ", totalMessageCount);
        } else {
          setMessageCount(messageCountNumber)
        }
      })
      .catch((err) => {
        console.log("Unread Count Error ", err);
      });
  };

  const _messagesListener = async () => {
    const CometChat = (await import("@cometchat/chat-sdk-javascript"))
      .CometChat;
    CometChat.addMessageListener(
      CC_Contstants.MESSAGES_LISTENER,
      new CometChat.MessageListener({
        onTextMessageReceived: (mediaMessage: CometChat.TextMessage) => {
          console.log("Media message received successfully", mediaMessage);
          localStorage.setItem(CC_Contstants.LOCAL_STORAGE_ADDRESS, JSON.stringify(messageCount+1))
          setMessageCount((pS) => pS + 1);
        },
        onMediaMessageReceived: (mediaMessage: CometChat.MediaMessage) => {
          console.log("Media message received successfully", mediaMessage);
          localStorage.setItem(CC_Contstants.LOCAL_STORAGE_ADDRESS, JSON.stringify(messageCount+1))
          setMessageCount((pS) => pS + 1);
        },
        onCustomMessageReceived: (customMessage: CometChat.CustomMessage) => {
          console.log("Custom message received successfully", customMessage);
          localStorage.setItem(CC_Contstants.LOCAL_STORAGE_ADDRESS, JSON.stringify(messageCount+1))
          setMessageCount((pS) => pS + 1);
        },
      })
    );
  };

  const _loginUser = async (call = 0) => {
    if (call > 2) return;
    const CometChatUIKit = (await import("@cometchat/chat-uikit-react"))
      .CometChatUIKit;

    // console.log(props.event_id);
    await CometChatUIKit.getLoggedinUser()
      .then(async (res) => {
        console.log("LogedInUser Success Res : ", res);
        if (!res) {
          await CometChatUIKit.login(props.event_id + "-client")
            .then(async (res) => {
              console.log("Login Success Res : ", res);
              setUser(res);
              await _getGroup();
            })
            .catch((err) => console.log("Login Error : ", err));
        } else {
          if (res.getUid() !== props.event_id + "-client") {
            await CometChatUIKit.logout();
            _loginUser(call + 1);
          } else {
            setUser(res);
            await _getGroup();
          }
        }
      })
      .catch((err: any) => {
        console.log("LogedInUser -> Error : ", err);
        if (err?.toLowerCase()?.includes("uikitsettings")) {
          console.log("TRuuuE");
          setTimeout(async () => {
            await _loginUser(call + 1);
          }, 1500);
        }
      });
  };

  const _getGroup = async () => {
    // "ERR_GROUP_NOT_JOINED"
    const CometChatUIKit = (await import("@cometchat/chat-sdk-javascript"))
      .CometChat;
    CometChatUIKit.getGroup(props.event_id + "-client-chat")
      .then((res) => {
        console.log("Group Res : ");

        setGroup(res);
      })
      .catch((err) => {
        console.error("Get Group Error : ", err);
      });
  };

  const toggleChat = () => {
    setIsVisible(!isVisible);
    localStorage.setItem(CC_Contstants.LOCAL_STORAGE_ADDRESS, JSON.stringify(0))
    if (!isVisible) setMessageCount(0);
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

  // console.log("Message Count : ", messageCount, group);

  return (
    <div className={styles.container} ref={ref}>
      <div
        className={`${styles.chatContainer} ${
          isVisible ? styles.chatVisible : styles.chatHidden
        }`}
      >
        <ChatComponent group={group} />
      </div>
      {user && (
        <div className={styles.chatBtn} onClick={toggleChat}>
          {messageCount > 0 && (
            <div className={styles.messageBadge}>{messageCount}</div>
          )}

          <Image
            src={
              isVisible
                ? "/images/icons/Close_round_primary.svg"
                : "/images/icons/Chat_alt_2.svg"
            }
            alt="chat icon"
            width={25}
            height={25}
          />
        </div>
      )}
    </div>
  );
};

export default CometChatPopup;
