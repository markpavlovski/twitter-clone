class FrontEndController {
  constructor(mainContent, mainPost){
    this.mainContentScreen = mainContent
    this.mainPostScreen = mainPost
    console.log(this.mainContentScreen, this.mainPostScreen);

    const escKey = {
      action: 'keydown',
      el: document,
      cb: this.keyPressHandler
    }

    this.addListeners(escKey)
  }

  keyPressHandler(event){
    if (event.key == "Escape") console.log('nice!');
  }

  showPostScreen(){
    this.toggleClass(this.mainPostScreen,'d-back')
    this.toggleClass(document.body,'d-overflow')
    setTimeout(()=>this.toggleClass(this.mainPostScreen,'d-hide'),200)
  }

  hidePostScreen(){
    this.toggleClass(this.mainPostScreen,'d-hide')
    this.toggleClass(document.body,'d-overflow')
    setTimeout(()=>this.toggleClass(this.mainPostScreen,'d-none'),200)
  }

  toggleClass(element, ...args){
    args.map(style => element.classList.toggle(style))
  }

  addListeners(...args){
    console.log(args[0]);
    if (args) args.map(listener=>{
      console.log(listener["el"])
      console.log(listener.action)
      console.log(listener.cb);
      listener["el"].addEventListener(listener.action, listener.cb)
    })
  }








}

const mainContent = document.querySelector('main.main-content')
const mainPostInterface = document.querySelector('main.post-interface')
const controller = new FrontEndController(mainContent,mainPostInterface)
