const express = require('express');
const {admin} = require('../config/firebase');


exports.sendNotification = async (req, res) => {
    const {token, title, body} = req.body;
    if(!token || !title || !body) {
        return res.status(400).json({code: 400,message: 'Token, title and body are required'});
    }
    const message = {
        notification: {
            title: title,
            body: body
        },
        token: token
    };
 console.log("admin",admin);   
 try{
        const response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
        return res.status(200).json({code: 200,message: 'Notification sent successfully'});
    }catch(error){
        console.log('Error sending message:', error);
        return res.status(500).json({code: 500,message: 'Error sending notification'});
    }
}
