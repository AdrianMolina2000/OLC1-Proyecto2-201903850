import express from 'express';
import routeJPR from './routes/principal.route';
import cors from 'cors';

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb', extended: false}));

app.use('/', routeJPR);

app.get('**',(req,res)=>{
    res.send("Aqui no hay nada");
})

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});