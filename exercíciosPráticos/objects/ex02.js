//Object constructors

function Carro(marca, modelo) {
  this.marca = marca
  this.modelo = modelo
  this.ambos = function(){
    console.log(`${this.marca} ${this.modelo}`)
  }
}

const carro1 = new Carro('Porsche', '911')

console.log(carro1.marca)
console.log(carro1.modelo)
carro1.ambos()