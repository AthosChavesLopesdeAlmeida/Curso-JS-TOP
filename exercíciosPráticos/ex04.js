class Produto {
  constructor (nome, preço, qtd) {
    this.nome = nome;
    this.preço = preço;
    this.qtd = qtd;
  }

  apresentar(){
    return `Produto: ${this.nome}, Preço: R$${this.preço.toFixed(2)}, Quantidade: ${this.qtd}`
  }
}

class Carro extends Produto {
  constructor (nome, preço, qtd, modelo) {
    super(nome, preço, qtd)
    this.modelo = modelo;
  }

  apresentar() {
    return `${super.apresentar()}, Modelo: ${this.modelo}`; 
  }
}


const carro1 = new Carro('Porsche', 600000, 2, '911')
console.log(carro1.apresentar()); 


