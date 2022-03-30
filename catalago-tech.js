let msg = `Olá, meu nome é Edison Figueira Junior, gostaria de fazer o pedido abaixo: ------------ PEDIDO #496 ------------ *ITEM #1:* *Nome:* Voice *Valor:* R$5.500,00 *ITEM #2:* *Nome:* SZ.chat *Valor:* R$3.800,00 *RESUMO:* *Valor total:* R$ 9.300,00 *Pagamento:* Dinheiro *Entrega:* Retirar no local *E-mail:* efjgrub@gmail.com *Telefone:* (11) 99308-6451 _Pedido realizado em 28/03/2022 às 13:55_`


/* Identifica se a mensagem tem a ver com um pedido */
function identifica_pedido(){
    let mensagemPedido = "gostaria de fazer o pedido abaixo";
    if (msg.indexOf(mensagemPedido) > -1 ){
        return(1);
    }else{
        return(-1);
    }
}

/* Organiza o conteudo do pedido */

function parse_pedido(msg){
    let pedido = new Object();

    // nome
    let tmp = msg.split("nome é ")[1];
    let nome = tmp.split(", gostaria de fazer")[0];
    //console.log(nome);
    pedido.name = nome;

    // numero do pedido
    tmp = msg.split("- PEDIDO ")[1];
    let pedido_nr = tmp.split(" ----")[0];
    //console.log(pedido_nr)
    pedido.numero  = pedido_nr;

    // Conta itens
    let count_itens = (msg.match(/ITEM #/g)|| []).length;
    pedido.quantidade = count_itens;
    //console.log(count_itens);

    // pega os itens e valores
    let item;
    pedido.itens = [];
    for (item = 1 ; item <= count_itens; item++){
        item_tmp = msg.split("ITEM #"+item+":* *Nome:* ")[1];
        item_name = item_tmp.split(" *Valor")[0];

        item_valor = item_tmp.split("*Valor:* ")[1];
        item_valor = item_valor.split(" ")[0];
        
        itens = new Object();
        itens.item = item_name;
        itens.valor = item_valor;

        pedido.itens[item - 1] = itens;
        //console.log("Item: "+ item_name + " Valor: " + item_valor);
    }

    // pega forma de pagamento
    tmp = msg.split(" *Pagamento:* ")[1];
    let pagamento = tmp.split(" *")[0];
    pedido.pagamento = pagamento;
    //console.log(pagamento);

    // pega entrega 
    tmp =  msg.split(" *Entrega:* ")[1];
    let entrega = tmp.split(" *")[0];
    pedido.entrega = entrega;
    //console.log(entrega);

    // pega e-mail
    tmp = msg.split(" *E-mail:* ")[1];
    let email = tmp.split(" *")[0];
    pedido.email = email;
    //console.log(email);

    // pega telefone
    tmp = msg.split(" *Telefone:* ")[1];
    let telefone = tmp.split(" _Pedido")[0];
    pedido.telefone = telefone;
    //console.log(telefone);


    return(pedido);
   
}

parse_pedido(msg)