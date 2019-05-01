module.exports = data => {
    return `
            <div style="background-color:darkgray; padding:32px; height:100%;">
                <div style="background-color:cornsilk; width:70%; margin-left:auto; margin-right:auto; text-align:center;">
                    <div style="padding:16px 8px; text-align:center; background-color:rgb(252, 190, 3); color:white;">
                        <h1>Witaj</h1>
                    </div>
                    <div style="padding:16px 8px; background-color:white; text-align:center;">
                    <h2> Ten list został wysłany ponieważ chcesz zresetować swoje hasło ! </h2>
                    <h3>Kliknij w poniższy link aby zmienić hasło </h3>
                    <a href="http://localhost:8080/nowe-haslo/${data.code}" target="blank" style="text-decoration:none;"> 
                        Zmień hasło
                    </a> <br />
                    <br /><br />
                    <hr />
                    Copyright  2018 Jakub Kozioł
                </div>

                </div>

               
        </div>
`
}