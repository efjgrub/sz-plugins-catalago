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