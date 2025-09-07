// --- LÓGICA DO MENU HAMBURGER ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
const mobileMenuLinks = mobileMenu.getElementsByTagName('a');
for (let link of mobileMenuLinks) {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
}

// --- LÓGICA DO MODAL DE CONTATO ---
const openModalBtn = document.getElementById('open-contact-modal');
const closeModalBtn = document.getElementById('close-modal-button');
const contactModal = document.getElementById('contact-modal');
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const closeSuccessBtn = document.getElementById('close-success-message');

openModalBtn.addEventListener('click', () => {
    contactModal.classList.remove('hidden');
    contactModal.classList.add('flex');
});

function closeModal() {
    contactModal.classList.add('hidden');
    contactModal.classList.remove('flex');
    contactForm.classList.remove('hidden');
    successMessage.classList.add('hidden');
    contactForm.reset();
}

closeModalBtn.addEventListener('click', closeModal);
closeSuccessBtn.addEventListener('click', closeModal);

contactModal.addEventListener('click', (event) => {
    if (event.target === contactModal) {
        closeModal();
    }
});

// --- LÓGICA DE ENVIO DO FORMULÁRIO COM FORMSPREE ---
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const formspreeEndpoint = 'https://formspree.io/f/mzzvloaz'; // SUBSTITUA PELA SUA URL

    fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            contactForm.classList.add('hidden');
            successMessage.classList.remove('hidden');
        } else {
            alert('Ocorreu um erro ao enviar a mensagem. Tente novamente.');
        }
    }).catch(error => {
        alert('Ocorreu um erro de conexão. Verifique sua internet e tente novamente.');
    });
});

// --- LÓGICA PARA COPIAR TEXTO E MOSTRAR TOAST ---
function copyToClipboard(elementId, buttonElement, message) {
    const textToCopy = document.getElementById(elementId).innerText;
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "fixed";
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.opacity = 0;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            // Mostra a notificação toast
            const toast = document.getElementById('toast-notification');
            const toastMessage = document.getElementById('toast-message');
            toastMessage.innerText = message;
            toast.classList.remove('hidden');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3000); // Esconde a notificação após 3 segundos

            // Muda o ícone do botão para um check
            const originalIcon = buttonElement.innerHTML;
            buttonElement.innerHTML = '<i class="fas fa-check text-green-500"></i>';
            setTimeout(() => {
                buttonElement.innerHTML = originalIcon;
            }, 2000);
        }
    } catch (err) {
        console.error('Erro ao copiar texto: ', err);
    }
    document.body.removeChild(textArea);
}
