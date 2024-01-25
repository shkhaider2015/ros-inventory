"use client"
import React, { useEffect } from "react";
import styles from "./styles.module.css";
import Header from "@/components/Header";
import GlobalModal from "../common/GlobalModal";

const _initializeCometChat = async () => {
  const UIKitSettingsBuilder = (await import("@cometchat/chat-uikit-react")).UIKitSettingsBuilder;
  const CometChatUIKit = (await import("@cometchat/chat-uikit-react")).CometChatUIKit;

  const UIKitSettings = new UIKitSettingsBuilder()
    .setAppId('2433681a1ce4dd4a')
    .setRegion('us')
    .setAuthKey('c1181af78cba7b04f71d1ce3dc7c7dfcd274471d')
    .subscribePresenceForFriends()
    .build();

  //Initialize CometChat UIKit
  CometChatUIKit.init(UIKitSettings)
    ?.then(async () => {
      console.log("Initialization completed successfully");
      // You can now call login function.
    })
    .catch((err) => console.error("CometChat error ", err));
    // console.log("OOOOO 3");
};



const LayoutComp = ({ children }: { children: React.ReactNode }) => {
  
  useEffect(() => {
    if (typeof window !== "undefined") {
        // console.log("OOOOO 1", window);
        
      _initializeCometChat();
    }
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      {children}
      <GlobalModal />
    </div>
  );
};

export default LayoutComp;
