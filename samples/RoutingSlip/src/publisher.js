
var el = document.getElementById('results');

var sendMessages = function () {

    var route = [
        "rmessagebus.stomp.routingslip.consumer1",
        "rmessagebus.stomp.routingslip.consumer2",
        "rmessagebus.stomp.routingslip.publisher"
    ];

    el.value = el.value + "Sending using routing slip pattern" + "\n\n";    

    bus.route({
        message: {
            data: "Routing Slip"
        },
        route: route,
        routingKey: "Message1"
    });    
};

var message1Handler = function(message, context) {
    el.value = el.value + "Recieved Message 1: " + JSON.stringify(message) + "\n\n";
};

var bus = Bus.initialize(function (config) {
    config.queue = "rmessagebus.stomp.routingslip.publisher";
    config.url = "http://localhost:15674/stomp"; // Enable stomp adapter using rabbitmq-plugins enable rabbitmq_stomp
    config.onConnect = sendMessages;
    config.handlers = {
        "Message1": [message1Handler]
    };
});
