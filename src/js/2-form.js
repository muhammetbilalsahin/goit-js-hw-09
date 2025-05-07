// 1. HTML'deki formu seçiyoruz
const form = document.querySelector('.feedback-form');

// 2. Başlangıçta formdaki verileri saklayacak bir obje oluşturuyoruz
let formData = {
  email: '',
  message: '',
};

// 3. Sayfa yüklenince yerel depodan veri çekiyoruz (varsa)
const savedData = localStorage.getItem('feedback-form-state');
if (savedData) {
  formData = JSON.parse(savedData);
  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}

// 4. Formda her input değiştiğinde çalışacak event listener
form.addEventListener('input', event => {
  // event.target ile hangi input'a yazıldığını alıyoruz
  formData[event.target.name] = event.target.value.trim();
  // Güncel form verilerini localStorage'a kaydediyoruz
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

// 5. Form gönderilince çalışacak event listener
form.addEventListener('submit', event => {
  event.preventDefault(); // Sayfanın yenilenmesini engelliyoruz

  // Email veya message boşsa uyarı veriyoruz
  if (
    !form.elements.email.value.trim() ||
    !form.elements.message.value.trim()
  ) {
    alert('Please fill in all fields.');
    return;
  }

  // Konsola formdaki verileri yazdırıyoruz
  console.log(formData);

  // Formu sıfırlıyoruz
  form.reset();

  // localStorage'dan da veriyi siliyoruz
  localStorage.removeItem('feedback-form-state');

  // formData'yı da sıfırlıyoruz
  formData = { email: '', message: '' };
});
