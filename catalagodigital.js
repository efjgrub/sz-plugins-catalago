//msg=`Ol\u00e1 meu nome \u00e9 Edison Figueira Junior\nGostaria de fazer o pedido abaixo:\n\n------------ \n\nPEDIDO: 1\n\n------------ \n\n*Kit produto 4*\n*Item:* ocre\n\n*Quantidade:* 3\n*Valor:* R$ 300,00 \n\n*Kit produto 2*\n*Item:* Sem cor\n\n*Quantidade:* 1\n*Valor:* R$ 101,00 \n\n*Total de Itens:* 4\n\n*Valor total:* R$ 401,00\n*Pagamento:* Cart\u00e3o de cr\u00e9dito\n*Observa\u00e7\u00e3o:*\n\n\n*Endere\u00e7o para entrega:*\nRua Diogo \u00c1lvares, 1074, Bairro: Jardim S\u00e3o Paulo II - CEP: 06706-050\nCotia - SP\n*Ponto de refer\u00eancia:* \n\n*Telefone:* (11) 99308-6451\n\n_Pedido feito em 29\/03\/2022 \u00e0s 15:06 - fortics_`

msg=`"Ol\u00e1 meu nome \u00e9 Edison Figueira Junior\nGostaria de fazer o pedido abaixo:\n\n------------ \n\nPEDIDO: 7\n\n------------ \n\n*Kit produto 4*\n*Item:* ocre\r\n\n*Quantidade:* 1\n*Valor:* R$ 100,00 \n\n*Total de Itens:* 1\n\n*Valor total:* R$ 100,00\n*Pagamento:* Cart\u00e3o de cr\u00e9dito\n*Observa\u00e7\u00e3o:*\n\n\n*Entrega:*\nRetirar na loja\n\n*Telefone:* (11) 99308-6451\n\n_Pedido feito em 30\/03\/2022 \u00e0s 08:47 - fortics_"`
function toJson(msg){
    let pedido = new Object();

    let tmp = msg.split("nome é ")[1];
    let nome = tmp.split("\nGostaria de fazer")[0];
    pedido.name = nome;
  
    tmp = msg.split("\n\nPEDIDO:")[1];
    let pedido_nr = tmp.split("\n\n---")[0];
    pedido.numero  = pedido_nr;
    
    let count_itens = (msg.match(/Item:*/g)|| []).length;
    pedido.quantidade = count_itens;

    let item;
    pedido.itens = [];
    // sep
    let msgpos =  msg.split("PEDIDO: ")[1];
    msgpos = msgpos.split("\n\n------------ \n\n")[1];
    msgpos = msgpos.split("\n\n*Total de Itens:")[0];
 
    msgpos.split(/ \n\n/).forEach( line =>  {
        line = line.replace(/\n/,'')

        item_tmp = line.split("**")[0];
        item_name = item_tmp.split("*")[1];

        item_tmp = line.split("Valor:* ")[1];
        item_valor = item_tmp.split(" \n\n")[0];

        item_tmp = line.split("*Quantidade:* ")[1];
        item_quantidade = item_tmp.split("\n*V")[0];

        itens = new Object();
        itens.name = item_name;
        itens.valor = item_valor;
        itens.quantidade = item_quantidade;

        pedido.itens.push(itens)
    });
    
    tmp = msg.split("\n*Pagamento:* ")[1];
    let pagamento = tmp.split("\n*")[0];
    pedido.pagamento = pagamento;
    
    tmp =  msg.split("ntrega:*\n")[1];
    let entrega = tmp.split("\n\n*")[0];
    entrega = entrega.replace("*Ponto de referência:* ");
    pedido.entrega = entrega;

    tmp = msg.split("\n*Telefone:* ")[1];
    let telefone = tmp.split("\n\n_P")[0];
    pedido.telefone = telefone;
 
    return(pedido);
}

console.log(toJson(msg))