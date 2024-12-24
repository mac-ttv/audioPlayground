// var canvas,
//     canvasctx;

// if (window.isSecureContext){
//   const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
//   console.log(supportedConstraints);
//   let chunks = [];
//   navigator.mediaDevices.getUserMedia({audio: "true"})
//     .then((stream) => {
//       console.log("promise resolved");
//       console.log(stream);

      
//       let context = new AudioContext();
//       analyser = context.createAnalyser();
//       canvas = document.getElementById("canvas");
//       canvasctx = canvas.getContext("2d");
//       source = context.createMediaStreamSource(stream);
      

//       canvas.width = window.innerWidth * 0.8;
//       canvas.height = window.innerHeight * 0.8;

//       source.connect(analyser);
//       analyser.connect(context.destination);
//       console.log(analyser);
//       console.log(source);
//       // const mediaRecorder = new MediaRecorder(stream);
//       // const myStream = mediaRecorder.stream;
      
//       // mediaRecorder.start();
//       // console.log(myStream);
//       FrameLooper();
//   });
// }


// function FrameLooper() {
//   window.RequestAnimationFrame =
//       window.requestAnimationFrame(FrameLooper) ||
//       window.msRequestAnimationFrame(FrameLooper) ||
//       window.mozRequestAnimationFrame(FrameLooper) ||
//       window.webkitRequestAnimationFrame(FrameLooper);

//   fbc_array = new Uint8Array(analyser.frequencyBinCount);
//   bar_count = window.innerWidth / 2;

//   analyser.getByteFrequencyData(fbc_array);

//   canvasctx.clearRect(0, 0, canvas.width, canvas.height);
//   canvasctx.fillStyle = "#000000";

//   for (var i = 0; i < bar_count; i++) {
//       bar_pos = i * 4;
//       bar_width = 2;
//       bar_height = -(fbc_array[i] / 2);

//       canvasctx.fillRect(bar_pos, canvas.height, bar_width, bar_height);
//   }
// }



function startup(){
  var micDevice = [];
  var streaming = true;
  var audio = document.getElementById("audio");
  var canvas = document.getElementById("canvas");
  var audioctx = new AudioContext();
  var analyser = audioctx.createAnalyser()
  var canvasctx = canvas.getContext("2d");
  const width = 1000;
  const height = 700;
 
  

  audio.addEventListener("canplay", (event) => {
    console.log("CANPLAY");
    audio.play();
  });

  audio.addEventListener("playing", (event) => {
    console.log("PLAYING AUDIO");
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    canvasctx.clearRect(0, 0, width, height);

    function draw(){
      drawVisual = requestAnimationFrame(draw);
    
      analyser.getByteFrequencyData(dataArray);
    
      canvasctx.fillstyle = "rgb(0 0 0)";
      canvasctx.fillRect(0, 0, width, height);

      const barWidth = (width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;
      
        canvasctx.fillStyle = `rgb(${barHeight + 100} 50 50)`;
        canvasctx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);
      
        x += barWidth + 1;
      }
      draw();
    }
  });


  navigator.mediaDevices.enumerateDevices().then((device) => {
    console.log(device);

  })

  navigator.mediaDevices.getUserMedia({audio: true, deviceId: "a8a396064df2dbc91f736627698b2e246a72ff5298bb84151ef27b3e6ac2eb77"})
    .then((stream) => {
      console.log(stream);
      const source = audioctx.createMediaStreamSource(stream);
      source.connect(analyser);
      // analyser.connect(distortion);
      // distortion.connect(audioctx.destination);
      audio.srcObject = stream;
      console.log(audio);
      console.log(source);
      console.log(analyser);
      // console.log(distortion);
      // stream.captureStream;
    }).catch((error) => {
      console.log(error);
    })

  // audio.addEventListener("canplay", (event) => {
  //   audio.play();
  // })


  // navigator.mediaDevices.getUserMedia({audio: true, deviceId: "75c4d70ee021595ec8d1f740b3ec3563c4387e880832e7ff80ff98174975f3d7"})
  //     .then((stream) => {
  //       console.log("STRREAMMM ", stream);
  //       audio.srcObject = stream;
  //       audio.play();
  //       console.log("audio should be playing?");
  //       console.log(audio);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       console.log(err);
  //     });

  // navigator.mediaDevices.enumerateDevices()
  //   .then((devices) => {
  //     console.log(devices);
  //     micDevice.push(devices.find((e) => e.label == "CABLE Output (VB-Audio Virtual Cable)"))
  // }).then((e) => {
  //   console.log("THE: ", micDevice);
  //   navigator.mediaDevices.getUserMedia({audio: true, deviceId: micDevice[0].deviceId})
  //   .then((stream) => {
  //     console.log(stream);
  //   })
  // })
      
  // audio.addEventListener("canplay", (event) => {
  //   audio.play();
  // })
  
 
}


window.addEventListener("load", startup, false);