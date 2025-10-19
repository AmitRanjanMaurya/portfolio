// Simple client-side validation and UX feedback
(function(){
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('form-status');

  const validators = {
    fullName: (v) => v.trim().length >= 2 || 'Please enter your full name.',
    email: (v) => /.+@.+\..+/.test(v) || 'Enter a valid email address.',
    subject: (v) => v.trim().length >= 3 || 'Subject must be at least 3 characters.',
    service: (v) => v && v.trim().length > 0 || 'Please select a service.',
    message: (v) => v.trim().length >= 10 || 'Message must be at least 10 characters.'
  };

  const showError = (input, msg) => {
    const container = input.closest('.field');
    const err = container ? container.querySelector('.error') : null;
    if (err) err.textContent = typeof msg === 'string' ? msg : '';
  };

  form.addEventListener('input', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement)) return;
    const name = t.name;
    const v = validators[name];
    if (v) showError(t, v(t.value) === true ? '' : v(t.value));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    let valid = true;
    const data = new FormData(form);
    for (const [name, value] of data.entries()){
      const input = form.querySelector(`[name="${name}"]`);
      const validator = validators[name];
      if (input && validator){
        const res = validator(String(value));
        if (res !== true){ valid = false; showError(input, res); }
      }
    }
    if (!valid){
      status.textContent = 'Please fix the highlighted fields.';
      return;
    }

    // Simulate success (no backend). Replace with real endpoint later.
    await new Promise(r => setTimeout(r, 600));
    form.reset();
    status.textContent = 'Thanks! Your message has been sent.';
  });
})();


