

alert("hi");
window.onload = function(){
	var start;
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	canvas.addEventListener("mousedown",function(event){

		mouseX = event.pageX;
		mouseY=event.pageY;

		mouseXParticle = mouseX/marginX;
		mouseYParticle = mouseY/marginY;

		remainderX = mouseXParticle%1;
		remainderY = mouseYParticle%1;
		//alert(remainderX + " : " + remainderY);
		 if((remainderX <= mouseDection+0.05 || remainderX >= 1-mouseDection+0.05) && (remainderY <= mouseDection+0.05 || remainderY >= 1-mouseDection+0.05)){
		 	curArray[Math.round(mouseXParticle)+(Math.round(mouseYParticle)*aX)].live = !curArray[Math.round(mouseXParticle)+(Math.round(mouseYParticle)*aX)].live;
		 	curArray[Math.round(mouseXParticle)+(Math.round(mouseYParticle)*aX)].valueLife = 1-curArray[Math.round(mouseXParticle)+(Math.round(mouseYParticle)*aX)].valueLife;
		 	//alert(curArray[mouseXParticle-remainderX+(mouseYParticle-remainderY)*aX].live)
		 	//drawLife();
			//alert(mouseXParticle);
		} 
		

	},false);	
	//Make the canvas occupy the full page
	var W = window.innerWidth, H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	
	//Painting the canvas black
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, W, H);

	var padding = 7;
	var aX = 20;
	var aY = 10;

	var marginX = (W-padding*2)/(aX-1);
	var marginY = (H-padding*2)/(aY-1);
	var mouseDection = 10/marginX;
	var curArray = Array();

	for(var y = 0;y<aY;y++){
		for(var x = 0; x<aX;x++){
			curArray.push(new lifeParticle(x,y));
		}
	} 

	requestAnimationFrame(step);
	function updateLife(){
		for(var y = 0;y<aY;y++){
			for(var x = 0; x<aX;X++){
				lifeValue = checkLife(x,y);
				if(lifeValue > 3 || lifeValue < 2){
				 	curArray[x+y*aX].live = false;
				 	curArray[x+y*aX].valueLife = 0;
				}else{
					curArray[x+y*aX].live = true;
				 	curArray[x+y*aX].valueLife = 1;

				}
		}
	}



	}

	function checkLife(x,y){
		arrayValue = x+y*aX;
		topLeft = arrayValue-(aX+1);
		topMiddle = arrayValue - aX;
		topRight = arrayValue -(aX-1);
		left = arrayValue -1;
		right = arrayValue +1;
		bottemLeft = arrayValue+(aX-1);
		bottemMiddle = arrayValue + aX;
		bottemRight = arrayValue +(aX+1);
		touchingLiveValue = curArray[topLeft].valueLife
						  + curArray[topMiddle].valueLife
						  + curArray[topRight].valueLife
						  + curArray[left].valueLife
						  + curArray[right].valueLife
						  + curArray[bottemLeft].valueLife
						  + curArray[bottemMiddle].valueLife
						  + curArray[bottemRight].valueLife;
		return touchingLiveValue;
	}
	function drawLife(){
		for(var i = 0; i < curArray.length;i++){
			var p = curArray[i];
			ctx.beginPath();
			if(!p.live){
				ctx.fillStyle = "white";
			}else{
				ctx.fillStyle = "Green"
			}
			ctx.arc(p.x*marginX + padding, p.y*marginY + padding, 5, Math.PI*2, false);
			ctx.fill();
		}

	}
	function lifeParticle (x,y){
		this.x = x;
		this.y = y;
		this.live = false;
		this.valueLife = 0;
}
function step(timestamp){
	if (start === null){
		stat = timestamp;
	}
	updateLife();
	drawLife();
	requestAnimationFrame(step);
}


}

