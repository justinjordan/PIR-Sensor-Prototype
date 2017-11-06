var LifxClient = require('node-lifx').Client;

class Lights
{
	constructor()
	{
		this.client = new LifxClient();
		this.lights = [];

		this.client.on('light-new', (light) => {
			this.lights.push(light);
		});

		this.client.init();
	}

	toggle()
	{
		for (var i = 0; i < this.lights.length; i++)
		{
			let l = this.lights[i];

			l.getPower((err, data) => {
				if (data)
				{
					l.off();
				}
				else
				{
					l.on();
				}
			});
		}
	}

	on()
	{
		for (var i = 0; i < this.lights.length; i++)
		{
			this.lights[i].on();
		}
	}

	off()
	{
		for (var i = 0; i < this.lights.length; i++)
		{
			this.lights[i].off();
		}
	}
}

module.exports = new Lights();
