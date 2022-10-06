import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config()
const app = express();

app.use(express.json())

const listOfServices = [
    "localhost:8080","localhost:8040",
];

app.get("/", (req, res) => {
    let services = checkServiceWorking();
    let notWorkingServices = getDifference(services, listOfServices);

    res.json({
        working: services, notWorking: notWorkingServices
    });

});

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log("Iniciando HealthStock Events ", `http://${process.env.HOST}:${process.env.PORT}`);
    let services = checkServiceWorking();

    services.forEach(host => {
        console.info(`\t- ${host} está funcionando!`);
    });

    getDifference(services, listOfServices).forEach(host => {
        console.error(`\t* ${host} não está funcionando!`);
    });
});

function checkServiceWorking(){
    let listOfServicesWorking = [];
    listOfServices.forEach((host) => {
        axios.get(host)
            .then( result => {
                listOfServicesWorking.push(host);
            }).catch( () => {});
    });

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