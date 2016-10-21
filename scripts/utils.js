window.seAgonei = window.seAgonei || {}

seAgonei.MaterialUtils =
  class {

    static refreshSwitchState (element) {
      if (element instanceof jQuery) {
        element = element[0]
      }
      if (element.MaterialSwitch) {
        element.MaterialSwitch.checkDisabled()
        element.MaterialSwitch.checkToggleStarte()
      }
    }

    static closeDrawer () {
      const drawerObfuscator = $('.mdl-layout__obfuscator')
      if (drawerObfuscator.hasClass('is-visible')) {
        drawerObfuscator.click()
      }
    }

    static clearTextField (element) {
      element.value = ''
      element.parentElement.MaterialTextfield.boundUpdateClassesHandler()
    }

    static upgradeTextFields (element) {
      componentHandler.upgradeElements($('.mdl-textfield', element).get())
    }

}
