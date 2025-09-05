const $ = (q)=>document.querySelector(q);

const form = $("#form");
const submit = $("#submit");
const nameI = $("#name");
const emailI = $("#email");
const passI = $("#pass");
const pass2I = $("#pass2");
const terms = $("#terms");
const msg = $("#msg");

const eName = $("#nameErr");
const eEmail = $("#emailErr");
const ePass = $("#passErr");
const ePass2 = $("#pass2Err");

function validName(){
  const ok = nameI.value.trim().split(" ").length>=2;
  eName.textContent = ok ? "" : "Enter first and last name.";
  return ok;
}
function validEmail(){
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailI.value.trim());
  eEmail.textContent = ok ? "" : "Invalid email.";
  return ok;
}
function validPasswords(){
  const lenOk = passI.value.length>=8;
  ePass.textContent = lenOk ? "" : "Min 8 chars.";
  const match = passI.value && passI.value===pass2I.value;
  ePass2.textContent = match ? "" : "Passwords do not match.";
  return lenOk && match;
}
function recompute(){
  const ok = validName()&&validEmail()&&validPasswords()&&terms.checked;
  submit.disabled=!ok;
  return ok;
}

nameI.addEventListener("input", recompute);
emailI.addEventListener("input", ()=>{validEmail();recompute();});
passI.addEventListener("input", ()=>{validPasswords();recompute();});
pass2I.addEventListener("input", ()=>{validPasswords();recompute();});
terms.addEventListener("change", recompute);

document.getElementById("year").textContent=new Date().getFullYear();

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  if(!recompute()){msg.textContent="Fix errors.";return;}
  const payload={
    name:nameI.value.trim(),
    email:emailI.value.trim(),
    createdAt:new Date().toISOString()
  };
  try{
    localStorage.setItem("basic_user",JSON.stringify(payload));
    msg.textContent="Account created!";
    form.reset();
  }catch(err){msg.textContent="Error. Try again."}
});
