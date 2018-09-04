//Helper Functions
var elicit = require('./elicit.js')

function changePassword(intentRequest, callback) {
    var intentName = intentRequest.currentIntent.name;
    var account = intentRequest.currentIntent.slots.service;
    var knowId = intentRequest.currentIntent.slots.service;
    var knowId = intentRequest.currentIntent.slots.ID;
    if (account === 'AD') {
        
        //(sessionAttributes, intentName, slots, slotToElicit, message) 
        callback(elicit.confirmIntent(intentRequest.sessionAttributes, 'hangUp',  {
              contentType: 'PlainText',
            content: `<div>Let's call the Service Desk to check out your issue.
                    	<a href="tel:559-278-5000">559.278.5000</a>
                        </div>
                    	<div> Or <a href="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target="_blank">Click Here</a>
                    			to submit a workorder.</div>
                    	<div>Is there anything else we can help you with today?</div>`
        }));
    }else if (account !== null) {
        if (account === 'myfresnostate' || account === 'blackboard' || account === "email" || account === "wifi" || account === "box") {
            if (knowId === null) {
                callback(elicit.elicitSlot(intentRequest.sessionAttributes, intentName, intentRequest.currentIntent.slots, "ID"));
                return;
            } else if (knowId === "No") {
                callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                    contentType: 'PlainText',
                    content: `<div> Please call the Reigstar office for your ID and username: <a href="tel:559-278-2191">559.278.2191</a></div>
								<div> More information <a target = "_blank" href = "http://fresnostate.edu/studentaffairs/registrar"> Click Here </a> </div>
								<div> After you have access your your ID Number and User please <a target = "_blank" href = "https://idm.fresnostate.edu/pwreset/"/> Click here</a> to reset your password. </div>
								<div> If you still don't have access Please call <a href="tel:559-278-5000">559.278.5000</a>.</div>`
                }));
                return;
            } else {
                callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                    contentType: 'PlainText',
                    content: `<div>Let's head over to Password Managment to change your password. </div>
						
								<div><a target = "_blank" href = "https://idm.fresnostate.edu/pwreset/"> Click Here </a> </div>
								<div> If you need more information. Please call the Service Desk at <a href="tel:559-278-5000">559.278.5000</a></div>`
                }));
                return;
            }
        } else {
                callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div>Let's call the Service Desk to check out your issue.
                    					 
                                        <a href="tel:559-278-5000">559.278.5000</a>
                    						</div>
                    						<div> Or <a href="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target="_blank">Click Here</a>
                    					        to submit a workorder.</div>`
                    }));
        }
    } else {
        callback(elicit.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
        return;
    }
}
function box(intentRequest, callback) {
    var intentName = "box";
    var boxSlots = {
        createdAcct: null,
        Boxissue: null
    };
    if (intentRequest.currentIntent.name === intentName) {
        if (intentRequest.currentIntent.slots.createdAcct === "Yes") {
            if (intentRequest.currentIntent.slots.Boxissue === "information") {
 
                callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                    contentType: "PlainText",
                    content: `<div> For more information regarding box please <a target = "_blank" href = "http://fresnostate.edu/technology/boxforstaff.html"> Click Here </a></div>
										<div> To sign into box please <a target = "blank" href = "https://fresnostate.account.box.com/login">Click Here</a></div>`
                }));
                return;
            } else if (intentRequest.currentIntent.slots.Boxissue === "support") {
                callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                    contentType: "PlainText",
                    content: `<div> For box support please give the Service Desk a call at <a href="tel:559-278-5000">559.278.5000</a></div>
										<div> For more information on Box please <a targert = "blank" href = "https://fresnostate.account.box.com/login">Click Here</a></div>`
                }));
                return;
            } else {
                callback(elicit.elicitSlot(intentRequest.sessionAttributes, intentName, intentRequest.currentIntent.slots, "Boxissue"));
                return;
            }
        } else if (intentRequest.currentIntent.slots.createdAcct === "No") {
            callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                contentType: 'PlainText',
                content: `<div>Let's head over to create your Fresno State Box account! </div>
								<div><a target = "_blank" href = "https://fresnostate.account.box.com/login"/> Click Here </a> </div>
								<div> For Help with box please <a target = "_blank" href = "http://fresnostate.edu/technology/boxforstaff.html">Click Here</a></div>
								<div> Need Help? Please call <a href="tel:559-278-5000">559.278.5000</a></div>`
            }));
            return;
        } else {
            callback(elicit.elicitSlot(intentRequest.sessionAttributes, intentName, intentRequest.currentIntent.slots, "createdAcct"));
            return;
        }
    } else {
        callback(elicit.elicitSlot(intentRequest.sessionAttributes, intentName, boxSlots, "createdAcct"));
        return;
    }
}

function accountAccess(intentRequest, callback) {
    var intentName = intentRequest.currentIntent.name;
    var account = intentRequest.currentIntent.slots.service;
    var knowId = intentRequest.currentIntent.slots.ID;
    if (account === 'AD') {
            callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div>Let's call the Service Desk to have you give you access to your AD account.
                                        <a href="tel:559-278-5000">559.278.5000</a>
                    				</div>
                    				<div> Or <a href="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target="_blank">Click Here</a>
                    				    to submit a workorder.</div>`
                    }));
    } else if (account === "box") {
        box(intentRequest, callback);
    } else if (account !== null) {
        if (account === 'myfresnostate' || account === 'blackboard') {
            if (knowId === null) {
                callback(elicit.elicitSlot(intentRequest.sessionAttributes, intentName, intentRequest.currentIntent.slots, "ID"));
                return;
            } else if (knowId === "No") {
                callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                    contentType: 'PlainText',
                    content: `<div> Please Call the Reigstar office for your ID and Username.</div>
								<div<a href="tel:559-278-2191<">559.278.2191></a></div>
								<div> More information <a target = "_blank" href = "http://fresnostate.edu/studentaffairs/registrar"/> Click Here </a> </div>
								<div> After you have access your your ID Number and User please <a target = "_blank" href = "https://idm.fresnostate.edu/pwreset/"> Click here</a> to reset your password. </div>
								<div> If you still don't have access Please call <a href="tel:559-278-5000">559.278.5000</a>.</div>`
                }));
                return;
            } else {
                callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                    contentType: 'PlainText',
                    content: `<div>Let's head over to Password Managment to change your password. /div>
						
								<div><a target = "_blank" href = "https://idm.fresnostate.edu/pwreset/"> Click Here </a>.</div>
								<div> If you need more information. Please call <a href="tel:559-278-5000">559.278.5000</a></div>`
                }));
                return;
            }
        } else {
    callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div>Let's call the Service Desk to check out your issue.
                                            <a href="tel:559-278-5000">559.278.5000</a>
                    						</div>
                    						<div> Or <a href="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target="_blank">Click Here</a>
                    					        to submit a workorder.</div>`
                    }));
        }
    } else {
        callback(elicit.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
        return;
    }
}

function connectWifi(intentRequest, callback) {
    //var device = intentRequest.currentIntent.slots.device;
    var network = intentRequest.currentIntent.slots.fresnostate_networks;
    //if fields are NOT null
    //&&  device != null
    if (network != null) {
        if (network === "eduroam") {
            callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                contentType: 'PlainText',
                content: `<div>Follow these intructions to connect your device to wifi </div>
						<p><a href="http://fresnostate.edu/help/students/internet/setting-up-eduroam.html" target="_blank">Click Here</a></p>
						<div>If any questions. Please contact the Service Desk.</div> 
						<div><a href="tel:559-278-5000">559.278.5000</a></div>`
            }));
            return;
            //Else bulldogs network	
        } else {
            callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                contentType: 'PlainText',
                content: `<div>Let's connect your device to the bulldogs network!</div>
							<div>
							    <ol>
							        <li>Click on <i>Bulldogs</i> wifi.</li>
							        <li> Open your browser.</li>
							        <li>Head over to <i>FresnoState.edu</i>.</li>
							        <li>Login with your Fresno State Credentials </li>
							    </ol>
							</div>
							
							<div>If any questions. Please contact the Service Desk.</div>
							<div>
							     <a href="tel:559-278-5000">559.278.5000</a>
							</div>`
            }));
            return;
        }
    } else {
        //elicit.delegate
        callback(elicit.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
        return;
    }
}

function discovere(intentRequest, callback) { 
    var userRequest = intentRequest.currentIntent.slots.discovere_issue;
    if (userRequest === "information") {
        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
            contentType: 'PlainText',
            content: `<div>A DISCOVERe mobile technology class means knowledge is at your fingertips. According to research, it also has the potential to:
							<ul>
								<li> Lower course materials cost</li>
								<li> Make group projects/collaboration easier</li>
								<li> Make learning interactive through apps </li>
								<li> Improve efficiency </li>
								<li> Increase digital skills for career development </li>
							</ul>
						</div>
						<div>For more information <a href = "http://fresnostate.edu/president/discovere/faq.html" target = "_blank"> Click Here </a> or call <a href="tel:559-278-1812">559.278.1812</a></div>`
        }));
        return;
    } else {
        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
            contentType: 'PlainText',
            content: `<div>For questions about trainings and support, 
						please contact the DISCOVERe Hub at <a href="mailto:discoverehub@csufresno.edu?Subject=Need%20Assistance" target="_top">discoverehub@csufresno.edu</a> or by phone at <a href="tel:559-278-1812">559.278.1812</a></div>`
        }));
        return;
    }
}

function emailTrouble(intentRequest, callback) {
    var email_issue = intentRequest.currentIntent.slots.email_issue;
    if (email_issue === "Sending_Receiving") {
        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
            contentType: 'PlainText',
            content: `<div>There could be a few issues that are causing the problem in sending emails. Lets call the Service Desk to check your issue out.</div>
            			<div>You can submit a work order <a href="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target="_blank">here</a> and we will get in touch with you as soon as possible.</div>
						<div>For more information <a href = "http://fresnostate.edu/help/students/gmail/faq.html" target = "_blank"> Click Here </a> or call <a href="tel:559-278-5000">559.278.5000</a></div>`
        }));
        return;
    } else if (email_issue === "Accessing") {
        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
            contentType: 'PlainText',
            content: `<div><a target = "_blank" href = "http://mail.fresnostate.edu"/> Click Here </a> to access your Fresno State Email </div>
							<div>If you haven't created your Fresno State Email account you can <a target="_blank" href="https://googleapps.fresnostate.edu">Click Here</a> to get it created. </div>
								<div> Need Help? Please call <a href="tel:559-278-5000">559.278.5000</a></div>`
        }));
        return;
    } else {
    callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div>Let's call the Service Desk to check out your issue.
                    					 
                                    <a href="tel:559-278-5000">559.278.5000</a>
                    					</div>
                    						<div> Or <a href="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target="_blank">Click Here</a>
                    					        to submit a workorder.</div>`
                    }));
    }
}

function listserv(intentRequest, callback) {
    var name = intentRequest.currentIntent.name;
    var listserv_issue = intentRequest.currentIntent.slots.listserv_issue;
    if (listserv_issue === "reset") {
        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
            contentType: 'PlainText',
            content: `<div>For information for resetting your listserv password <a href="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target="_blank">Click Here</a></div>
            	         <div> Need Help? Please call <a href="tel:559-278-5000">559.278.5000</a> Or <a href="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target="_blank">
            	       Click Here</a> to submit a workorder.</div>`
        }));
        return;
    } else if (listserv_issue === "request") {
        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
            contentType: 'PlainText',
            content: `<div>To request a listserv <a href="https://www.fresnostate.edu/help/fac-staff/work-orders/new-listserv-request.html" target="_blank">Click Here</a></div>
            	         <div> Need Help? Please call <a href="tel:559-278-5000">559.278.5000</a> Or <a href="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target="_blank">
            	       Click Here</a> to submit a workorder.</div>`
        }));
        return;
    } else {
        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
            contentType: 'PlainText',
            content: `<div>For Listserv support <a href="https://www.fresnostate.edu/help/fac-staff/listserv/support.html" target="_blank">Click Here</a></div>
            	        <div> Need Help? Please call <a href="tel:559-278-5000">559.278.5000</a> Or <a href="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target="_blank">
            	       Click Here</a> to submit a workorder.</div>`
        }));
        return;
    }
}

function clear_cache_cookies(intentRequest, callback) {
    var intentName = "clearCacheCookies";
    var browser = intentRequest.currentIntent.slots.browser;
    if (browser === null) {
        callback(elicit.elicitSlot(intentRequest.sessionAttributes, intentName, intentRequest.currentIntent.slots, "browser"));
    } else {
        if (browser === "safari") {
            callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                contentType: "PlainText",
                content: `<div> Let's try clearing your cache and cookies for Safari</div>
                                        <div>Steps to Clear Cache and Cookies:
                							<ol>
                								<li>Click on Safari and then on Preferences.</li>
                									<a href ="https://kb.wisc.edu/images/group1/69468/ScreenShot2016-12-14at4.35.13PM.png" target = "_blank"><img src ="https://kb.wisc.edu/images/group1/69468/ScreenShot2016-12-14at4.35.13PM.png"/></a>
                								<li>Select Privacy and then click Manage Website Data.li>
                								<li>Select Remove All and then in the small popup, selection Remove Now.</li>
                								    <a href = "https://kb.wisc.edu/images/group1/69468/ScreenShot2016-12-14at4.41.23PM.png" target ="_blank"><img src = "https://kb.wisc.edu/images/group1/69468/ScreenShot2016-12-14at4.41.23PM.png"/></a>
                							</ol>
					                	</div>
						                <div>If you're issue still persist please call the Service Desk <a href="tel:559-278-5000">559.278.5000</a></div>`
            }));
            return;
        } else if (browser === "chrome") {
            callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                contentType: "PlainText",
                content: `<div> Let's try clearing your cache and cookies for Chrome.</div>
                                        <div>Steps to Clear Cache and Cookies:
                							<ol>
                								<li>At the top right, click the three little dots <img src="//storage.googleapis.com/support-kms-prod/ArAlBcUAe8h1l5m69uxnwElxkqwW0QdtIc3F" width="18" height="18" alt="More" title="More"></li>
                								<li>Click <b>More tools</b> and then click on <b>Clear browsing data.</b></li>
                							       <a href ="https://preview.ibb.co/jS57kz/Screen_Shot_2018_08_22_at_8_19_47_PM.png" target ="_blank"><img src="https://preview.ibb.co/jS57kz/Screen_Shot_2018_08_22_at_8_19_47_PM.png" alt="chrome_clear_browsing_data" border="0"></a>
                								<li>Select <b>Remove All</b> and then in the small popup, selection Remove Now.</li>
                								<a href = "https://image.ibb.co/dzNCkz/Screen_Shot_2018_08_22_at_8_18_15_PM.png" target = "_blank"><img src="https://image.ibb.co/dzNCkz/Screen_Shot_2018_08_22_at_8_18_15_PM.png" alt="chrome_clear_browsing_data" border="0"></a>
                							</ol>
					                	</div>
						                <div>If you're issue still persist please call the Service Desk. <a href="tel:559-278-5000">559.278.5000</a></div>`
            }));
            return;
        } else if (browser === "firefox") {
            callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                contentType: "PlainText",
                content: `<div> Let's try clearing your cache and cookies for Firefox.</div>
                                        <div>Steps to Clear Cache and Cookies:
                							<ol>
                								<li>Click the menu button<img src ="https://prod-cdn.sumo.mozilla.net/uploads/gallery/images/2017-10-22-15-37-15-18c775.png" alt ="menu icon"> and choose <b>Preferences</b>.</li>
      								            <li> Select the <b>Privacy & Security</b> panel.</li>
                								<li>In the <b>Cookies and Site Data</b> section, click on <b> Clear Data.</b></li>
                								<a href="https://preview.ibb.co/erFjXe/firefox_cache_cookies.png" target ="_blank"><img src="https://preview.ibb.co/erFjXe/firefox_cache_cookies.png" alt="firefox_cache_cookies" border="0"></a>
                							</ol>
					                	</div>
						                <div>If you're issue still persist please call the Service Desk. <a href="tel:559-278-5000">559.278.5000</a></div>`
            }));
            return;
        } else if (browser === "IE") {
            callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                contentType: "PlainText",
                content: `<div> Let's try clearing your cache and cookies for Edge.</div>
                                        <div>Steps to Clear Cache and Cookies:
                							<ol>
                								<li>Select the <b>Hub icon</b> (three horizontal lines at top bar in front of a star), click the History menu option, and then click <b>Clear history.</b></li>
                								     <a href="https://preview.ibb.co/n4HjyK/edge_1.png"targert ="_blank"><img src="https://preview.ibb.co/n4HjyK/edge_1.png" alt="edge_1" border="0"></a>
                							       
                								<li>In the <b>Cookies and Site Data</b> section, click on <i> Clear Data.</i></li>
                								<a href="https://image.ibb.co/mmVXkz/edge_2.png" target ="_blank"><img src="https://image.ibb.co/mmVXkz/edge_2.png" alt="edge_2" border="0"></a>
                							</ol>
					                	</div>
						                <div>If you're issue still persist please call the Service Desk. <a href="tel:559-278-5000">559.278.5000</a></div>`
            }));
            return;
        } else {
            callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                contentType: 'PlainText',
                content: `<div>Let's call the Service Desk to check out your issue. <a href="tel:559-278-5000">559.278.5000</a></div>
                    					<div> Or <a href="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target="_blank">Click Here</a>
                    					   to submit a workorder.</div> `
            }));
            return;
        }
    }
}

function peoplesoft(intentRequest, callback) {
    var name = intentRequest.currentIntent.name;
    var userType = intentRequest.currentIntent.slots.userType;
    var userIssue = intentRequest.currentIntent.slots.userIssue;
    var popUp = intentRequest.currentIntent.slots.popUp;
    var browser = intentRequest.currentIntent.slots.browser;
    if (userIssue === null) {
        callback(elicit.elicitSlot(intentRequest.sessionAttributes, name, intentRequest.currentIntent.slots, "userIssue"));
        return;
    } else if (userIssue === "forms") {
        //Check if pop up browser is enabled. If not call clear cache and cookies function
        if (popUp === "Yes") {
            //lets try clearing your cache and cookies you can either call the service desk or submit a workorder to take a look at your account.
            if (browser === null) {
                callback(elicit.elicitSlot(intentRequest.sessionAttributes, name, intentRequest.currentIntent.slots, "browser"));
            } else {
                if (browser === "safari") {
                    callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: "PlainText",
                        content: `<div> Let's try clearing your cache and cookies for Safari</div>
                                        <div>Steps to Clear Cache and Cookies:
                							<ol>
                								<li>Click on Safari and then on Preferences.</li>
                									<a href ="https://kb.wisc.edu/images/group1/69468/ScreenShot2016-12-14at4.35.13PM.png" target = "_blank"><img src ="https://kb.wisc.edu/images/group1/69468/ScreenShot2016-12-14at4.35.13PM.png"/></a>
                								<li>Select Privacy and then click Manage Website Data.li>
                								<li>Select Remove All and then in the small popup, selection Remove Now.</li>
                								    <a href = "https://kb.wisc.edu/images/group1/69468/ScreenShot2016-12-14at4.41.23PM.png" target ="_blank"><img src = "https://kb.wisc.edu/images/group1/69468/ScreenShot2016-12-14at4.41.23PM.png"/></a>
                							</ol>
					                	</div>
						                <div>If you're issue still persist please call the Service Desk <a href="tel:559-278-5000">559.278.5000</a></div>`
                    }));
                } else if (browser === "chrome") {
                    callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: "PlainText",
                        content: `<div> Let's try clearing your cache and cookies for Chrome.</div>
                                        <div>Steps to Clear Cache and Cookies:
                							<ol>
                								<li>At the top right, click the three little dots <img src="//storage.googleapis.com/support-kms-prod/ArAlBcUAe8h1l5m69uxnwElxkqwW0QdtIc3F" width="18" height="18" alt="More" title="More"></li>
                								<li>Click <b>More tools</b> and then click on <b>Clear browsing data.</b></li>
                							       <a href ="https://preview.ibb.co/jS57kz/Screen_Shot_2018_08_22_at_8_19_47_PM.png" target ="_blank"><img src="https://preview.ibb.co/jS57kz/Screen_Shot_2018_08_22_at_8_19_47_PM.png" alt="chrome_clear_browsing_data" border="0"></a>
                								<li>Select <b>Remove All</b> and then in the small popup, selection Remove Now.</li>
                								<a href = "https://image.ibb.co/dzNCkz/Screen_Shot_2018_08_22_at_8_18_15_PM.png" target = "_blank"><img src="https://image.ibb.co/dzNCkz/Screen_Shot_2018_08_22_at_8_18_15_PM.png" alt="chrome_clear_browsing_data" border="0"></a>
                							</ol>
					                	</div>
						                <div>If you're issue still persist please call the Service Desk. <a href="tel:559-278-5000">559.278.5000</a></div>`
                    }));
                    
                } else if (browser === "firefox") {
                    callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: "PlainText",
                        content: `<div> Let's try clearing your cache and cookies for Firefox.</div>
                                        <div>Steps to Clear Cache and Cookies:
                							<ol>
                								<li>Click the menu button<img src ="https://prod-cdn.sumo.mozilla.net/uploads/gallery/images/2017-10-22-15-37-15-18c775.png" alt ="menu icon"> and choose <b>Preferences</b>.</li>
      								            <li> Select the <b>Privacy & Security</b> panel.</li>
                								<li>In the <b>Cookies and Site Data</b> section, click on <b> Clear Data.</b></li>
                								<a href="https://preview.ibb.co/erFjXe/firefox_cache_cookies.png" target ="_blank"><img src="https://preview.ibb.co/erFjXe/firefox_cache_cookies.png" alt="firefox_cache_cookies" border="0"></a>
                							</ol>
					                	</div>
						                <div>If you're issue still persist please call the Service Desk. <a href="tel:559-278-5000">559.278.5000</a></div>`
                    }));
                    
                } else if (browser === "IE") {
                    callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: "PlainText",
                        content: `<div> Let's try clearing your cache and cookies for Edge.</div>
                                        <div>Steps to Clear Cache and Cookies:
                							<ol>
                								<li>Select the <b>Hub icon</b> (three horizontal lines at top bar in front of a star), click the History menu option, and then click <b>Clear history.</b></li>
                								     <a href="https://preview.ibb.co/n4HjyK/edge_1.png"targert ="_blank"><img src="https://preview.ibb.co/n4HjyK/edge_1.png" alt="edge_1" border="0"></a>
                							       
                								<li>In the <b>Cookies and Site Data</b> section, click on <i> Clear Data.</i></li>
                								<a href="https://image.ibb.co/mmVXkz/edge_2.png" target ="_blank"><img src="https://image.ibb.co/mmVXkz/edge_2.png" alt="edge_2" border="0"></a>
                							</ol>
					                	</div>
						                <div>If you're issue still persist please call the Service Desk. <a href="tel:559-278-5000">559.278.5000</a></div>`
                    }));
                    
                } else {
                    callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div>Let's call the Service Desk to check out your issue. <a href="tel:559-278-5000">559.278.5000</a></div>
                    					<div> Or <a href="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target="_blank">Click Here</a>
                    					   to submit a workorder.</div>`
                    }));
                    
                }
            }
        } else if (popUp === "No") {
            if (browser === null) {
                callback(elicit.elicitSlot(intentRequest.sessionAttributes, name, intentRequest.currentIntent.slots, "browser"));
            } else {
                if (browser === "safari") {
                    callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: "PlainText",
                        content: `<div> Let's try disabling pop-up Window Blcoker for Safari.</div>
                                        <div>Steps to Disable pop-up blocker:
                							<ol>
                								<li>Select select <b>Safari</b> then <b> Preferences</b>.</li>
                                                <li> Click on <b>Security</b> at the top of the window</li>
                								<li> Check the box <b> Block pop-up windows</b> to Disable it - Uncheck it to disable it.</li>
                								<a href="https://goo.gl/XQp2bU" target = "_blank"><img src="https://goo.gl/XQp2bU" alt="edge_2" border="0"></a>
                							</ol>
					                	</div>
						                <div>If you're issue still persist please call the Service Desk. <a href="tel:559-278-5000">559.278.5000</a></div>`
                    }));
                    return;
                } else if (browser === "chrome") {
                    callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: "PlainText",
                        content: `<div> Let's try disabling pop-up Window Blcoker for Chrome.</div>
                                        
					                	  <div> Click on the this icon towards the right of the Chrome browser - Then click Always Allow.
					                	  <a href="https://preview.ibb.co/hzHyse/Screen_Shot_2018_08_22_at_10_00_08_PM.png" target = "_blank" ><img src="https://preview.ibb.co/hzHyse/Screen_Shot_2018_08_22_at_10_00_08_PM.png" alt="Screen_Shot_2018_08_22_at_10_00_08_PM" border="0"></a>
					                	  </div>
						                <div>If you're issue still persist please call the Service Desk. <a href="tel:559-278-5000">559.278.5000</a></div>`
                    }));
                    
                } else if (browser === "firefox") {
                    callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: "PlainText",
                        content: `<div> Let's try disabling pop-up Window Blcoker for Chrome.</div>
                                            <div>Steps to Disable pop-up blocker:
                							    <ol>
                    								<li>Click the menu on the top right <img src = "https://prod-cdn.sumo.mozilla.net/uploads/gallery/images/2017-10-22-15-37-15-18c775.png" alt ="menu-icon"> then select <b>Preferences</b>.</li>
                                                    <li>Select <b>Content</b>.</li>
                    								<li>Uncheck the box to the left of "<i>Block pop-up windows.</i>"</li>
                    								<a href="https://goo.gl/5geAwf" target = "_blank"><img src="https://goo.gl/5geAwf" alt="edge_2" border="0"></a>
                							    </ol>
                							    <div><b>Note</b>: To open content after disabling or configuring the pop-up blocker, you may need to refresh the page.</div>
					                	</div>
						                <div>If you're issue still persist please call the Service Desk. <a href="tel:559-278-5000">559.278.5000</a></div>`
                    }));
                    
                } else if (browser === "IE") {
                    callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div> Let's try disabling pop-up Window Blcoker for Chrome.</div>
                                            <div>Steps to Disable pop-up blocker:
                							    <ol>
                    								<li>In Microsoft Edge select the 3 dots in the upper right hand corner.</li>
                    								    <a href = "https://goo.gl/Ei9gQb" target ="_blank"><img src = "https://goo.gl/Ei9gQb" alt = "find pop up">
                                                    <li>Then select <b>Settings</b>.</li>
                    								    <a href="https://goo.gl/TGqKes" target = "_blank"><img src="https://goo.gl/TGqKes" alt="edge_2" border="0"></a>
                    								<li>Select View Advanced Settings.</li>
                    								   <a href="https://goo.gl/kJVhRt" target = "_blank"><img src="https://goo.gl/kJVhRt" alt="edge_2" border="0"></a>
                    								<li>Then simply slide the Pop Ups to the off posistion.</li>
                    								    <a href="https://goo.gl/UEdY5r" target = "_blank"><img src="https://goo.gl/UEdY5r" alt="edge_2" border="0"></a>
                							    </ol>
                							    <div><b>Note</b>: To open content after disabling or configuring the pop-up blocker, you may need to refresh the page.</div>
					                	</div>
						                <div>If you're issue still persist please call the Service Desk. <a href="tel:559-278-5000">559.278.5000</a></div>`
                    }));
                    
                } else if (browser === "Other") {
                    callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div>Let's call the Service Desk to check out your issue.
                    							<a href="tel:559-278-5000">559.278.5000</a>
                    						</div>
                    						<div> Or <a href="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target="_blank">Click Here</a>
                    					        to submit a workorder.</div>`
                    }));
                }
            }
        } else {
            callback(elicit.elicitSlot(intentRequest.sessionAttributes, name, intentRequest.currentIntent.slots, "popUp"));
        }
    } else if (userIssue === "security request") {
        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
            contentType: 'PlainText',
            content: `<div>If you don't have access for a security request form. Try clearing your <b>cache and cookies</b>to give you access.</div>
                            <div>If that doesn't work try submitting a new security request</div>
                                <div> For instruction on how to submit a new security request <a href = "http://fresnostate.edu/help/fac-staff/myfresnostate/security/request.html" target = "_blank"> Click Here</a> </div>
                                  <div> If your issue persist Please call the Service Desk at <a href="tel:559-278-5000">559.278.5000</a></div> <div>Or <a href="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target="_blank">Click Here</a> to submit a workorder.</div>`
        }));
    } else {
        if (userType === null) {
            callback(elicit.elicitSlot(intentRequest.sessionAttributes, name, intentRequest.currentIntent.slots, "userType"));
        } else if (userType === "student") {
            peoplesoftStudent(intentRequest, callback);
        } else {
            var slot_ = {
                browser: null,
            }
            callback(elicit.elicitSlot(intentRequest.sessionAttributes, "clearCacheCookies", slot_, "browser", {
                contentType: 'PlainText',
                content: `<div> Let's try clearing your cache and cookies. If that does not work please call the Service Desk at <a href="tel:559-278-5000">559.278.5000</a> or 
                                submit a ticket by <a href ="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target = "_blank">Clicking Here</a></div>`
            }));
        }
    }
}

function peoplesoftStudent(intentRequest, callback) {
    var name = "peoplesoftStudent";
    if (intentRequest.currentIntent.name === name) {
        var registration_issue = intentRequest.currentIntent.slots.registration_issue;
        var student_issue = intentRequest.currentIntent.slots.student_Issue;
        var student_enrollment = intentRequest.currentIntent.slots.student_enrollment;
        var error_message = intentRequest.currentIntent.slots.error_message;
        var waitListed = intentRequest.currentIntent.slots.waitListed;
        var support = intentRequest.currentIntent.slots.support;
        var browser = intentRequest.currentIntent.slots.browser;
        
        if(student_enrollment !==null) student_issue = "registration";
        if (student_issue === null) {
            callback(elicit.elicitSlot(intentRequest.sessionAttributes, name, intentRequest.currentIntent.slots, "student_Issue"));
        } else if (student_issue === "registration") {
            if (registration_issue === null) {
                callback(elicit.elicitSlot(intentRequest.sessionAttributes, name, intentRequest.currentIntent.slots, "registration_issue"));
            } else if (registration_issue === "enroll") {
                if (student_enrollment === null) callback(elicit.elicitSlot(intentRequest.sessionAttributes, name, intentRequest.currentIntent.slots, "student_enrollment"));
                else if (student_enrollment === "error") {
                    if (error_message === null) callback(elicit.elicitSlot(intentRequest.sessionAttributes, name, intentRequest.currentIntent.slots, "error_message"));
                    else if (error_message === "enrollment error") {
                        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                            contentType: 'PlainText',
                            content: `<div>Try calling Admissions and Records <a href="tel:559-278-2261">559.278.2261</a>for your enrollment issue.</div>
                                            <div>For more information you can visit their website by <a href = "http://www.fresnostate.edu/studentaffairs/are/contact-us/index.html" target ="_blank">Clicking Here</a></div>`
                        }));
                    } else {
                        var slot_ = {
                            browser: null,
                        };
                        callback(elicit.elicitSlot(intentRequest.sessionAttributes, "clearCacheCookies", slot_, "browser", {
                            contentType: 'PlainText',
                            content: `<div> Let's try clearing your cache and cookies. If that does not work please call the Service Desk at <a href="tel:559-278-5000">559.278.5000</a> or 
                                                submit a ticket <a href ="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target = "_blank">here</a>.</div>`
                        }));
                    }
                } else if (student_enrollment === "permission number") {
                    if (waitListed === null) callback(elicit.elicitSlot(intentRequest.sessionAttributes, name, intentRequest.currentIntent.slots, "waitListed"));
                    else if (waitListed === "Yes") {
                        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                            contentType: 'PlainText',
                            content: `<div>Try dropping the class you are waitlisted on -- Then enroll again with the Permission number given to you.</div>
                                            <div>You can find more information on permission numbers by <a href = "http://fresnostate.edu/studentaffairs/registrar/registration/registration-information.html" target ="_blank">Clicking here</a>. Or you can call <a href="tel:559-278-2261">559.278.2261</a></div>`
                        }));
                    } else {
                        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                            contentType: 'PlainText',
                            content: `<div>Let's call the Service Desk at <a href="tel:559-278-5000">559.278.5000</a> to make sure that permission number that was given to you is active.</div>
                                            <div>You can find more information on permission numbers by <a href = "http://fresnostate.edu/studentaffairs/registrar/registration/registration-information.html" target ="_blank">Clicking Here</a></div>`
                        }));
                    }
                } else {
                    callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div>For any enrollment question please call Admissions and Records at <a href="tel:559-278-2261">559.278.2261</a>.</div>
                                            <div>For more information you can visit their website by <a target ="_blank"href = "http://fresnostate.edu/studentaffairs/registrar/registration/registration-information.html">Clicking Here</a>.</div>`
                    }));
                }
            } else if (registration_issue === "transcripts") {
                if (browser !== null) {
                    if (browser === "safari") {
                        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                            contentType: "PlainText",
                            content: `<div> Let's try disabling pop-up Window Blcoker for Safari.</div>
                                        <div>Steps to Disable pop-up blocker:
                							<ol>
                								<li>Select select <b>Safari</b> then <b> Preferences</b>.</li>
                                                <li> Click on <b>Security</b> at the top of the window</li>
                								<li> Check the box <b> Block pop-up windows</b> to Disable it - Uncheck it to disable it.</li>
                								<a href="https://goo.gl/XQp2bU" target = "_blank"><img src="https://goo.gl/XQp2bU" alt="edge_2" border="0"></a>
                							</ol>
					                	</div>
						                <div>If you're issue still persist please call the Service Desk. <a href="tel:559-278-5000">559.278.5000</a></div>`
                        }));
                    } else if (browser === "chrome") {
                        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                            contentType: "PlainText",
                            content: `<div> Let's try disabling pop-up Window Blcoker for Chrome.</div>
                                            
    					                	  <div> Click on the this icon towards the right of the Chrome browser - Then click Always Allow.
    					                	  <a href="https://preview.ibb.co/hzHyse/Screen_Shot_2018_08_22_at_10_00_08_PM.png" target = "_blank" ><img src="https://preview.ibb.co/hzHyse/Screen_Shot_2018_08_22_at_10_00_08_PM.png" alt="Screen_Shot_2018_08_22_at_10_00_08_PM" border="0"></a>
    					                	  </div>
    						                <div>If you're issue still persist please call the Service Desk. <a href="tel:559-278-5000">559.278.5000</a></div>`
                        }));
                    } else if (browser === "firefox") {
                        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                            contentType: "PlainText",
                            content: `<div> Let's try disabling pop-up Window Blcoker for Chrome.</div>
                                                <div>Steps to Disable pop-up blocker:
                    							    <ol>
                        								<li>Click the menu on the top right <img src = "https://prod-cdn.sumo.mozilla.net/uploads/gallery/images/2017-10-22-15-37-15-18c775.png" alt ="menu-icon"> then select <b>Preferences</b>.</li>
                                                        <li>Select <b>Content</b>.</li>
                        								<li>Uncheck the box to the left of "<i>Block pop-up windows.</i>"</li>
                        								<a href="https://goo.gl/5geAwf" target = "_blank"><img src="https://goo.gl/5geAwf" alt="edge_2" border="0"></a>
                    							    </ol>
                    							    <div><b>Note</b>: To open content after disabling or configuring the pop-up blocker, you may need to refresh the page.</div>
    					                	</div>
    						                <div>If you're issue still persist please call the Service Desk. <a href="tel:559-278-5000">559.278.5000</a></div>`
                        }));
                    } else if (browser === "IE") {
                        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                            contentType: 'PlainText',
                            content: `<div> Let's try disabling pop-up Window Blcoker for Chrome.</div>
                                                <div>Steps to Disable pop-up blocker:
                    							    <ol>
                        								<li>In Microsoft Edge select the 3 dots in the upper right hand corner.</li>
                        								    <a href = "https://goo.gl/Ei9gQb" target ="_blank"><img src = "https://goo.gl/Ei9gQb" alt = "find pop up">
                                                        <li>Then select <b>Settings</b>.</li>
                        								    <a href="https://goo.gl/TGqKes" target = "_blank"><img src="https://goo.gl/TGqKes" alt="edge_2" border="0"></a>
                        								<li>Select View Advanced Settings.</li>
                        								   <a href="https://goo.gl/kJVhRt" target = "_blank"><img src="https://goo.gl/kJVhRt" alt="edge_2" border="0"></a>
                        								<li>Then simply slide the Pop Ups to the off posistion.</li>
                        								    <a href="https://goo.gl/UEdY5r" target = "_blank"><img src="https://goo.gl/UEdY5r" alt="edge_2" border="0"></a>
                    							    </ol>
                    							    <div><b>Note</b>: To open content after disabling or configuring the pop-up blocker, you may need to refresh the page.</div>
    					                	</div>
    						                <div>If you're issue still persist please call the Service Desk. <a href="tel:559-278-5000">559.278.5000</a></div>`
                        }));
                    } else if (browser === "Other") {
                        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                            contentType: 'PlainText',
                            content: `<div>Let's call the Service Desk to check out your issue.
                        							<a href="tel:559-278-5000">559.278.5000</a>
                        						</div>
                        						<div> Or <a href="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target="_blank">Click Here</a>
                        					        to submit a workorder.</div>`
                        }));
                    }
                } else {
                    callback(elicit.elicitSlot(intentRequest.sessionAttributes, name, intentRequest.currentIntent.slots, "browser"));
                }
            } else {
                if (support === null) callback(elicit.elicitSlot(intentRequest.sessionAttributes, name, intentRequest.currentIntent.slots, "support"));
                else if (support === "information") {
                    callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div>For information on classes let's call Admissions and Records at <a href="tel:559-278-2261">559.278.2261</a></div>
                            <div>For more information online <a href = "http://fresnostate.edu/studentaffairs/registrar/index.html" target = "_blank">Click Here</a>.</div>`
                    }));
                } else {
                    callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div>For technical support please call the Serice Desk at <a href="tel:559-278-5000">559.278.5000</a></div>
                                <div> Or you can submit a ticket <a href ="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target = "_blank">here</a> and we'll get in touch with you as soon as possible.</div>`
                    }));
                }
            }
        } else if (student_issue === "DPR") {
            callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                contentType: 'PlainText',
                content: `<div>If you don't know how to run a Degree progress report. Let's call Admission and records at <i>559.278.2261</i></div>
                            <div>For more information on how to run a DPR report <a href = "http://fresnostate.edu/help/students/documents/DPR.pdf" target ="_blank">Click Here</a>.</div>`
            }));
        } else if (student_issue === "financial aid") {
            callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                contentType: 'PlainText',
                content: `<div>For issues for Financial Aid please call <a href="tel:559-278-2182">559.278.2182</a></div>
                            <div>For more information <a href = "http://www.fresnostate.edu/studentaffairs/financialaid/resources/index.html" target ="_blank">Click Here</a>.</div>`
            }));
        }else if (support === null) callback(elicit.elicitSlot(intentRequest.sessionAttributes, name, intentRequest.currentIntent.slots, "support"));
        else if (support === "information") {
            callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                contentType: 'PlainText',
                content: `<div>For information on classes let's call Admissions and Records at  <a href="tel:559-278-2261">559.278.2261</a></div>
                            <div>For more information online <a href = "http://fresnostate.edu/studentaffairs/registrar/index.html" target = "_blank">Click Here</a>.</div>`
            }));
        } else {
            callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                contentType: 'PlainText',
                content: `<div>For technical support please call the Serice Desk at <a href="tel:559-278-5000">559.278.5000</a></div>
                                <div> Or you can submit a ticket <a href ="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target = "_blank">here</a> and we'll get in touch with you as soon as possible.</div>`
            }));
        }
    } else {
        var slots_ = {
            registration_issue: null,
            student_Issue: null,
            student_enrollment: null,
            error_message: null,
            waitListed: null,
            support: null,
            browser: null,
            registration: null,
        };
        callback(elicit.elicitSlot(intentRequest.sessionAttributes, name, slots_, "student_Issue"));
    }
}

function popUpBlocker(intentRequest, callback) {
    var browser = intentRequest.currentIntent.slots.browser;
    var name = intentRequest.currentIntent.name;
    if (browser !== null) {
        if (browser === "safari") {
            callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                contentType: "PlainText",
                content: `<div> Let's try disabling pop-up Window Blcoker for Safari.</div>
                                        <div>Steps to Disable pop-up blocker:
                							<ol>
                								<li>Select select <b>Safari</b> then <b> Preferences</b>.</li>
                                                <li> Click on <b>Security</b> at the top of the window</li>
                								<li> Check the box <b> Block pop-up windows</b> to Disable it - Uncheck it to disable it.</li>
                								<a href="https://goo.gl/XQp2bU" target = "_blank"><img src="https://goo.gl/XQp2bU" alt="edge_2" border="0"></a>
                							</ol>
					                	</div>
						                <div>If you're issue still persist please call the Service Desk. <a href="tel:559-278-5000">559.278.5000</a></div>`
            }));
        } else if (browser === "chrome") {
            callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                contentType: "PlainText",
                content: `<div> Let's try disabling pop-up Window Blcoker for Chrome.</div>
                                            
    					                	  <div> Click on the this icon towards the right of the Chrome browser - Then click Always Allow.
    					                	  <a href="https://preview.ibb.co/hzHyse/Screen_Shot_2018_08_22_at_10_00_08_PM.png" target = "_blank" ><img src="https://preview.ibb.co/hzHyse/Screen_Shot_2018_08_22_at_10_00_08_PM.png" alt="Screen_Shot_2018_08_22_at_10_00_08_PM" border="0"></a>
    					                	  </div>
    						                <div>If you're issue still persist please call the Service Desk. <a href="tel:559-278-5000">559.278.5000</a></div>`
            }));
        } else if (browser === "firefox") {
            callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                contentType: "PlainText",
                content: `<div> Let's try disabling pop-up Window Blcoker for Chrome.</div>
                                                <div>Steps to Disable pop-up blocker:
                    							    <ol>
                        								<li>Click the menu on the top right <img src = "https://prod-cdn.sumo.mozilla.net/uploads/gallery/images/2017-10-22-15-37-15-18c775.png" alt ="menu-icon"> then select <b>Preferences</b>.</li>
                                                        <li>Select <b>Content</b>.</li>
                        								<li>Uncheck the box to the left of "<i>Block pop-up windows.</i>"</li>
                        								<a href="https://goo.gl/5geAwf" target = "_blank"><img src="https://goo.gl/5geAwf" alt="edge_2" border="0"></a>
                    							    </ol>
                    							    <div><b>Note</b>: To open content after disabling or configuring the pop-up blocker, you may need to refresh the page.</div>
    					                	</div>
    						                <div>If you're issue still persist please call the Service Desk. <a href="tel:559-278-5000">559.278.5000</a></div>`
            }));
        } else if (browser === "IE") {
            callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                contentType: 'PlainText',
                content: `<div> Let's try disabling pop-up Window Blcoker for Chrome.</div>
                                                <div>Steps to Disable pop-up blocker:
                    							    <ol>
                        								<li>In Microsoft Edge select the 3 dots in the upper right hand corner.</li>
                        								    <a href = "https://goo.gl/Ei9gQb" target ="_blank"><img src = "https://goo.gl/Ei9gQb" alt = "find pop up">
                                                        <li>Then select <b>Settings</b>.</li>
                        								    <a href="https://goo.gl/TGqKes" target = "_blank"><img src="https://goo.gl/TGqKes" alt="edge_2" border="0"></a>
                        								<li>Select View Advanced Settings.</li>
                        								   <a href="https://goo.gl/kJVhRt" target = "_blank"><img src="https://goo.gl/kJVhRt" alt="edge_2" border="0"></a>
                        								<li>Then simply slide the Pop Ups to the off posistion.</li>
                        								    <a href="https://goo.gl/UEdY5r" target = "_blank"><img src="https://goo.gl/UEdY5r" alt="edge_2" border="0"></a>
                    							    </ol>
                    							    <div><b>Note</b>: To open content after disabling or configuring the pop-up blocker, you may need to refresh the page.</div>
    					                	</div>
    						                <div>If you're issue still persist please call the Service Desk. <a href="tel:559-278-5000">559.278.5000</a></div>`
            }));
        } else if (browser === "Other") {
            callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                contentType: 'PlainText',
                content: `<div>Let's call the Service Desk to check out your issue.<a href="tel:559-278-5000">559.278.5000</a></div>
                        			<div> Or <a href="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target="_blank">Click Here</a>
                        				to submit a workorder.</div>`
            }));
        }
    } else {
        callback(elicit.elicitSlot(intentRequest.sessionAttributes, name, intentRequest.currentIntent.slots, "browser"));
    }
}

function serviceDesk(intentRequest, callback) {
    var name = intentRequest.currentIntent.name;
    var l = intentRequest.currentIntent.slots.Location;
    var h = intentRequest.currentIntent.slots.hours;
    var n = intentRequest.currentIntent.slots.number;
    
    if (l !== null || h !== null || n !== null) {
        if (l !== null && h === null && n === null) {
                    
         callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div>The Service Desk is located in Mckee Fisk Room 137.</div> <div>For directions click here: </br> <a target = "_blank"href ="https://www.google.com/maps/dir//36.8137222,-119.7491389/@36.8137111,-119.7496842,254m/data=!3m1!1e3"> <img src="https://image.ibb.co/fKM9F9/Screen_Shot_2018_08_29_at_11_15_16_PM.png" alt="Screen_Shot_2018_08_29_at_11_15_16_PM" border="0"></a></div>`
                    }));
        } else if (l === null && h !== null && n === null) {
                 callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div>Check out our hours by <a href ="http://fresnostate.edu/help/hours.html" target="_blank"> Clicking Here</a>!</div>` 
                }));
        } else if (l === null && h === null && n !== null) {
             callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div> You can get ahold of us at <a href="tel:559-278-5000">559.278.5000</a>.</div>` 
                    }));
        } else {
            //Check if all three are met
            if (l !== null && h !== null && n !== null) {
                      callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                         content: `<div>The Service Desk is located in Mckee Fisk Room 137.</div> <div>For directions click here: </br> <a target = "_blank"href ="https://www.google.com/maps/dir//36.8137222,-119.7491389/@36.8137111,-119.7496842,254m/data=!3m1!1e3"> <img src="https://image.ibb.co/fKM9F9/Screen_Shot_2018_08_29_at_11_15_16_PM.png" alt="Screen_Shot_2018_08_29_at_11_15_16_PM" border="0"></a></div>
                                    <div>Check out our hours by <a href ="http://fresnostate.edu/help/hours.html" target="_blank"> Clicking Here</a>!</div>
                                    <div> You can get ahold of us at <a href="tel:559-278-5000">559.278.5000</a>.</div>`
                    }));
            } else {
                //double's are met
                if(l !== null && h !== null && n === null){
                     callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div>The Service Desk is located in Mckee Fisk Room 137.</div> <div>For directions click here: </br> <a target = "_blank"href ="https://www.google.com/maps/dir//36.8137222,-119.7491389/@36.8137111,-119.7496842,254m/data=!3m1!1e3"> <img src="https://image.ibb.co/fKM9F9/Screen_Shot_2018_08_29_at_11_15_16_PM.png" alt="Screen_Shot_2018_08_29_at_11_15_16_PM" border="0"></a></div>
                                    <div>Check out our hours by <a href ="http://fresnostate.edu/help/hours.html" target="_blank"> Clicking Here</a>!</div>` 
                        }));
                }else if(l !== null && h === null && n !== null){
                    callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div>The Service Desk is located in Mckee Fisk Room 137.</div> <div>For directions <a target = "_blank"href ="https://www.google.com/maps/dir//36.8137222,-119.7491389/@36.8137111,-119.7496842,254m/data=!3m1!1e3"> Click here</a>.</div>
                                    <div>You can get ahold of us at <a href="tel:559-278-5000">559.278.5000</a>.</div>` 
                    }));
                }else{
                    callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div>Check out our hours by <a href ="http://fresnostate.edu/help/hours.html" target="_blank"> Clicking Here</a>!</div>
                                    <div> You can get ahold of us at <a href="tel:559-278-5000">559.278.5000</a>.</div>`
                    }));
                }   
            }
        }
    } else {
        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div>The Service Desk offers multiple channels of support and training for students, faculty, and staff to expedite technical support.</div> <div>
                                    So don't be afraid to give us a call at <a href="tel:559-278-5000">559.278.5000</a>	or <a href="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target="_blank">Click Here</a>
                    					  to submit a workorder, and we'll get back to you as soon as we can!</div>`
                    }));
    }
}
    
function dispatch(intentRequest, callback) {
    var name = intentRequest.currentIntent.name;
    if (name === "Password_Recovery") {
        changePassword(intentRequest, callback);
    } else if (name === "Voicemail") {
    callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div>Let's call the Service Desk for phone support.
                                        <a href="tel:559-278-5000">559.278.5000</a>
                    				</div>
                    				<div> Or <a href="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target="_blank">Click Here</a>
                    					  to submit a workorder.</div>`
                    }));
    } else if (name === "DuoTrouble") {
    callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div>Let's call the Service Desk to check out your issue.
                    					 
                                            <a href="tel:559-278-5000">559.278.5000</a>
                    						</div>
                    						<div> Or <a href="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target="_blank">Click Here</a>
                    					        to submit a workorder.</div>`
                    }));
    } else if (name === "securityQuestion") {
        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
            contentType: 'PlainText',
            content: `<div>Let's call the Service Desk for a password reset.</div>
						<div>
							 <a href="tel:559-278-5000">559.278.5000</a>
						</div>`
        }));
        return;
    } else if (name === "WifiConnect") {
        connectWifi(intentRequest, callback);
    } else if (name === "Access") {
        accountAccess(intentRequest, callback);
    } else if (name === "EmailActivation") {
        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
            contentType: 'PlainText',
            content: `<div>Lets head over to google app page to get your account activated.</div>
						<a target="_blank" href="https://googleapps.fresnostate.edu">Click Here</a>`
        }));
    } else if (name === "WorkOrderSubmit") {
        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
            contentType: 'PlainText',
            content: `<div>Click on the link below to submit a work order. </div> 
						<div>
							<a href="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target="_blank">Click Here</a>
						</div>`
        }));
    } else if (name === "box") {
        box(intentRequest, callback);
    } else if (name === "discovere") {
        discovere(intentRequest, callback);
    } else if (name === "emailTrouble") {
        emailTrouble(intentRequest, callback);
    } else if (name === "Listserve") {
        listserv(intentRequest, callback);
    } else if (name === "peoplesoft") {
        peoplesoft(intentRequest, callback);
    } else if (name === "peoplesoftStudent") {
        peoplesoftStudent(intentRequest, callback);
    } else if (name == "clearCacheCookies") {
        clear_cache_cookies(intentRequest, callback);
    }else if (name === "popUpBlocker"){
        popUpBlocker(intentRequest, callback);
    }else if(name === "ServiceDesk"){
        serviceDesk(intentRequest, callback);
    }else if (name === "hangUp"){
        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div>What else can we help you with? </div>`
        }));
    }else if (name === "profanity"){
        callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div>What can we help you with today?</div>`
        }));
    }
    else {
    callback(elicit.close(intentRequest.sessionAttributes, 'Fulfilled', {
                        contentType: 'PlainText',
                        content: `<div>Let's call the Service Desk for better support!
                    					 
                                        <a href="tel:559-278-5000">559.278.5000</a>
                    			    </div>
                    				<div> Or <a href="http://fresnostate.edu/help/fac-staff/work-orders/general_workorder.html" target="_blank">Click Here</a>
                    					  to submit a workorder.</div>`
                    }));
    }
}
exports.handler = (event, context, callback) => {
    try {
        console.log(event);
        dispatch(event, (response) => callback(null,  response));
    } catch (err) {
        callback(err);
    }
};