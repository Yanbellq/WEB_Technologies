document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();
    const logo = document.getElementById('logo').innerText;
    const login = document.getElementById("login").value;
    const password = document.getElementById("pass").value;
    
    console.log(`${logo}\n\nLogin: '${login}'\nPassword: '${password}'`);  
})
        
var player = new Playerjs({ id: "player", file: "./video/13097021_1080_1920_30fps.mp4" });
