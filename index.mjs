import express from "express"
import bodyParser from "body-parser"
import 'dotenv/config'
import { Configuration, OpenAIApi } from "openai"
const app = express()
const port = 3000



const configuration = new Configuration({
  apiKey:process.env.YOU_WONT_USE_MY_KEY_ILAN,
});
const openai = new OpenAIApi(configuration);

app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views','./view')

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('center',{textCompletion})
})
let textCompletion = '';

app.post("/add", async (req, res) => {
  const peso = req.body.input1;
  const idade = req.body.input2;
  const prompt = `

(rotina de alimentação para fins de estudo) para perda peso com base sua idade que é essa ${idade} e  o peso que é esse  ${peso}. faça dessa forma a resposta  faça uma separação de cada um dos momentos de se alimentar
café da manhã: informe aqui
almoço: informe aqui
café da tarde: informe aqui
almoço: informe aqui
faça uma recomedação saldavel e um alerta com base a idade e o peso

		`

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens: 1000,
    temperature: 0,
    messages: [{role: "user", content: prompt}],
  });
	 textCompletion = completion.data.choices[0].message.content;
  res.render('center',{textCompletion})
  
  
});



app.listen(port, () => {
  console.log(`Example app listening on port ${process.env.ola}`)
})
