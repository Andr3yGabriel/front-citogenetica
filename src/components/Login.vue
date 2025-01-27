<script lang="ts">
import axios, { AxiosError } from "axios";
import { defineComponent, ref } from "vue";
import apiClient from "../axiosConfig";
import { Button, FloatLabel, InputText, Password, Toast, useToast } from "primevue";
import router from "../router/router";
import 'primeicons/primeicons.css'


export default defineComponent({
  name: "Login",
  components: {
    Toast,
    Button,
    InputText,
    FloatLabel,
    Password
  },
  
  setup() {
    const toast = useToast();
    const document = ref<string>("");
    const password = ref<string>("");
    const errorMessage = ref<string>("");

    const login = async () => {
      try {
        const response = await apiClient.post("/auth/login", {
          document: document.value,
          password: password.value,
        });

        localStorage.setItem("token", response.data.token);
      } catch (error) {
        console.error("Error at user login!", error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 409) {
            errorMessage.value = "User with this e-mail already exists!";
          } else {
            errorMessage.value = "Error at user register!";
          }
        } else {
          errorMessage.value = "Error at user register!";
        }
        toast.add({
          severity: "error",
          summary: "Error",
          detail: errorMessage.value,
        });
      }
    };

    const goToHome = () => {
        router.push("/")
    }

    return {
      document,
      password,
      login,
      goToHome,
      errorMessage,
    };
  },
});
</script>

<template>
  <div id="container-login">
    <Toast position="top-left" />
    <aside id="bloco-imagem-login">
      <Button @Click="goToHome" icon="pi pi-chevron-left" style="color: black;" label="Voltar" severity="secondary" class="bt-voltar-login" rounded />
      <div id="img-login-div">
        <img id="img-login" src="../assets/undraw_Profile_data_re_v81r.png" />
      </div>
    </aside>

    <main id="bloco-texto-login">
      <h1 id="titulo-login">Faça seu Login</h1>
      <section id="box-form-login">
          <FloatLabel variant="on">
            <InputText 
              v-tooltip="'Insira seu CPF'"
              id="document"
              v-model="document"
              type="text"
              class="login-input"
              size="large"
            />
            <label for="document">CPF</label>
          </FloatLabel>

          <FloatLabel variant="on">
            <Password 
              v-tooltip="'Insira sua senha'"
              id="password"
              v-model="password"
              type="password"
              :feedback="false"
              toggleMask
              fluid
            />
            <label for="document">Senha</label>
          </FloatLabel>

          <div class="link-login">
            <a class="a-login" href="registro.html">Cadastre-se</a>
            <a class="a-login" href="recuperarSenha.html"
              >Esqueci minha senha</a
            >
          </div>

          <Button @Click="login" label="Entrar" severity="secondary" rounded />
      </section>
    </main>
  </div>
</template>

<style lang="scss">
#container-login {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: #fff;
}

#bloco-imagem-login {
  height: 100vh;
  width: 55%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  .bt-voltar-login {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 30px;
    left: 30px;
    background-color: #e8e5e5;
    box-shadow: 0px 2px gray;
    border-radius: 22px;
    height: 35px;
    width: 100px;
  }

  #img-login-div {  
    background-color: #fff;
    width: 100%;

    #img-login {
      width: 100%;
    }
  }
}

#bloco-texto-login {
  background-color: #0062ae;
  height: 100vh;
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#titulo-login {
  font-weight: 200;
  color: #f8f5f5;
}

#box-form-login {
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;

  .link-login {
    text-align: center;
    display: flex;

    .a-login {
      display: block;
      text-decoration: none;
      margin: 5px 0;
      color: #fff;
      padding: 10px;
      font-style: normal;

      &:hover {
        color: #c8dbeb;
      }
    }
  }
}


@media (max-width: 1024px) {
  #container-login {
    flex-direction: column;
    padding: 20px;
  }

  .bt-voltar-login {
    position: relative;
    top: auto;
    left: auto;
    margin-bottom: 20px;
  }

  #bloco-texto-login {
    width: 100%;
    height: 60vh;
    padding: 20px;
  }

  form {
    width: 90%;
    max-width: 350px;
  }

  .login-input {
    width: 100%;
    max-width: 350px;
  }

  #bloco-imagem-login,
  #img-login-div {
    width: 100%;
    height: 40vh;
    margin-left: 0;
  }

  #img-login {
    width: 100%;
    max-width: 350px;
    height: auto;
    margin: 0 auto;
  }

  .link-login {
    flex-direction: column;
    margin: 10px 0;
  }

  .a-login {
    margin: 10px 0;
  }
}
</style>
