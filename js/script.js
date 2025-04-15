// 1️⃣ Navegação suave (Smooth Scroll)
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            const topOffset = target.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: topOffset, behavior: 'smooth' });
        }
    });
});

// 2️⃣ Animação de contagem
const animateCounters = () => {
    const counters = document.querySelectorAll('.contador');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-numero'));
        let count = 0;
        const increment = target / 60;
        const updateCount = () => {
            count += increment;
            counter.innerText = Math.floor(count);
            if (count < target) requestAnimationFrame(updateCount);
            else counter.innerText = target;
        };
        updateCount();
    });
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect();
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.numeros');
    if (section) observer.observe(section);
});

// 3️⃣ Bloquear horários indisponíveis
const ocupados = { "2024-01-02": ["09:30", "10:30"], "2024-01-03": ["13:30"] };
document.getElementById("data").addEventListener("change", function () {
    const horarioSelect = document.getElementById("horario");
    [...horarioSelect.options].forEach(option => option.disabled = false);
    if (ocupados[this.value]) {
        ocupados[this.value].forEach(horario => {
            [...horarioSelect.options].find(opt => opt.value === horario).disabled = true;
        });
    }
});











document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("carousel-servicos");

    if (!carousel) {
        console.error("Erro: Elemento #carousel-servicos não encontrado!");
        return;
    }

    const prevBtn = document.getElementById("prevBtnServicos");
    const nextBtn = document.getElementById("nextBtnServicos");

    if (!prevBtn || !nextBtn) {
        console.error("Erro: Botões do carrossel não encontrados!");
        return;
    }

    let scrollPosition = 0;
    const itemsPerSlide = 1;
    const totalItems = document.querySelectorAll("#carousel-servicos .carousel-item").length;
    const itemWidth = document.querySelector(".carousel-item").offsetWidth;

    // Clonando itens para criar o efeito infinito
    const items = [...document.querySelectorAll("#carousel-servicos .carousel-item")];
    const firstClones = items.slice(0, itemsPerSlide).map(item => item.cloneNode(true));
    const lastClones = items.slice(-itemsPerSlide).map(item => item.cloneNode(true));

    firstClones.forEach(clone => carousel.appendChild(clone));
    lastClones.reverse().forEach(clone => carousel.insertBefore(clone, items[0]));

    scrollPosition = itemWidth * itemsPerSlide;
    carousel.style.transform = `translateX(-${scrollPosition}px)`;

    function showSlide(direction) {
        carousel.style.transition = "transform 0.3s ease-in-out";

        if (direction === "next") {
            scrollPosition += itemWidth * itemsPerSlide;
        } else {
            scrollPosition -= itemWidth * itemsPerSlide;
        }

        carousel.style.transform = `translateX(-${scrollPosition}px)`;

        setTimeout(() => {
            if (scrollPosition >= itemWidth * (totalItems + itemsPerSlide)) {
                carousel.style.transition = "none";
                scrollPosition = itemWidth * itemsPerSlide;
                carousel.style.transform = `translateX(-${scrollPosition}px)`;
            } else if (scrollPosition <= 0) {
                carousel.style.transition = "none";
                scrollPosition = itemWidth * totalItems;
                carousel.style.transform = `translateX(-${scrollPosition}px)`;
            }
        }, 500);
    }

    prevBtn.addEventListener("click", () => showSlide("prev"));
    nextBtn.addEventListener("click", () => showSlide("next"));
});












// 5️⃣ Carrossel infinito de Tecnologias
const carouselTecnologias = document.querySelector(".carouseltecn-track");
const prevBtnTecnologias = document.querySelector(".carouseltecn-btn.left");
const nextBtnTecnologias = document.querySelector(".carouseltecn-btn.right");

const itemsTecnologias = [...document.querySelectorAll(".carouseltecn-item")];
const itemWidthTecnologias = itemsTecnologias[0].offsetWidth;
const totalItemsTecnologias = itemsTecnologias.length;

// Clonando os itens
const firstClonesTec = itemsTecnologias.slice(0, 3).map(item => item.cloneNode(true));
const lastClonesTec = itemsTecnologias.slice(-3).map(item => item.cloneNode(true));

firstClonesTec.forEach(clone => carouselTecnologias.appendChild(clone));
lastClonesTec.reverse().forEach(clone => carouselTecnologias.insertBefore(clone, itemsTecnologias[0]));

let scrollPositionTecnologias = itemWidthTecnologias * 3;
carouselTecnologias.scrollLeft = scrollPositionTecnologias;

const updateCarouselTecnologias = (direction) => {
    carouselTecnologias.style.transition = "transform 0.5s ease-in-out";

    if (direction === "next") {
        scrollPositionTecnologias += itemWidthTecnologias;
    } else {
        scrollPositionTecnologias -= itemWidthTecnologias;
    }

    carouselTecnologias.style.transform = `translateX(-${scrollPositionTecnologias}px)`;

    setTimeout(() => {
        if (scrollPositionTecnologias >= itemWidthTecnologias * (totalItemsTecnologias + 3)) {
            carouselTecnologias.style.transition = "none";
            scrollPositionTecnologias = itemWidthTecnologias * 3;
            carouselTecnologias.style.transform = `translateX(-${scrollPositionTecnologias}px)`;
        } else if (scrollPositionTecnologias <= 0) {
            carouselTecnologias.style.transition = "none";
            scrollPositionTecnologias = itemWidthTecnologias * totalItemsTecnologias;
            carouselTecnologias.style.transform = `translateX(-${scrollPositionTecnologias}px)`;
        }
    }, 500);
};

nextBtnTecnologias.addEventListener("click", () => updateCarouselTecnologias("next"));
prevBtnTecnologias.addEventListener("click", () => updateCarouselTecnologias("prev"));













// 6️⃣ Formulário - Exibir mensagem de sucesso e resetar
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    this.reset();
    const mensagemSucesso = document.getElementById('mensagem-sucesso');
    mensagemSucesso.style.display = 'block';

    setTimeout(() => {
        mensagemSucesso.style.display = 'none';
    }, 12000);
});

// 7️⃣ Máscara de telefone no formulário
document.getElementById("telefone").addEventListener("input", function (e) {
    let input = e.target.value.replace(/\D/g, "");
    input = input.replace(/^(\d{2})(\d)/, "($1) $2");
    input = input.replace(/(\d{5})(\d)/, "$1-$2");
    e.target.value = input;
});

// 8️⃣ Scroll automático para "Entre em Contato"
document.querySelector('.btn[href="#contato"]').addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector('#contato');
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
});





document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const successMessage = document.getElementById("mensagem-sucesso");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o recarregamento da página

        const formData = new FormData(form);

        fetch("send-email.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            if (result === "success") {
                successMessage.style.display = "block";
                successMessage.innerText = "Mensagem enviada com sucesso!";
                form.reset();
            } else {
                successMessage.style.display = "block";
                successMessage.innerText = "Erro ao enviar mensagem. Tente novamente.";
                successMessage.style.color = "red";
            }
        })
        .catch(error => console.error("Erro ao enviar:", error));
    });
});
