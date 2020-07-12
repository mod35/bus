(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{202:function(t,e,s){t.exports=s.p+"assets/img/room-booking-service.7a676348.png"},203:function(t,e,s){t.exports=s.p+"assets/img/room-booking-queue.2c43793d.png"},204:function(t,e,s){t.exports=s.p+"assets/img/room-booking-topic.772426b6.png"},205:function(t,e,s){t.exports=s.p+"assets/img/email-confirmation-coupled.82573f7c.png"},206:function(t,e,s){t.exports=s.p+"assets/img/room-reserved-event.ec9e82c3.png"},207:function(t,e,s){t.exports=s.p+"assets/img/workflow.3c121ca3.png"},257:function(t,e,s){"use strict";s.r(e);var a=s(0),n=Object(a.a)({},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"message-driven-microservices-in-node"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#message-driven-microservices-in-node","aria-hidden":"true"}},[t._v("#")]),t._v(" Message Driven Microservices in Node")]),t._v(" "),a("p",[t._v("Integrating services and microservices using messages is a proven and scalable pattern in many languages. In Node however, it's more popular to integrate services using HTTP. This isn't surprising given the framework was grown out of a browser engine and powers many web-based projects.")]),t._v(" "),a("p",[t._v("There are a number of key advantages with message based integrations that are difficult and sometimes impossible to achieve with HTTP. We'll run through a basic evolution of a message driven microservice system in node.")]),t._v(" "),a("h2",{attrs:{id:"what-does-a-message-based-integration-look-like"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-does-a-message-based-integration-look-like","aria-hidden":"true"}},[t._v("#")]),t._v(" What Does a Message Based Integration Look Like?")]),t._v(" "),a("p",[t._v("Consider a fictional system that deals with hotel bookings. We might create a single service that's responsible for booking a hotel room and logically looks like this:")]),t._v(" "),a("p",[a("img",{attrs:{src:s(202),alt:"Room booking service"}})]),t._v(" "),a("p",[t._v("From a messaging perspective, we can communicate with the service by sending a "),a("code",[t._v("command")]),t._v(" to make a reservation. This command is a message, which is just a JSON object describing what we want to do. This is placed into a message queue that the room booking service monitors. Whenever a message arrives, it is read and processed by the service. Our system will look like this:")]),t._v(" "),a("p",[a("img",{attrs:{src:s(203),alt:"Room booking queue"}})]),t._v(" "),a("p",[t._v("The nice part about placing the reservations into a queue is that the room booking service can process it at its own pace. If we receive a spike of reservations or the service is offline; the messages will just queue up. All these messages will eventually be processed once the service is online. This is quite different to HTTP services where if the service is down then requests are discarded.")]),t._v(" "),a("h2",{attrs:{id:"decoupling-the-system"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#decoupling-the-system","aria-hidden":"true"}},[t._v("#")]),t._v(" Decoupling the System")]),t._v(" "),a("p",[t._v("The downside to the above model is that the sender of the command needs to know which queue to place it on. That means knowledge about what services exist in our system and effectively what their queue names are. This type of coupling really hurts when systems become more complicated, and can make it difficult to refactor.")]),t._v(" "),a("p",[t._v("To avoid this we can send the command to a "),a("code",[t._v("topic")]),t._v(" instead. A topic is a routing mechanism that queues can subscribe to. We'd create a topic named after the command, and then subscribe the room booking queue to it. This way the sender can send commands to a topic of the same name, which will be automatically routed to the queue and service that handles that type of message. Our system now starts to look like this:")]),t._v(" "),a("p",[a("img",{attrs:{src:s(204),alt:"Room booking topic"}})]),t._v(" "),a("h2",{attrs:{id:"adding-another-microservice"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adding-another-microservice","aria-hidden":"true"}},[t._v("#")]),t._v(" Adding Another Microservice")]),t._v(" "),a("p",[t._v("At this point things are quite trivial - we have a system with a single microservice that processes bookings. The next thing we want to do is to send an email to the hotel each time a booking is made. We may decide that sending emails can be the responsibility of another service.")]),t._v(" "),a("p",[t._v("Given our current knowledge, we may jump straight in and build something where the room booking service sends a command to email the hotel with a confirmation like so:")]),t._v(" "),a("p",[a("img",{attrs:{src:s(205),alt:"Email confirmation coupled"}})]),t._v(" "),a("p",[t._v("This will work, but it couples together the process of booking a room with the process of sending an email confirmation to the hotel. This means that every time we book a room, a hotel email confirmation will be sent. It also means that the room booking service needs to know about and interact with the email confirmation system, and that we can no longer deal with it in isolation.")]),t._v(" "),a("p",[t._v("In order to decouple the room booking system from the email confirmation system, we need a way of reporting when a new reservation has been made that can be subscribed to by other services.")]),t._v(" "),a("h2",{attrs:{id:"publishing-changes-to-our-system"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#publishing-changes-to-our-system","aria-hidden":"true"}},[t._v("#")]),t._v(" Publishing Changes to Our System")]),t._v(" "),a("p",[t._v("If we want to broadcast that a command has been executed on our system, we use "),a("code",[t._v("events")]),t._v(".  These are a different type of message that just represent a historical fact that some change to our system has taken place. In our case, we want an event to be published that represents that a room booking was made.")]),t._v(" "),a("p",[t._v("Events are published to a topic that shares the same name of the event. Any services that are interested in a certain type of event can subscribe their service queue to that topic. In our case, we want to subscribe the confirmation email queue to the room reserved topic. This changes our system layout slightly:")]),t._v(" "),a("p",[a("img",{attrs:{src:s(206),alt:"Room Reserved Event"}})]),t._v(" "),a("p",[t._v("This is great - we have two loosely coupled services. We can change our booking service, move it around, break it apart - it doesn't matter. As long as it produces a room reserved event that gets placed in the room reserved topic; the system will continue to work.")]),t._v(" "),a("p",[t._v("The problem now is with our email confirmation system. In order to send a confirmation, it must consume an event. What if we want to send the same confirmation in different circumstances? Perhaps we want to delay sending until the payment has cleared?")]),t._v(" "),a("p",[t._v("What we really want to do is completely decouple the two services, but "),a("em",[t._v("orchestrate")]),t._v(" the logical flow of making a reservation and then sending a confirmation.")]),t._v(" "),a("h2",{attrs:{id:"exposing-process-logic-through-workflows"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#exposing-process-logic-through-workflows","aria-hidden":"true"}},[t._v("#")]),t._v(" Exposing Process Logic Through Workflows")]),t._v(" "),a("p",[t._v("Workflows are a coordination/orchestration mechanism. They wait for events from one service, and then invoke the next step of their logical flow.")]),t._v(" "),a("p",[t._v("Our workflow is simple and look something like this:")]),t._v(" "),a("p",[a("img",{attrs:{src:s(207),alt:"Workflow"}})]),t._v(" "),a("p",[t._v("We can see that there is no direct connection between the room booking service and the email confirmation service. Nice! Instead, our workflow is subscribing to the room reserved events, and sending out a command to email the hotel with a confirmation each time.")]),t._v(" "),a("p",[t._v("Workflows are as simple or complex as your business processes, but they serve a very important function - they allow complete decoupling of all of your services. This makes your system far more flexible to work on and change.")]),t._v(" "),a("h2",{attrs:{id:"show-me-some-code"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#show-me-some-code","aria-hidden":"true"}},[t._v("#")]),t._v(" Show Me Some Code!")]),t._v(" "),a("p",[t._v("At this point you may be wondering how to achieve this in Node. Perhaps you're familiar with some queuing technologies like SQS or RabbitMQ but don't like the hassle of setting up queues, topics and managing subscriptions.")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://node-ts.github.io/bus/",target:"_blank",rel:"noopener noreferrer"}},[t._v("@node-ts/bus"),a("OutboundLink")],1),t._v(" is a Node library that does all of the heavy lifting of setting up message driven services, including creation of queues and topics, subscriptions, workflows, retries, routing etc.")]),t._v(" "),a("p",[t._v("The following is the message handling code for the make a reservation command:")]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" Command "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@node-ts/bus-messages'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" Bus "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@node-ts/bus-core'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" MakeAReservation"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" RoomReserved "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@org/contracts'")]),t._v("\n\n@"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HandlesMessage")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("MakeAReservation"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MakeAReservationHandler")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("constructor")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("@"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("inject")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ROOM_SERVICE")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" roomService"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" RoomService"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    @"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("inject")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("BUS_SYMBOLS")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Bus"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" bus"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Bus")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("handle")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("command"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" MakeAReservation"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("Promise")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Pass the command to our internal service to make the reservation")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("roomService"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("reserve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("command"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Publish an event that the room has been reserved")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("bus"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("publish")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("RoomReserved")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n      command"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("roomId"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      command"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("customerId"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      command"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      command"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("to\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("When our service runs, any commands to make a reservation will find their way to this handle function. Under the hood "),a("a",{attrs:{href:"https://node-ts.github.io/bus/",target:"_blank",rel:"noopener noreferrer"}},[t._v("@node-ts/bus"),a("OutboundLink")],1),t._v(" will:")]),t._v(" "),a("ul",[a("li",[t._v("Create a topic for the "),a("code",[t._v("MakeAReservation")]),t._v(" command")]),t._v(" "),a("li",[t._v("Create a service queue for the room booking services")]),t._v(" "),a("li",[t._v("Subscribe the service queue to the command topic")]),t._v(" "),a("li",[t._v("Listen to the service queue, and dispatch any "),a("code",[t._v("MakeAReservation")]),t._v(" commands to this handler function")])]),t._v(" "),a("p",[t._v("If later you decide to move this handler to a different service, "),a("a",{attrs:{href:"https://node-ts.github.io/bus/",target:"_blank",rel:"noopener noreferrer"}},[t._v("@node-ts/bus"),a("OutboundLink")],1),t._v(" will subscribe that service's queue to the command topic and the system will continue as normal.")]),t._v(" "),a("h2",{attrs:{id:"what-does-the-workflow-code-look-like"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-does-the-workflow-code-look-like","aria-hidden":"true"}},[t._v("#")]),t._v(" What Does the Workflow Code Look Like?")]),t._v(" "),a("p",[t._v("The workflow only operates on messages like commands and events. It's not allowed to query databases or anything else, as it should only model the flow of logic through your business. In our case the code is trivial:")]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" TestWorkflowData "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./test-workflow-data'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("BUS_SYMBOLS")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Bus "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@node-ts/bus-core'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" Workflow"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" StartedBy"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Handles "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@node-ts/bus-workflow'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" RoomReserved"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" EmailHotelConfirmation "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@org/contracts'")]),t._v("\n\n@"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("injectable")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("BookingWorkflow")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Workflow")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("constructor")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("@"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("inject")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("BUS_SYMBOLS")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Bus"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" bus"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Bus")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("super")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  @Handles"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("RoomReserved"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'handleRoomReserved'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("RoomReserved"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("handleRoomReserved")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" RoomReserved"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("Promise")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("Partial"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" command "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("EmailHotelConfirmation")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n      event"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("roomId"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      event"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("customerId"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      event"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      event"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("to\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("bus"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("send")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("command"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("complete")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("This workflow starts whenever a "),a("code",[t._v("RoomReserved")]),t._v(" event is received, sends the "),a("code",[t._v("EmailHotelConfirmation")]),t._v(" command and completes immediately. "),a("a",{attrs:{href:"https://node-ts.github.io/bus/",target:"_blank",rel:"noopener noreferrer"}},[t._v("@node-ts/bus"),a("OutboundLink")],1),t._v(" will take care of creating and subscribing the underlying queue infrastructure so that the service hosting the workflow will receive all messages that the workflow susbcribes to.")]),t._v(" "),a("p",[t._v("In the real world, workflows can take minutes to months to complete depending on the business process. Data related to the current state of the workflow is retrieved and persisted on each message handling event. This allows the process to run for as long as is needed, across many services, and can resume processing like nothing happened even if the system goes offline.")]),t._v(" "),a("h2",{attrs:{id:"conclusion"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#conclusion","aria-hidden":"true"}},[t._v("#")]),t._v(" Conclusion")]),t._v(" "),a("p",[t._v("These are the fundamental building blocks of building a loosely coupled message driven microservice architecture in node. Even though these types of systems are more common in other languages, we hope that "),a("a",{attrs:{href:"https://node-ts.github.io/bus/",target:"_blank",rel:"noopener noreferrer"}},[t._v("@node-ts/bus"),a("OutboundLink")],1),t._v(" can help node developers enjoy the same level of system resiliency, reliability and flexibility and not feel like HTTP integrations are the only option.")])])},[],!1,null,null,null);e.default=n.exports}}]);