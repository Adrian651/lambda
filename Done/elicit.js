module.exports = {
    close: function(sessionAttributes, fulfillmentState, message) {
        return {
            sessionAttributes,
            dialogAction: {
                type: 'Close',
                fulfillmentState,
                message,
            },
        };
    },
    delegate: function(sessionAttributes, slots) {
        return {
            sessionAttributes,
            dialogAction: {
                type: 'Delegate',
                slots,
            },
        };
    },
    elicitSlot: function(sessionAttributes, intentName, slots, slotToElicit, message) {
        if (message !== null){
             return {
                sessionAttributes,
                dialogAction: {
                    type: 'ElicitSlot',
                    intentName,
                    slots,
                    slotToElicit,
                    message,
                },
            };
        }else{
            return{
                sessionAttributes,
                dialogAction: {
                    type: 'ElicitSlot',
                    intentName,
                    slots,
                    slotToElicit,
                },
            };
        }
    },
    elicitIntent: function(sessionAttributes, message) {
        return {
            sessionAttributes,
            dialogAction: {
                type: 'ElicitIntent',
                message,
            },
        };
    },
    confirmIntent: function(sessionAttributes, intentName, message) {
        return {
            sessionAttributes,
            dialogAction: {
                type: "ConfirmIntent",
                //slots,
                intentName,
                message,
                // responseCard : {
                    
                //     contentType: "application/vnd.amazonaws.card.generic",
                //     genericAttachments: [
                //       {
                //          title:"card-title",
                //          subTitle:"card-sub-title",
                //          buttons:[ 
                //              {
                //                 "text":"button-text",
                //                 "value":"Value sent to server on button click"
                //              }
                //           ]
                //       } 
                //   ] 
                // }//end response card
                
            }//dialog action
        };//end return
    }//end confirm intent
}