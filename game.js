window.onload = function() {
    var num_of_attempts = sessionStorage.getItem("0");
    var score = localStorage.getItem("0");

    var total_attempts = 3;
    var button1 = {
        x: 32,
        y: 100,
        width: 120,
        height: 120,
    }
    var button2 = {
        x: 168,
        y: 100,
        width: 120,
        height: 120,
    }
    var button3 = {
        x: 95,
        y: 235,
        width: 120,
        height: 120,
    }

    //Generating three random numbers to call the three random images from an array using those random numbers
    do {
        var canvas = document.getElementById("Canvas");
        var context = canvas.getContext("2d");
        image_generation_array = ["img1", "img2", "img3", "img4", "img5", "img6"]
        var random_num1 = Math.floor(Math.random() * 6);
        var img1;
        var image_5_flag = 0;
        var image_6_flag = 0;

        if (random_num1 == 4) {
            image_5_flag = 1;
            img1 = 1;
        } else if (random_num1 == 5) {
            image_6_flag = 1;
            img1 = 1;
        } else {
            img1 = new Image();

            var imgname1 = "img" + (random_num1 + 1) + ".jpg";
            img1.src = imgname1;
        }

        var random_num2 = Math.floor(Math.random() * 6);
        var img2;

        if (random_num2 == 4) {
            image_5_flag = 1;
            img2 = 1;
        } else if (random_num2 == 5) {
            img2 = 1;
            image_6_flag = 1;
        } else {

            img2 = new Image();

            var imgname2 = "img" + (random_num2 + 1) + ".jpg";
            img2.src = imgname2;
        }

        var random_num3 = Math.floor(Math.random() * 6);
        var img3;
        if (random_num3 == 4) {
            image_5_flag = 1;
            img3 = 1;
        } else if (random_num3 == 5) {
            image_6_flag = 1;
            img3 = 1;
        } else {

            img3 = new Image();

            var imgname3 = "img" + (random_num3 + 1) + ".jpg";
            img3.src = imgname3;
        }
        //making sure same images do not appear at the same time
    } while (img1 == img2 || img2 == img3 || img3 == img1 ||
        random_num1 == random_num2 || random_num2 == random_num3 || random_num1 == random_num3);

    img1.onload = function() {
        generate_img();
    }
    img2.onload = function() {
        generate_img();
    }
    img3.onload = function() {
        generate_img();
    }

    //generating a random image name to ask for in the question from the three chosen random images
    name_array = ["car", "airplane", "moon", "pencil", "maroon circle", "green square"];
    chosen_img_index_array = [random_num1, random_num2, random_num3];
    var name_index = (Math.floor(Math.random() * 2));
    var imgnum_picked = chosen_img_index_array[name_index];
    var name = name_array[imgnum_picked];

    var canvas = document.getElementById("Canvas");
    var context = canvas.getContext("2d");
    context.font = "25px Comic Sans MS";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText("Select the correct image", canvas.width / 2, 33);
    context.fillText("that matches the word", 155, 62);
    context.fillStyle = "blue";
    context.fillText(name, canvas.width / 2, 90);


    //Binding the click event on the canvas

    canvas.addEventListener('click', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        if (isInside(mousePos, button1)) {
            var clicked_image_btn = chosen_img_index_array[0];
            var clicked_image_name = name_array[clicked_image_btn];
            refresh();


        } else if (isInside(mousePos, button2)) {
            var clicked_image_btn = chosen_img_index_array[1];
            var clicked_image_name = name_array[clicked_image_btn];
            refresh();

        } else if (isInside(mousePos, button3)) {
            var clicked_image_btn = chosen_img_index_array[2];
            var clicked_image_name = name_array[clicked_image_btn];
            refresh();

        }
        //checking for the correct answer
        if (clicked_image_name == name) {
            var temp2 = localStorage.getItem(score);
            var current2 = 0;
            if (temp2 == null) {
                localStorage.setItem(score, "1");
            } else {
                current2 = 1;
            }
            temp2 = parseInt(localStorage.getItem(score)) + current2;
            localStorage.setItem(score, temp2.toString());

        }

    }, false);

    //calling the draw button function for all the buttons
    var interval = setInterval(function() {
        drawButton(button1);
        drawButton(button2);
        drawButton(button3);

    }, 3);
    //parseInt is used to convert strings to numbers
    var attempts = 0;
    if (sessionStorage.getItem(num_of_attempts) != null) {
        attempts = parseInt(sessionStorage.getItem(num_of_attempts));
    }

    var marks = 0;
    if (localStorage.getItem(score) != null) {
        marks = parseInt(localStorage.getItem(score));
    }


    //To generate the score with the user name after user plays the game thrice
    if (attempts >= 3) {
        context.fillStyle = "black";
        context.font = "25px Verdana";
        context.fillText(localStorage.user + " You answered", canvas.width / 2, 385);
        context.fillText(marks, canvas.width / 2, 410);
        context.fillText("questions correctly", canvas.width / 2, 430);
        sessionStorage.setItem(num_of_attempts, "1");
        //restting the local and session storage variables to default(0)
        sessionStorage.clear();
        localStorage.clear();
    }


    //function for drawing the buttons
    function drawButton(name) {
        context.lineWidth = 0;
        context.strokeRect(name.x, name.y, name.width, name.height);

    }

    //Function to generate three random images from 6(4 loaded images and 2 drawn images) and draw them in a canvas
    function generate_img() {
        var canvas = document.getElementById("Canvas");
        var context = canvas.getContext("2d");
        canvas.style.background = "lightgrey";
        if (img1 == 1) {
            if (image_5_flag == 1) {
                context.fillStyle = "maroon";
                context.beginPath();
                context.arc(91, 159, 50, 0, Math.PI * 2, true);
                context.closePath();
                context.fill();;
            } else if (image_6_flag == 1) {
                context.fillStyle = "green";
                context.fillRect(32, 100, 120, 120);
            }
        } else {
            context.drawImage(img1, 32, 100, 120, 120);
        }
        if (img2 == 1) {
            if (image_5_flag == 1) {
                context.fillStyle = "maroon";
                context.beginPath();
                context.arc(229, 157, 50, 0, Math.PI * 2, true);
                context.closePath();
                context.fill();
            } else if (image_6_flag == 1) {
                context.fillStyle = "green";
                context.fillRect(168, 100, 120, 120);
            }
        } else {

            context.drawImage(img2, 168, 100, 120, 120);

        }
        if (img3 == 1) {
            if (image_5_flag == 1) {
                context.fillStyle = "maroon";
                context.beginPath();
                context.arc(155, 291, 50, 0, Math.PI * 2, true);
                context.closePath();
                context.fill();

            } else if (image_6_flag == 1) {
                context.fillStyle = "green";
                context.fillRect(95, 235, 120, 120);
            }
        } else {
            context.drawImage(img3, 95, 235, 120, 120);
        }

    }
    //Function to get the mouse position
    function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
    //Function to check whether a point is inside a rectangle
    function isInside(pos, rect) {
        return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
    }


    //Reloads the page to generate new three random images
    function refresh() {
        var temp = sessionStorage.getItem(num_of_attempts);
        var current = 0;
        if (temp == null) {
            sessionStorage.setItem(num_of_attempts, "1");
        } else {
            current = 1;
        }
        temp = parseInt(sessionStorage.getItem(num_of_attempts)) + current;
        sessionStorage.setItem(num_of_attempts, temp.toString());

        window.location.reload("Refresh")
    }

}