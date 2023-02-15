export default class UserInfo {
  constructor({ name, description }) {
    this._name = document.querySelector(name);
    this.description = document.querySelector(description);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this.description.textContent,
    };
  }

  setUserInfo({ name, description }) {
    this._name.textContent = name;
    this.description.textContent = description;
  }
}
