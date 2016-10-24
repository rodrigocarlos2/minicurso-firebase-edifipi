
function DatabaseAula(){

	this.buttonPostar = document.getElementById("btnPostar");
	this.entradaPostar = document.getElementById("entPostar");
	this.postForm = document.getElementById("post-form")
	this.postForm.addEventListener('submit', this.savePost.bind(this));
	this.listPosts = document.getElementById("posts");

	this.initFirebase();
	
}
//Passo 1: Inicialiazação do Firebase
DatabaseAula.prototype.initFirebase = function() {
  //Inicialiazação dos serviços firebase
  this.database = firebase.database();

  this.loadPosts(); 
};

//Passo 2: Carregar as mensagens do Firebase
DatabaseAula.prototype.loadPosts = function() {
  // Referencia aos Posts do Firebase
  this.postsRef = this.database.ref('posts'); 
  
  // Só para garantir que não tem nenhum listener anterior
  this.postsRef.off();
  
	var setPost = function(data) {
    	var val = data.val();
 		this.displayMessage(data.key, val.name, val.text, val.photoUrl, val.imageUrl);
	}.bind(this);
  
  this.postsRef.on('child_added', setPost);
  this.postsRef.on('child_changed', setPost);
};

//Passo 3: Postar
DatabaseAula.prototype.savePost = function(e) {
  e.preventDefault();

  if (this.entradaPostar.value) {
    this.postsRef.push({
		text: this.entradaPostar.value
	}).then(() => {
		//apagar a entrada de texto
		this.entradaPostar.value = ''
	})
  }
};


//Função para criar um post 
DatabaseAula.prototype.displayMessage = function(key, name, text, picUrl, imageUri) {
  var div = document.getElementById(key);
  // Se o elemento para o post não existir, cria um novo elemento
  if (!div) {
    var container = document.createElement('div');
    container.innerHTML = DatabaseAula.POST_TEMPLATE;
    div = container.firstChild;
    div.setAttribute('id', key);
    this.listPosts.insertBefore(div, this.listPosts.firstChild);
  }
  
  div.querySelector('.text').textContent = text;
  
};

DatabaseAula.POST_TEMPLATE =
    '<div class="jumbotron spaces">'+
	'<h1 class="text">Hello, world!</h1>'+
	'<p><button class="btn btn-primary" type="button">  Curtidas <span class="badge">99</span> </button></p>'+
	'</div>';


window.onload = function() {
  window.databaseAula = new DatabaseAula();
};