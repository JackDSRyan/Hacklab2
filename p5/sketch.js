    var talk = new p5.Speech;
    var listen = new p5.SpeechRec;

    var a;
    var b;
    var q;

    var bot;

    function setup(){
        createCanvas(100,100);
        background(0);

        //use to select to grab the data from the specific id element on the html page

        b = select('#submit')
        q = select('#user')
        a = select('#response')

        b.mousePressed(chatBot); //whatever the button pressed call chatbot

        // brain stuff

        bot = new RiveScript();
        bot.loadFile("./brain.rive",botReady,botError); //2 functions

        // speech stuff
        talk.speak("hello you are talking to rivescript"); //

        listen.continuous = true; //constant listen
        listen.onResult = showResult; //trigger the function on every listen
        listen.start(); //start listening

    }

        function botReady (){

            bot.sortReplies(); //gets the file ready with the list of potential answers

    }

        function botError(){
            console.log('rivescript not loaded!');
        }

        function chatBot(){
            var question = q.value(); //get what is written in that
            // pass it to rivescript
            var reply = bot.reply("local-user",question);
            //output the rivescript answer in the box
            a.value(reply);

            //talk the answers
            talk.speak(reply);
            creteP(reply); //also add it to the transcript 
        }




        function draw(){

            fill(255);
            ellipse(mouseX,mouseY,20,20);

        }

        function showResult(){

          q.value(listen.resultString);
          chatBot();



}


//        talk = new p5.Speech ();
//        talk.speak("hello");
//
//        listen = new p5.SpeechRec();
//        listen.onResult = showVoice();
//        listen.start();
