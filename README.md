## Plugin de catalagos SZ.chat

Documentação de como integrar os sistemas de catalagos https://catalago.tech e https://meucatalagodigital.com nos fluxos de atendimento do SZ.chat.

Os plugins são usados para interpretar os dados não estruturados na entrada do Chat e convertidos em JSON para serem usados no fluxo e integrações com outros sistemas.

Além dos scripts de conversão, existe o script que valida a mensagem para tomada de decisão do BOT, se a mensagem é um pedido, segue o camindo do pedido, do contrário, oferece um menu de opções.

## Fluxos de exemplos

[Catalago Digital](https://github.com/efjgrub/sz-plugins-catalago/blob/main/flow-pedido-catalagodigital.zip)

[Catalago Tech](https://github.com/efjgrub/sz-plugins-catalago/blob/main/flow-pedido-catalago-tech.zip)

## Scripts de exemplos

### Catalago digital
```
() => {
    
    let pedido = new Object();

    let tmp = msg.split("nome é ")[1];
    let nome = tmp.split("\nGostaria de fazer")[0];
    pedido.name = nome;
  
    tmp = msg.split("\n\nPEDIDO:")[1];
    let pedido_nr = tmp.split("\n\n---")[0];
    pedido.numero  = pedido_nr;
    
    let count_itens = (msg.match(/Item:*/g)|| []).length;
    pedido.quantidade = count_itens;
   /*
    let item;
    pedido.itens = [];
    for (item = 1 ; item <= count_itens; item++){
        item_tmp = msg.split("ITEM #"+item+":*\n*Nome:* ")[1];
        item_name = item_tmp.split("\n*Valor:*")[0];
       
        item_valor = item_tmp.split("*Valor:* ")[1];
        item_valor = item_valor.split("\n")[0];
        
        itens = new Object();
        itens.item = item_name;
        itens.valor = item_valor;

        pedido.itens[item - 1] = itens;
    }
    */
    
    tmp = msg.split("\n*Pagamento:* ")[1];
    let pagamento = tmp.split("\n*")[0];
    pedido.pagamento = pagamento;
    
    tmp =  msg.split("para entrega:*\n")[1];
    let entrega = tmp.split("\n*Ponto")[0];
    pedido.entrega = entrega;

    tmp = msg.split("\n*Telefone:* ")[1];
    let telefone = tmp.split("\n\n_P")[0];
    pedido.telefone = telefone;
 
    return(pedido);
};
```

### Catalago Tech

```jsvascript
() => {
    
    let pedido = new Object();

    let tmp = msg.split("nome é ")[1];
    let nome = tmp.split(", gostaria de fazer")[0];
    pedido.name = nome;
      
    tmp = msg.split("-\nPEDIDO ")[1];
    let pedido_nr = tmp.split("\n----")[0];
    pedido.numero  = pedido_nr;
    
    let count_itens = (msg.match(/ITEM #/g)|| []).length;
    pedido.quantidade = count_itens;

    let item;
    pedido.itens = [];
    for (item = 1 ; item <= count_itens; item++){
        item_tmp = msg.split("ITEM #"+item+":*\n*Nome:* ")[1];
        item_name = item_tmp.split("\n*Valor:*")[0];
       
        item_valor = item_tmp.split("*Valor:* ")[1];
        item_valor = item_valor.split("\n")[0];
        
        itens = new Object();
        itens.item = item_name;
        itens.valor = item_valor;

        pedido.itens[item - 1] = itens;

    }
    
    tmp = msg.split("\n*Pagamento:* ")[1];
    let pagamento = tmp.split("\n*")[0];
    pedido.pagamento = pagamento;
    
    tmp =  msg.split("\*Entrega:* ")[1];
    let entrega = tmp.split("\n\n*")[0];
    pedido.entrega = entrega;
    
    tmp = msg.split("\*E-mail:* ")[1];
    let email = tmp.split("\n*")[0];
    pedido.email = email;

    tmp = msg.split("\*Telefone:* ")[1];
    let telefone = tmp.split("\n\n\n")[0];
    pedido.telefone = telefone;

    return(pedido);
};
```

