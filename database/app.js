
function DatabaseAula(){

	this.buttonPostar = document.getElementById("btnPostar");
	this.entradaPostar = document.getElementById("entPostar");
	this.postForm = document.getElementById("post-form")
	this.postForm.addEventListener('submit', this.savePost.bind(this));
	this.listPosts = document.getElementById("posts");

  this.buttonEntrar = document.getElementById('btnEntrar');
  this.buttonSair = document.getElementById('btnSair');

   this.buttonSair.addEventListener('click', this.entrar.bind(this));
  this.buttonEntrar.addEventListener('click', this.sair.bind(this));

	this.initFirebase();
	
}

//Passo 1: Inicialiazação do Firebase
DatabaseAula.prototype.initFirebase = function() {
  //Inicialiazação dos serviços firebase
  this.auth = firebase.auth();
  this.database = firebase.database(); //TODO(DEVELOPER): Inicializar o serviço de database firebase.database()


  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

//Passo 2: Carregar as mensagens do Firebase
DatabaseAula.prototype.loadPosts = function() {
  // Referencia aos Posts do Firebase
  this.postsRef = this.database.ref('posts'); //TODO(DEVELOPER): Criar uma nova referencia para /posts/
  
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
    }).then(function(){
      this.entradaPostar.value = ''
    })

	//TODO(DEVELOPER): implementar o push para enviar o post ao banco e depois apagar o campo de texto
  }
};

//Passo 4: Implementar um provider para login
DatabaseAula.prototype.entrar = function(){
  var provider = null; //Utilize o provider do Google para isso, new firebase.auth.GoogleAuthProvider();
  
  this.auth.signInWithPopup(provider); 
}
//Passo 5: Implementar a funcção de Sair
DatabaseAula.prototype.sair = function(){
  //Sair
}


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

DatabaseAula.prototype.onAuthStateChanged = function(user) {
  if (user) { 
    
    var profilePicUrl = user.photoURL;
    var userName = user.displayName;

    this.fotoUsuario.style.backgroundImage = 'url(' + (profilePicUrl) + ')';
    this.nomeUsuario.textContent = userName;

    this.nomeUsuario.removeAttribute('hidden');
    this.fotoUsuario.removeAttribute('hidden');
    this.buttonSair.removeAttribute('hidden');

    this.buttonEntrar.setAttribute('hidden', 'true');

    this.loadPosts();
  } else { 
    
    this.nomeUsuario.setAttribute('hidden', 'true');
    this.fotoUsuario.setAttribute('hidden', 'true');
    this.buttonSair.setAttribute('hidden', 'true');

    this.buttonEntrar.removeAttribute('hidden');
  }
};

DatabaseAula.prototype.logado = function() {
  if (this.auth.currentUser) {
    return true;
  }
  return false;
};

DatabaseAula.POST_TEMPLATE =
    '<div class="jumbotron spaces">'+
	'<h1 class="text">Hello, world!</h1>'+
	'<p><button class="btn btn-primary" type="button">  Curtidas <span class="badge">99</span> </button></p>' +
  '<div class="name"></div>'+
	'</div>';


window.onload = function() {
  window.databaseAula = new DatabaseAula();
};