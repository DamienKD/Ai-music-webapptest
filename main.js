song1 ="music.mp3"
song2 = "music2.mp3"
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
status = "";

function preload()
{
    song1 = loadSound("music.mp3")
    song2 = loadSound("music2.mp3")
}

function setup()
{
    canvas = createCanvas(400, 400);
    canvas.center();

    video = createCapture(VIDEO)
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    
}

function draw()
{
    image(video, 0, 0, 400, 400);

    if(scoreLeftWrist > 0.2)
    {
   
    circle(leftWristX, leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);

   }
}

function isPlaying()
{
    status = true;

    if (score < 0.2)
    {
        circle(400, 400, 30)

        song2 = false;
    }

    if (song1 == false)
    {
        song1.play()
    }
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized')
}

function gotPoses()
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

    }
}