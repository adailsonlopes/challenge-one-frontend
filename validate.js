const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const respostas = {
    nome: e.target.elements["nome"].value,
    email: e.target.elements["email"].value,
    assunto: e.target.elements["assunto"].value,
    mensagem: e.target.elements["mensagem"].value,
  };
});

camposDoFormulario.forEach((campo) => {
  campo.addEventListener("blur", () => verificaCampo(campo));
  campo.addEventListener("invalid", (evento) => evento.preventDefault());
});

const tiposDeErro = ["valueMissing", "typeMismatch", "tooShort"];
const mensagens = {
  nome: {
    valueMissing: "O campo de nome não pode estar vazio.",
    tooShort: "Por favor, preencha um nome válido. [mínimo 4 caracteres]",
  },
  email: {
    valueMissing: "O campo de e-mail não pode estar vazio.",
    typeMismatch: "Por favor, preencha um email válido.",
  },
  assunto: {
    valueMissing: "O campo de assunto não pode estar vazio.",
    tooShort:
      "Por favor, preencha o campo assunto com no mínimo 10 caracteres.",
  },
  mensagem: {
    valueMissing: "O campo de mensagem não pode estar vazio.",
    tooShort: "Por favor, preencha uma mensagem válida. [mínimo 10 caracteres]",
  },
};

function verificaCampo(campo) {
  let mensagem = "";

  tiposDeErro.forEach((erro) => {
    if (campo.validity[erro]) {
      mensagem = mensagens[campo.name][erro];
    }
  });
  const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
  const validadorDeInput = campo.checkValidity();

  if (!validadorDeInput) {
    mensagemErro.textContent = mensagem;
  } else {
    mensagemErro.textContent = "";
  }
}
