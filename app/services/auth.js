import { unregister } from './interceptor';
import URL from './base';

export class AuthAPI {
  async login(info) {
    try {
      let data = await fetch(URL + '/api/user/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async registration(info) {
    try {
      let data = await fetch(URL + '/api/user/add', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async verification(code) {
    try {
      let data = await fetch(URL + '/api/user/verifybyphone/' + code, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getCode(phone) {
    try {
      let data = await fetch(URL + '/api/sms/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phone }),
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async socialLogin(info) {
    try {
      let data = await fetch(URL + '/api/user/social/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getMe() {
    try {
      let data = await fetch(URL + '/api/user/info', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async edit(info, photo) {
    try {
      let data = await fetch(URL + '/api/user/edit', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: this.createFormData(info, photo),
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  createFormData = (body, photo) => {
    const data = new FormData();
    console.log(photo);
    if (photo) {
      data.append('avatar', {
        name: photo.name,
        type: photo.type,
        uri: photo.uri,
      });
      data.append('Content-Type', photo.type);
    }

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  async userEditPassword(info) {
    try {
      let data = await fetch(URL + '/api/user/editpassword', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async userForgotPassword(info) {
    try {
      let data = await fetch(URL + '/api/user/forgotpassword', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async userResetPassword(info) {
    try {
      let data = await fetch(URL + '/api/user/resetpassword', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

}
