const Gpio = require('onoff').Gpio;

// const pin = 17;

class Sensor
{
	constructor(pin)
	{
		this.pin = pin || 17;

		// console.log('Setting up GPIO...');
		this.sensor = new Gpio(this.pin, 'in', 'both');

		this.watching = true;
		this.values = [];
		this.sample_size = 10;
		this.sample_duration = 500;

		console.log('Monitoring on pin '+this.pin+'!')
		this.init();
	}

	init()
	{
		if (this.loop)
			{ clearInterval(this.loop); }
		this.loop = setInterval(() => {
			if (typeof this.motionCallback !== 'function')
				{ return; }

			var value = this.sensor.readSync();
			this.values.push(value);
			if (this.values.length > this.sample_size)
				{ this.values.shift(); }

			var average = 0;
			if (this.values.length >= this.sample_size)
			{
				var sum = 0;
				for (var i = 0; i < this.values.length; i++)
				{
					sum += this.values[i];
				}
				average = sum / this.values.length;
				console.log('average: ', average);

				this.values = [];
			}

			if (average > 0.6)
			{
				if (!this.watching)
					{ return; }
				this.motionCallback();
				this.watching = false;
			}
			else if (!this.timer_set && !this.watching)
			{
				this.timer_set = true;
				setTimeout(() => {
					this.watching = true;
					this.timer_set = false;
				}, 5000);
			}
		}, this.sample_duration / this.sample_size);
	}

	cleanup()
	{
		if (!this.sensor)
			{ return; }

		clearInterval(this.loop);
		this.sensor.unexport();
	}

	onMotion(callback)
	{
		this.motionCallback = callback;
	}
}

// module.exports = new Sensor();
module.exports = Sensor;
