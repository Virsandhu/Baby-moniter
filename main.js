objects=[];
status="";


function preload(){
    audio = new Audio("alarm.mp3");
}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    
    objectDetector= ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";
}

function modelLoaded(){
    console.log("model loaded");
    status= true;
    
}

function draw(){
    image(video,0,0,380,380);
    
    if(status!=""){
        r= random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            
            document.getElementById("status").innerHTML="Status: Object detected";
            

            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y,objects[i].width, objects[i].height);

            if(objects[i].label == "person"){
                document.getElementById("status").innerHTML="Status: Baby found";
                audio.stop();
            }else{
                document.getElementById("status").innerHTML="Status: Baby not found";
                audio.play();
            }
            if(objects.length<0.2){
                document.getElementById("status").innerHTML="Status: Baby not found";
                audio.play();
            }

        }
    }



}


function gotResult(error,results){
if(error){
    console.error(error);
    
}
    console.log(results);
    objects=results;
}
