// --- ANIMAÇÃO DE SCROLL (REVEAL) ---
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Ativa uma vez no carregamento para elementos já visíveis
    revealOnScroll();
});

// --- LÓGICA DO MENU MOBILE ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    // Adiciona uma pequena animação de fade se quiser via CSS, ou apenas toggle
});

// Fecha o menu ao clicar em um link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// --- LÓGICA DO MODAL ---
const modal = document.getElementById('contact-modal');
const modalContent = document.getElementById('modal-content');
const openBtn = document.getElementById('open-contact-modal');
const closeBtn = document.getElementById('close-modal-button');
const successCloseBtn = document.getElementById('close-success-message');
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('success-message');

function openModal() {
    modal.classList.remove('hidden');
    // Pequeno delay para permitir a transição de opacidade funcionar
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }, 10);
}

function closeModal() {
    modal.classList.add('opacity-0');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
    
    // Espera a animação terminar antes de esconder
    setTimeout(() => {
        modal.classList.add('hidden');
        form.classList.remove('hidden');
        successMsg.classList.add('hidden');
        form.reset();
    }, 300);
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
successCloseBtn.addEventListener('click', closeModal);

// Fecha ao clicar fora do modal
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// --- ENVIO DE FORMULÁRIO (FORMSPREE) ---
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;
    
    // Feedback visual de carregamento
    submitBtn.innerText = 'Enviando...';
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-75');

    const formData = new FormData(form);
    
    try {
        const response = await fetch('https://formspree.io/f/mzzvloaz', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            form.classList.add('hidden');
            successMsg.classList.remove('hidden');
        } else {
            alert('Erro ao enviar. Tente novamente.');
        }
    } catch (error) {
        alert('Erro de conexão. Verifique sua internet.');
    } finally {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-75');
    }
});

// --- COPIAR PARA TRANSFERÊNCIA (Modernizado) ---
async function copyToClipboard(elementId, buttonElement, message) {
    const textToCopy = document.getElementById(elementId).innerText;
    
    try {
        await navigator.clipboard.writeText(textToCopy);
        
        // Mostra Toast
        showToast(message);

        // Feedback no botão
        const originalHtml = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fas fa-check text-green-400"></i> Copiado!';
        buttonElement.classList.add('text-green-400');
        
        setTimeout(() => {
            buttonElement.innerHTML = originalHtml;
            buttonElement.classList.remove('text-green-400');
        }, 2000);

    } catch (err) {
        console.error('Falha ao copiar: ', err);
        alert('Não foi possível copiar automaticamente.');
    }
}

function showToast(msg) {
    const toast = document.getElementById('toast-notification');
    const toastText = document.getElementById('toast-message');
    
    toastText.innerText = msg;
    toast.classList.remove('hidden');
    // Trigger reflow
    void toast.offsetWidth; 
    
    toast.classList.remove('translate-y-20', 'opacity-0');

    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 300);
    }, 3000);
}
