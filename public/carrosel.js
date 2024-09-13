document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelector('.slides');
    let scrollAmount = 0;
    const slideWidth = 260; // A largura de cada slide + margem (ajuste conforme necessário)
    const maxScroll = slides.scrollWidth - slides.clientWidth;

    function autoScroll() {
        if (scrollAmount < maxScroll) {
            scrollAmount += slideWidth;
        } else {
            scrollAmount = 0; // Reinicia o scroll quando chegar ao final
        }
        slides.scrollTo({
            left: scrollAmount,
            behavior: 'smooth' // Faz a transição suave
        });
    }

    setInterval(autoScroll, 2000); // Define o tempo de intervalo para rolar automaticamente (2000ms = 2 segundos)
});
