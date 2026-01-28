# mAInd - Frontend (Interface Web de Saúde Mental)

Interface interativa desenvolvida para o projeto **mAInd**. Atua como o cliente visual que conecta o usuário à Inteligência Artificial de triagem psicológica apresentada na **FETIN (Feira Tecnológica do Inatel)**.

## 🎨 Sobre o Projeto

O objetivo do frontend foi criar uma experiência de chat fluida e acolhedora, simulando uma conversa natural com um profissional de saúde. A interface é limpa, responsiva e foca na facilidade de uso.

## 🛠 Tecnologias Utilizadas

- **HTML5:** Estrutura semântica.
- **CSS3:** Estilização customizada (sem uso de frameworks como Bootstrap), focando em responsividade e animações.
- **JavaScript (Vanilla):** Lógica de manipulação do DOM e consumo de API.
- **Fetch API:** Para comunicação assíncrona com o backend Python.

## ✨ Funcionalidades Principais

- **Chat Dinâmico:** As mensagens não são estáticas; elas são criadas em tempo real no DOM (`document.createElement`) conforme a conversa flui.
- **Gestão de Sessão:** O frontend captura e armazena o `user_id` único gerado pelo backend, garantindo que a IA lembre do contexto das respostas anteriores.
- **Simulação de Digitação:** Implementação de um *delay* artificial (função `sleep`) para dar a sensação de que a IA está "pensando" antes de responder.
- **Menu Lateral:** Acesso rápido a informações sobre os diagnósticos (Ansiedade, Depressão, etc.).

## 🔌 Integração com a API

A comunicação é feita via requisições `POST`. O frontend envia as respostas do usuário e processa o retorno da IA para decidir qual elemento renderizar na tela.

### Exemplo de Consumo (mensagens.js)

O trecho abaixo demonstra como gerenciamos o ID do usuário para manter a conversa ativa:

```javascript
// Envia a resposta do usuário mantendo a sessão (userId)
function enviarResposta(resposta) {
  if (!userId) {
    console.error("Erro: Sessão não iniciada.");
    return;
  }

  fetch(urlTeste, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId, // O ID garante que a IA saiba quem está respondendo
      text_mensage: resposta,
    }),
  })
  .then((response) => response.json())
  .then((data) => {
     // Chama a função visual que cria o balão de fala da IA
     criarMensagemIa(data.response_text);
  });
}
```

## 🚀 Como Executar

Como o projeto utiliza tecnologias nativas da web, não é necessário instalar dependências (como `npm`).

1. Certifique-se de que o **Backend** (Python) esteja rodando.
2. Abra o arquivo `index.html` em qualquer navegador moderno.
   - *Dica:* Para evitar bloqueios de CORS locais, recomenda-se usar a extensão "Live Server" do VS Code.

---
**Desenvolvido por Lucas David** | Estudante de Engenharia de Software - Inatel
