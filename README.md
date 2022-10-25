# Serviço de Barramento de Eventos do HealthStock

Microsserviço de Barramento de Eventos para aplicação HealthStock.

Esse serviço está sendo usado para registro de eventos e gerenciar quais serviços estão funcionado.

# Endpoints

## **POST** [_/events](#)
Para fazer uma requesição para esse endpoint é preciso ser passado no body um texto JSON com os campos:

- **host**: HOST da aplicação que enviou o evento
- **origin**: ORIGEM do evento, o nome do serviço onde aconteceu o evento!
- **message**: A MENSAGEM deve conter uma descrição do que o evento de trata.
- **level**: Qual o nivel do evento. Há quatro tipos: info, warn, error e debug.

Exemplo de requisição:
````json
{
    "host": "http://localhost:8080",
    "origin": "login",
    "message": "Usuário foi bloqueado! Muitas requisições!",
    "data": { "error":"exception cors" },
    "level" "warn"
}
````
