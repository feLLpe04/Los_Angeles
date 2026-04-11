/** Contadores +/- y envío del pedido por WhatsApp (formulario #form-pedido en index.html). */

function parsePrecioEtiqueta(texto) {
    const t = texto.trim().toUpperCase().replace(/\s/g, '');
    const km = t.match(/(\d+)\s*K\b/);
    if (km) return parseInt(km[1], 10) * 1000;
    const limpio = texto.replace(/[^0-9.]/g, '');
    const n = parseFloat(limpio);
    return isNaN(n) ? 0 : n;
}

function formatoCOP(valor) {
    return '$' + Math.round(valor).toLocaleString('es-CO');
}

function onLoadPage() {
    const botaoMais1 = document.getElementById('mais1');
    const botaoMais2 = document.getElementById('mais2');
    const botaoMais3 = document.getElementById('mais3');
    const botaoMais4 = document.getElementById('mais4');
    const botaoMais5 = document.getElementById('mais5');
    const botaoMais6 = document.getElementById('mais6');

    const botaoMenos1 = document.getElementById('menos1');
    const botaoMenos2 = document.getElementById('menos2');
    const botaoMenos3 = document.getElementById('menos3');
    const botaoMenos4 = document.getElementById('menos4');
    const botaoMenos5 = document.getElementById('menos5');
    const botaoMenos6 = document.getElementById('menos6');

    var count1 = 0;
    const amount1 = document.getElementById('amount1');
    const mais1 = function () {
        count1++;
        amount1.value = count1;
    };
    const menos1 = function () {
        count1--;
        amount1.value = count1;
    };
    botaoMais1.addEventListener('click', mais1);
    botaoMenos1.addEventListener('click', menos1);

    var count2 = 0;
    const amount2 = document.getElementById('amount2');
    const mais2 = function () {
        count2++;
        amount2.value = count2;
    };
    const menos2 = function () {
        count2--;
        amount2.value = count2;
    };
    botaoMais2.addEventListener('click', mais2);
    botaoMenos2.addEventListener('click', menos2);

    var count3 = 0;
    const amount3 = document.getElementById('amount3');
    const mais3 = function () {
        count3++;
        amount3.value = count3;
    };
    const menos3 = function () {
        count3--;
        amount3.value = count3;
    };
    botaoMais3.addEventListener('click', mais3);
    botaoMenos3.addEventListener('click', menos3);

    var count4 = 0;
    const amount4 = document.getElementById('amount4');
    const mais4 = function () {
        count4++;
        amount4.value = count4;
    };
    const menos4 = function () {
        count4--;
        amount4.value = count4;
    };
    botaoMais4.addEventListener('click', mais4);
    botaoMenos4.addEventListener('click', menos4);

    var count5 = 0;
    const amount5 = document.getElementById('amount5');
    const mais5 = function () {
        count5++;
        amount5.value = count5;
    };
    const menos5 = function () {
        count5--;
        amount5.value = count5;
    };
    botaoMais5.addEventListener('click', mais5);
    botaoMenos5.addEventListener('click', menos5);

    var count6 = 0;
    const amount6 = document.getElementById('amount6');
    const mais6 = function () {
        count6++;
        amount6.value = count6;
    };
    const menos6 = function () {
        count6--;
        amount6.value = count6;
    };
    botaoMais6.addEventListener('click', mais6);
    botaoMenos6.addEventListener('click', menos6);

    const WHATSAPP_NUMERO = '573001243815';
    const formPedido = document.getElementById('form-pedido');
    const btnFinalizar = document.getElementById('btn-finalizar-pedido');
    if (!formPedido || !btnFinalizar) return;

    formPedido.addEventListener('submit', function (e) {
        e.preventDefault();
    });

    function enviarPedidoWhatsApp() {
        const lineas = ['Hola, quiero hacer este pedido:', ''];
        let total = 0;
        let hayAlgo = false;

        const tarjetas = formPedido.querySelectorAll('.card-pedidos');
        tarjetas.forEach(function (card) {
            const titulo = card.querySelector('h2');
            const precioEl = card.querySelector('span.preço');
            const input = card.querySelector('input.amount-show');
            if (!titulo || !precioEl || !input) return;

            const nombre = titulo.textContent.trim();
            const etiquetaPrecio = precioEl.textContent.trim();
            const precio = parsePrecioEtiqueta(etiquetaPrecio);
            const cantidad = Math.max(0, parseInt(input.value, 10) || 0);

            if (cantidad > 0) {
                hayAlgo = true;
                const subtotal = cantidad * precio;
                total += subtotal;
                lineas.push(
                    '• ' +
                        nombre +
                        ': ' +
                        cantidad +
                        ' × ' +
                        etiquetaPrecio +
                        ' (' +
                        formatoCOP(precio) +
                        ' c/u) = ' +
                        formatoCOP(subtotal)
                );
            }
        });

        if (!hayAlgo) {
            alert('Elige al menos un producto (cantidad mayor a 0).');
            return;
        }

        lineas.push('');
        lineas.push('Total: ' + formatoCOP(total) + ' COP');
        lineas.push('');
        lineas.push('(Pedido desde la web)');

        const texto = lineas.join('\n');
        const url =
            'https://wa.me/' + WHATSAPP_NUMERO + '?text=' + encodeURIComponent(texto);
        const ventana = window.open(url, '_blank', 'noopener,noreferrer');
        if (!ventana) {
            window.location.href = url;
        }
    }

    btnFinalizar.addEventListener('click', enviarPedidoWhatsApp);
}
