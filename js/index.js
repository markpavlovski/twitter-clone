class FrontEndController {
  constructor(topNav, mainContent, mainPost){
    this.mainContentScreen = mainContent
    this.mainPostScreen = mainPost
    this.topNav = topNav
    console.log(this.topNav,this.mainContentScreen, this.mainPostScreen)
    console.log(this.topNav.querySelector('button'))

    const hidePostSceenEvent = {
      action: 'keydown',
      el: document,
      cb: this.keyPressHandler.bind(this)
    }
    const clickMainScreenButton = {
      action: 'click',
      el: this.topNav.querySelector('button'),
      cb: this.showPostScreen.bind(this)
    }

    this.addListeners(hidePostSceenEvent,clickMainScreenButton)
  }

  keyPressHandler(event){
    if (event.key == "Escape") this.hidePostScreen()
    if (event.key == "z") this.showPostScreen()
  }

  showPostScreen(){
    console.log('asd');
    if (this.mainPostScreen.classList.contains('d-hide')){
      this.toggleClass(this.mainPostScreen, 'd-back')
      this.toggleClass(document.body, 'd-overflow')
      setTimeout(() => this.toggleClass(this.mainPostScreen, 'd-hide'), 100)
    }
  }

  hidePostScreen(){
    if (document.body.classList.contains('d-overflow')){
      this.toggleClass(this.mainPostScreen,'d-hide')
      this.toggleClass(document.body,'d-overflow')
      setTimeout(()=>this.toggleClass(this.mainPostScreen,'d-back'),100)
    }
  }

  toggleClass(element, ...args){
    args.map(style => element.classList.toggle(style))
  }

  addListeners(...args){
    if (args) args.map(listener=>{
      console.log(listener);
      listener["el"].addEventListener(listener.action, listener.cb)
    })
  }








}

const topNav = document.querySelector('.top-nav')
const mainContent = document.querySelector('main.main-content')
const mainPostInterface = document.querySelector('main.post-interface')
const controller = new FrontEndController(topNav,mainContent,mainPostInterface)
