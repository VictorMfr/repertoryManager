const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Repertory Manager');
})

app.post('/message', (req, res) => {

    if (req.body.message == "/repertorioGrupoA") {
        try {
            const data = fs.readFileSync('./text.txt', 'utf8');
            return res.send({
                reply: data
            })
        } catch (error) {
            console.log(error);
        }
    } if (req.body.message == '/listaRandom') {
        try {
            const file = fs.readFileSync('./songs.json', 'utf8');


            const data = JSON.parse(file);

            let alabanzas = [];
            let adoraciones = [];

            for (let i = 0; i < 3; i++) {
                alabanzas.push(data.canciones.alabanzas[Math.floor(Math.random() * data.canciones.alabanzas.length)]);
            }

            for (let i = 0; i < 3; i++) {
                adoraciones.push(data.canciones.adoraciones[Math.floor(Math.random() * data.canciones.alabanzas.length)]);
            }

            const text =
                `Lista de canciones:
            
*Alabanzas:*
1. ${alabanzas[0].name} ${alabanzas[0].author}
2. ${alabanzas[1].name} ${alabanzas[1].author}
3. ${alabanzas[2].name} ${alabanzas[2].author}
            
*Adoraciones:*
1. ${adoraciones[0].name} ${adoraciones[0].author}
2. ${adoraciones[1].name} ${adoraciones[1].author}
3. ${adoraciones[2].name} ${adoraciones[2].author}
`

            return res.send({
                reply: text
            })
        } catch (error) {
            console.log(error);
        }
    }

    res.send();
});



app.listen(port, () => console.log('Server Started'));