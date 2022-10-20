import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import axios from 'axios';
import EventModel from './EventModel.js';
import logger from './logger.js';

dotenv.config()
const app = express();
const listOfServices = [
    "http://localhost:8080","http://localhost:8090", "http://localhost:4200"
];

app.use(express.json());
app.use(cors( { origin: listOfServices}))

app.get("/", async (req, res) => {
    let services = await checkServiceWorking();
    let notWorkingServices = getDifference(services, listOfServices);

    res.json({
        working: services, notWorking: notWorkingServices
    });

});

app.post('/', (req, res) => {
    try {
        let event = new EventModel(req.body);
        logger[event.level](event.message, event);
        res.send(event);
    } catch (error) {
        logger.error(error);
        res.send(error.message);
    }
})

app.listen(process.env.PORT, process.env.HOST, async () => {
    console.log("Iniciando HealthStock Events ", `http://${process.env.HOST}:${process.env.PORT}`);
    
    let services = await checkServiceWorking();
    services.forEach( host => console.info(`\t- ${host} está funcionando!`));

    getDifference(services, listOfServices).forEach(host => {
        console.error(`\t* ${host} não está funcionando!`);
    });
});

async function checkServiceWorking(){
    let listOfServicesWorking = [];

    for(const host of listOfServices) {
        await axios.get(host)
            .then((r) => {
                listOfServicesWorking.push(host);
            })
            .catch(() => {});
    };

    return listOfServicesWorking;
}

function getDifference(array1, array2, compare = (a,b) => a === b){
    const onlyInLeft = (left, right, compareFunction) => 
        left.filter(leftValue =>
            !right.some(rightValue => 
                compareFunction(leftValue, rightValue)
            )
        );

    const onlyInA = onlyInLeft(array1, array2, compare);
    const onlyInB = onlyInLeft(array2, array1, compare);

    return [...onlyInA, ...onlyInB];
}