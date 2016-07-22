/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */



 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        var notificationOpenedCallback = function(jsonData) {
            alert('got message didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
        };

        window.plugins.OneSignal.init( "1c8e50b0-7607-4c7e-8251-6a9befad91e1",
            {googleProjectNumber: "834476493161"},
            app.didReceiveRemoteNotificationCallBack);
        window.plugins.OneSignal.setSubscription(true);


        window.plugins.OneSignal.getIds(function(ids) {
          console.log('getIds: ' + JSON.stringify(ids));
          alert("userId = " + ids.userId + ", pushToken = " + ids.pushToken);
        });
        
        window.plugins.OneSignal.enableNotificationWhenActive(true);
        window.plugins.OneSignal.enableInAppAlertNotification(true);


        
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    didReceiveRemoteNotificationCallBack : function(jsonData) {
        alert("Notification received:\n" + JSON.stringify(jsonData));
        console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
    }
};

function sendTag() {
    window.plugins.OneSignal.sendTag("PhoneGapKey", "PhoneGapValue");
}
function getIds() {
    window.plugins.OneSignal.getIds(function(ids) {
        document.getElementById("OneSignalUserId").innerHTML = "UserId: " + ids.userId;
        document.getElementById("OneSignalPushToken").innerHTML = "PushToken: " + ids.pushToken;
        console.log('getIds: ' + JSON.stringify(ids));
    });
}

// window.plugins.OneSignal.init( "1c8e50b0-7607-4c7e-8251-6a9befad91e1",
//                                         {googleProjectNumber: "794377372837"},
//                                         app.didReceiveRemoteNotificationCallBack);