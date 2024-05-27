"use client";

export const routes = {
  FULL_VIEW: "",
  CLIENT_VENUE_PORTAL: "client-venue-portal",
  EVENT_SUPPLY: "event-supply",
  TECHNICAL_SPEC: "technical-spec",
  KITCHEN_SUPPLY: "kitchen-supply",
  INSURANCE_REQUIREMENTS: "insurance-requirements",
};

export const CC_Contstants = {
  MESSAGES_LISTENER: 'message-listener',
  LOCAL_STORAGE_ADDRESS: 'CLIENT-LOCAL-COUNT'
}

export const END_POINTS = {
  UPDATE_SIGNED_DOCUMENTS_STATUS: 'https://myapi.runofshowapp.com/api/inventory/saveDocumentStatus',
  SHARE_FILE_VIA_EMAIL: 'https://myapi.runofshowapp.com/api/email-attachment/inventory',
  SAVE_CHECKOUT_ITEMS: 'https://myapi.runofshowapp.com/api/inventory/checkout',
  DELETE_CHECKOUT_ITEMS: "https://myapi.runofshowapp.com/api/inventory/deleteItemFromCart",
  UPDATE_QUESTION: 'https://myapi.runofshowapp.com/api/inventory/saveQuestions'
}

export const Image_URL_Base =
  "https://ros-rosbucket221548-newdev.s3.amazonaws.com/public/";
