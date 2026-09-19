const questions = [
  {q:"Welches Gas entsteht unter anderem bei der Verbrennung fossiler Brennstoffe?", a:["Sauerstoff (O₂)","Kohlendioxid (CO₂)","Helium (He)","Wasserstoff (H₂)"], c:1},
  {q:"Was hilft am meisten dabei, Abfall zu vermeiden?", a:["Alles in den Restmüll werfen","Mehr Einwegprodukte kaufen","Mehrwegprodukte verwenden","Produkte sofort wegwerfen"], c:2},
  {q:"Welche Verkehrsmittel verursachen auf kurzen Wegen in der Regel keine direkten CO₂-Emissionen?", a:["Fahrrad und zu Fuß","Auto mit Verbrennungsmotor","Flugzeug","Motorrad"], c:0},
  {q:"Was bedeutet Biodiversität?", a:["Die Geschwindigkeit des Windes","Die Vielfalt des Lebens","Die Menge an Plastik","Die Temperatur eines Meeres"], c:1},
  {q:"Was ist eine sinnvolle Strategie im Umgang mit alten Gegenständen?", a:["Sofort wegwerfen","Reparieren, teilen oder weitergeben","Immer neu kaufen","Alles verbrennen"], c:1}
];

let current = 0, score = 0, answered = false;
const qEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextEl = document.getElementById("next");
const progressEl = document.getElementById("progress");
const numberEl = document.getElementById("question-number");
const resultEl = document.getElementById("result");

function showQuestion(){
  answered = false;
  nextEl.disabled = true;
  const item = questions[current];
  numberEl.textContent = `FRAGE ${current+1} VON ${questions.length}`;
  qEl.textContent = item.q;
  answersEl.innerHTML = "";
  progressEl.style.width = `${(current/questions.length)*100}%`;
  item.a.forEach((answer, i) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = answer;
    button.addEventListener("click", () => choose(button, i));
    answersEl.appendChild(button);
  });
}
function choose(button, index){
  if(answered) return;
  answered = true;
  const correct = questions[current].c;
  [...answersEl.children].forEach((b,i) => {
    b.disabled = true;
    if(i === correct) b.classList.add("correct");
  });
  if(index === correct) score++;
  else button.classList.add("wrong");
  nextEl.disabled = false;
  nextEl.textContent = current === questions.length-1 ? "Ergebnis anzeigen →" : "Nächste Frage →";
}
nextEl.addEventListener("click", () => {
  if(!answered) return;
  if(current < questions.length-1){ current++; showQuestion(); }
  else {
    progressEl.style.width = "100%";
    qEl.textContent = `Du hast ${score} von ${questions.length} Fragen richtig beantwortet.`;
    answersEl.innerHTML = "";
    nextEl.style.display = "none";
    resultEl.hidden = false;
    resultEl.textContent = score === questions.length ? "🌍 Perfekt! Du bist ein echter Umweltprofi." :
      score >= 3 ? "🌱 Gut gemacht! Du kennst dich schon ziemlich gut aus." :
      "💡 Guter Anfang! Nutze die Website, um noch mehr zu erfahren.";
  }
});
showQuestion();

const menu = document.querySelector(".menu-toggle");
const header = document.querySelector(".site-header");
menu.addEventListener("click", () => header.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => header.classList.remove("open")));
