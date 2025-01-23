# Guia de Configuração e Execução do Projeto Expo

Este documento fornece instruções claras sobre como instalar as dependências, rodar o projeto no Android e na web, e compilar o projeto. Também explica como lidar com informações sensíveis no arquivo app.json antes de compartilhar o projeto.

## **Pré-requisitos**

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão recomendada: LTS)
- O aplicativo **Expo Go** instalado em seu dispositivo Android ou iOS
- Um navegador atualizado para rodar na web

Tambem é necessario: 

## Configuração do `app.json`

Este projeto utiliza o **EAS Build** para compilar o aplicativo. O arquivo `app.json` é essencial para configurar os detalhes do seu aplicativo, como nome, ícone, identificador de pacote e outras informações específicas para cada plataforma.

Simplesmente crie um arquivo `app.json` na raiz do projeto, copie e cole os dados que estão em `app.example.json` nesse novo arquivo.

## **Instalação de dependências**

1. Clone o repositório para sua máquina local:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_PROJETO>

2. Instale as dependências do projeto:
   npm install

## **Rodar o projeto**

1. Inicie o servidor de desenvolvimento:
   npx expo start

2. No terminal, você verá um QR code. Abra o aplicativo Expo Go no seu dispositivo e escaneie o QR code:
   npm install
   - No Android: Use a câmera do aplicativo Expo Go.
   - No iOS: Use a câmera do próprio dispositivo.

3. O projeto será carregado no aplicativo Expo Go.

4. Para rodar na web, pressione a tecla w no terminal após iniciar o servidor. O projeto será aberto no navegador.

## **Compilar o projeto**

1. Para compilar para Android, gere o arquivo APK ou AAB para distribuição:
   - Seguir os passos no seguinte link: https://docs.expo.dev/build/setup/

2. Para compilar para Web colocar o seguinte comando:
   - npx expo export --platform web
   - O comando irá gerar uma pasta web-build com os arquivos estáticos do projeto que podem ser publicados em qualquer servidor web.
