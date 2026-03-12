const API_URL = 'https://api.sedo.bj'; // à adapter selon l'environnement

function showApplyForm() {
  document.getElementById('apply-form').style.display = 'flex';
  document.getElementById('apply-no-account').style.display = 'none';
  document.getElementById('apply-success').style.display = 'none';
  document.getElementById('apply-error').style.display = 'none';
}

// Compteur de caractères sur le textarea
document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('apply-motivation');
  const counter = document.getElementById('apply-char-count');
  if (textarea && counter) {
    textarea.addEventListener('input', () => {
      const len = textarea.value.trim().length;
      counter.textContent = `${len} / 30 min.`;
      counter.style.color = len >= 30 ? '#00D860' : '#666';
    });
  }
});

async function submitApplication(e) {
  e.preventDefault();

  const email = document.getElementById('apply-email').value.trim();
  const motivation = document.getElementById('apply-motivation').value.trim();
  const btnText = document.getElementById('apply-btn-text');
  const btnLoader = document.getElementById('apply-btn-loader');
  const errorBox = document.getElementById('apply-error');
  const submitBtn = document.getElementById('apply-submit');

  // UI loading
  btnText.style.display = 'none';
  btnLoader.style.display = 'inline';
  submitBtn.disabled = true;
  errorBox.style.display = 'none';

  try {
    const res = await fetch(`${API_URL}/courier-applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, motivation }),
    });

    const data = await res.json();

    if (res.status === 404 && data.code === 'NO_ACCOUNT') {
      document.getElementById('apply-form').style.display = 'none';
      document.getElementById('apply-no-account').style.display = 'flex';
      return;
    }

    if (!res.ok) {
      errorBox.textContent = data.message || 'Une erreur est survenue.';
      errorBox.style.display = 'block';
      return;
    }

    // Succès
    document.getElementById('apply-form').style.display = 'none';
    document.getElementById('apply-success').style.display = 'flex';

  } catch (err) {
    errorBox.textContent = 'Impossible de contacter le serveur. Vérifiez votre connexion.';
    errorBox.style.display = 'block';
  } finally {
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
    submitBtn.disabled = false;
  }
}
