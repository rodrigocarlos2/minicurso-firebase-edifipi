window.seAgonei = window.seAgonei || {};

seAgonei.Firebase = class {
	constructor(){
		this.database = firebase.database();
		this.storage = firebase.storate();
		this.auth = firebase.auth();

		this.firebaseRefs = [];
	}

	cancelAllSubscription(){
		this.firebaseRefs.forEach(ref => ref.off());
		this.ref = [];
	}

	
}