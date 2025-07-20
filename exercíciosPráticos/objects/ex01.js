const meuObjeto = {
  propriedade1: 'valor1',
  propriedade2: 77,
  funçao : function(){
    console.log("função chamada")
  }
}

meuObjeto.funçao()
console.log(meuObjeto.propriedade1)
meuObjeto["funçao"]()

//Essas são maneiras de usarmos informações que estão dentro de objetos
