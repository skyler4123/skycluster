import { isDefined, randomID } from "controllers/application_helpers"
import { Controller } from "@hotwired/stimulus"

export default class ApplicationController extends Controller {
  static targets = []
  static values = {
    isInitialized: { type: Boolean },
  }
  static get identifier() {
    let identifier
    identifier = this.name
    identifier = identifier.replace('Controller', '')
    identifier = identifier.replaceAll('_', 'NAMESPACE')
    identifier = identifier
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
    identifier = identifier.replaceAll('namespace', '')
    // identifier = "data-controller=" + identifier
    return identifier
  }

  initialize() {
    if (isDefined(this.initBinding)) { this.initBinding()}
    this.initializeID()
    if (isDefined(this.initializeOutlets)) { this.initializeOutlets() }
    if (isDefined(this.initializeLayout)) { this.initializeLayout() }
    if (isDefined(this.init)) { this.init() }
    this.isInitializedValue = true
    if (isDefined(this.initAfterComplete)) { this.initAfterComplete() }
    this.initializeCompletedEvent()
  }
  
  reset() {
    this.element.innerHTML = ''
  }

  initializeID() {
    if (this.element.id) { return } 
    this.element.id = randomID()
  }

  initializeHead() {
    if (isDefined(this.headValue) && this.headValue.length > 0) {
      document.head.insertAdjacentHTML('beforeend', this.headValue)
    }
  }

  initializeDir() {
    if (this.element.hasAttribute('dir')) { return }
    if (this.hasDirParams) {
      this.element.setAttribute('dir', this.dirParams)
    }
  }

  initializeCompletedEvent() {
    this.element.dispatchEvent(new CustomEvent("controller:initialized", { detail: { controller: this } }))
  }

}
