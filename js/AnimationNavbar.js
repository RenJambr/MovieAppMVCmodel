import View from "./View.js";

class AnimationNavbar extends View {
  _parentElement = document.querySelector(".nav-yellow");

  _openNavbarAnimation(button) {
    button.style.display = "none";
    this._parentElement.style.animation = "openNav 0.5s";
    this._parentElement.style.transform = "translateX(0%)";
    this._parentElement.querySelector(".nav-darkBlue").style.animation =
      "openNav 0.7s";
    this._parentElement.querySelector(".nav-darkBlue").style.transform =
      "translateX(0%)";
    this._parentElement.querySelector(".nav-lighterBlue").style.animation =
      "openNav 0.9s";
    this._parentElement.querySelector(".nav-lighterBlue").style.transform =
      "translateX(0%)";
  }

  _closeNavbarAnimation(button) {
    this._parentElement.querySelector(".nav-lighterBlue").style.animation =
      "closeNav 0.5s";
    this._parentElement.querySelector(".nav-lighterBlue").style.transform =
      "translateX(-100%)";
    this._parentElement.querySelector(".nav-darkBlue").style.animation =
      "closeNav 0.7s";
    this._parentElement.querySelector(".nav-darkBlue").style.transform =
      "translateX(-100%)";
    this._parentElement.style.animation = "closeNav 0.9s";
    this._parentElement.style.transform = "translateX(-100%)";
    button.style.display = "block";
  }
}

export default new AnimationNavbar();
