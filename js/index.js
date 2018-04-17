class FrontEndController {
  constructor(mainContent, mainPost){
    this.mainContentScreen = mainContent
    this.mainPostScreen = mainPost
    console.log(this.mainContentScreen, this.mainPostScreen)

    const escKey = {
      action: 'keydown',
      el: document,
      cb: this.keyPressHandler.bind(this)
    }

    this.addListeners(escKey)
  }

  keyPressHandler(event){
    if (event.key == "Escape") this.hidePostScreen()
    if (event.key == "z") this.showPostScreen()
  }

  showPostScreen(){
    if (this.mainPostScreen.classList.contains('d-hide')){
      this.toggleClass(this.mainPostScreen, 'd-back')
      this.toggleClass(document.body, 'd-overflow')
      setTimeout(() => this.toggleClass(this.mainPostScreen, 'd-hide'), 200)
    }
  }

  hidePostScreen(){
    if (document.body.classList.contains('d-overflow')){
      this.toggleClass(this.mainPostScreen,'d-hide')
      this.toggleClass(document.body,'d-overflow')
      setTimeout(()=>this.toggleClass(this.mainPostScreen,'d-none'),200)
    }
  }

  toggleClass(element, ...args){
    args.map(style => element.classList.toggle(style))
  }

  addListeners(...args){
    if (args) args.map(listener=>{
      listener["el"].addEventListener(listener.action, listener.cb)
    })
  }








}

const mainContent = document.querySelector('main.main-content')
const mainPostInterface = document.querySelector('main.post-interface')
const controller = new FrontEndController(mainContent,mainPostInterface)
