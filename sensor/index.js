var Sensor = require('./sensor.js');
var Lights = require('./lights.js');

// var sensor1 = new Sensor(17);
// var sensor2 = new Sensor(18);
// sensor1.onMotion(() => {
// 	Lights.on();
// });
// sensor2.onMotion(() => {
// 	Lights.on();
// });

var sensors = [];
sensors.push(new Sensor(17));
sensors.push(new Sensor(18));

for (var i = 0; i < sensors.length; i++)
{
	sensors[i].onMotion(() => {
		Lights.on();
	});
}

process.on('SIGINT', () => {
	// sensor1.cleanup();
	// sensor2.cleanup();
	for (var i = 0; i < sensors.length; i++)
	{
		sensors[i].cleanup();
	}
});
