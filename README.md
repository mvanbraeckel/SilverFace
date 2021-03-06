![alt text](./SilverFace-logo.bmp "SilverFace Logo") 

# SilverFace
For the first annual NCR Global Hackathon, my team of 4 co-ops, SilverFace, was awarded for being in the top 10 finalists of nearly 400 teams for our submission of a React Native software we called FacePay. Essentially, this product would allow a POS system to no longer require a card or sign-in during transactions because it uses facial recognition to detect and identify its operating customer and charge the bill to the associated account. It mainly used Expo, Microsoft Azure Face API, Imgur API, and Outlook API.

### Demo Preview
The below shows an example usage of the software from the original demo. A full demo MP4 file is available in the repo.

![alt text](./demo-preview.gif "SilverFace Demo Preview")

## Project Summary:
The goal of this project is to enable hands-free transactions, with payment not requiring a wallet or signing in manually. When approaching our POS system, the system uses facial recognition to detect and identify the customer. From there, customized options can be presented(purchase your last order, tailored options) and the customer can make a transaction and check out without reaching for their wallet.

Facial Recognition is done using Microsoft's Azure Cognitive Services 'Face API', which uses machine learning to aid in facial detection and identification. Individual customers are added to a group, with multiple photos linked to each customer. The service is then trained on these photos to improve recognition.

React Native is used for the app and front-end. The camera continuously attempts to detect a face. If a face is detected, the camera saves the image and sends it to Azure Face API for identification. If the face matches one of the registered customers, that customer is logged in to complete the purchase, no card is required. After completing a purchase, an electronic receipt is sent via email to the customer with details of their purchase.

## Technologies Used:
 - React Native + Expo for app development and initial face detection
 - Microsoft Azure Cognitive Services Face API for facial recognition and identification
 - Outlook API for forwarding e-receipts after purchase
 - Imgur API for image hosting services

### How to Start Up App
 - `npm install expo-cli` at root level of *face-pay*, and then also inside *face-pay-app*
 - Next, use a mobile device to scan the generated QR code which will bring up the Expo app (make sure you have Expo installed)
 - Note: However, FacePay won't work currrently because keys and tokens are expired

*Do not use code from this or copy any aspects without explicit permission from creator*
