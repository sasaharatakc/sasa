const form = document.getElementById("leadForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const company = document.getElementById("company").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!company || !email) {
    message.textContent = "会社名とメールアドレスを入力してください。";
    return;
  }

  message.textContent = `送信完了: ${company} 様（${email}）へご案内をお送りします。`;
  form.reset();
});
