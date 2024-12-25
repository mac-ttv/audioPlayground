function main(){
	const canvas = document.getElementById('myCanvas');
	const ctx = canvas.getContext('2d');
	canvas.width = 800;
	canvas.height = 600;

	class Bar{
		constructor(x, y, width, height, color){
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.color = color;
		}
		update(micInput){
			// console.log("UPDATEEEEEEEEEEEEEEEEEEEEEEEE")
			this.height = micInput * 400;
			// this.x++;
		}
		draw(context){
			context.fillStyle = this.color;
			context.fillRect(this.x, this.y, this.width, this.height);
		}
	}
	let barWidth = canvas.width/256;
	let bars = [];
	function createBars(){
		for (let i = 0; i < 256; i++){
			let color = 'hsl(' + 2*i + ', 100%, 50%)';
			bars.push(new Bar(i* barWidth, canvas.height/2, 10, 100, color));
		}
	}
	createBars();
	console.log(bars);
	const microphone = new Microphone();
	console.log(microphone);
	function animate(){
		if (microphone.initialized){
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			const samples = microphone.getSamples();
			console.log(samples);
			bars.forEach(function(bar, i){
				bar.update(samples[i]);
				bar.draw(ctx);
			})
		}
		
		// console.log(animate);
		requestAnimationFrame(animate);
	}
	animate();
};