//IMC - Data
const data = [
  {
    min: 0,
    max: 18.4,
    classificacao: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classificacao: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classificacao: "Entre 25 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classificacao: "Entre 30 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classificacao: "Entre 40 e 99",
    info: "Obesidade grave",
    obesity: "III",
  },
];

//Seleção de elementos

const imcTable = document.querySelector("#imc-table");

const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");

const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");
const altura = document.querySelector("#altura span");
const peso = document.querySelector("#peso span");
const backBtn = document.querySelector("#back-btn");

//Functions
function createTable(data) {
  data.forEach((iten) => {
    const div = document.createElement("div");
    div.classList.add("table-data");

    const classificacao = document.createElement("p");
    classificacao.innerText = iten.classificacao;

    const info = document.createElement("p");
    info.innerText = iten.info;

    const obesity = document.createElement("p");
    obesity.innerText = iten.obesity;

    div.appendChild(classificacao);
    div.appendChild(info);
    div.appendChild(obesity);

    imcTable.appendChild(div);
  });
}

function clearInputs() {
  heightInput.value = "";
  weightInput.value = "";
  imcNumber.classList = "";
  imcInfo.classList = "";
}

function validDigits(text) {
  return text.replace(/[^0-9,]/g, "");
}

function calcImc(weight, height) {
  const imc = (weight / (height * height)).toFixed(1);

  return imc;
}

function showOrHideResults() {
  calcContainer.classList.toggle("hide");
  resultContainer.classList.toggle("hide");
}

//Inicialização
createTable(data);

//Eventos
[heightInput, weightInput].forEach((el) => {
  el.addEventListener("input", (e) => {
    const updateValue = validDigits(e.target.value);

    e.target.value = updateValue;
  });
});

calcBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const weight = +weightInput.value.replace(",", ".");
  const height = +heightInput.value.replace(",", ".");
  altura.innerText = height;
  peso.innerText = weight;

  if (!weight || !height) return;

  const imc = calcImc(weight, height);

  let info;

  data.forEach((iten) => {
    if (imc >= iten.min && imc <= iten.max) {
      info = iten.info;
    }
  });

  imcNumber.innerText = imc;
  imcInfo.innerText = info;

  switch (info) {
    case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Normal":
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;
    case "Sobrepeso":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Obesidade":
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;
    case "Obesidade grave":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
  }

  showOrHideResults();
});

clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clearInputs();
});

backBtn.addEventListener("click", () => {
  showOrHideResults();
  clearInputs();
});
