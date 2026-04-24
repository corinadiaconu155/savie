document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("product-modal");
    const closeBtn = document.querySelector(".close-modal");
    const qty = document.querySelector(".qty-input");
    const container = document.querySelector(".modal-layout-container");


    // info despre picturi si obiecte
    const detalii = {
        //picturi
        "Îmbrățișarea": {
            cat: "Picturi",
            desc: "O lucrare profundă realizată în ulei pe pânză, explorând conexiunea umană dintr-e două persoane ce au un trecut comun tomultos.",
            dim: "70x50 cm"
        },
        "Înaintaj de gânduri": {
            cat: "Picturi",
            desc: "Lucrare narativă realizată în ulei pe pânză, explorând un grup de colegi ce dezbat mai multe opinii asupra unui subiec.",
            dim: "100x80 cm"
        },
        "Pacea": {
            cat: "Picturi",
            desc: "Compoziție naturistă confecționată în acuarelă pe pânză ce redă peisajul unui lăcaș ce se află într-o mănăstire.",
            dim: "60x60 cm"
        },
        "Magnus": {
            cat: "Picturi",
            desc: "O lucrare realizată în ulei pe pânză, ce redau portretul unui om într-o enigmă cu propria sa înfățișare și propriile sale gânduri.",
            dim: "90x70 cm"
        },
        "Jeanne": {
            cat: "Picturi",
            desc: "Studiu de portret clasic cu influențe moderne, texturi bogate și expresivitate subtilă abstractă, realizate în ulei pe pânză.",
            dim: "50x40 cm"
        },
        "Ciorapii": {
            cat: "Picturi",
            desc: "Lucrare ce redă o scenă cotidiană dintre doi parteneri, cu elemente abstracte și efemere, realizată în ulei pe pânză.",
            dim: "40x40 cm"
        },
        "Tom, nu mai vine...": {
            cat: "Picturi",
            desc: "Lucrare narativă cu tentă melancolică care explorează viața repetitivă și trecătoare a unui bătrân singur, realizată în pasteluri pe bază de ulei.",
            dim: "80x60 cm"
        },
        "Eu sunt": {
            cat: "Picturi",
            desc: "Autoportret simbolic ce explorează identitatea și interiorul psihologic atribuimdu-i un elemnt animalistic al naturii, realizat în ulei pe pânză.",
            dim: "120x90 cm"
        },

        
        //obiecte
        
        "Ana": {
            cat: "Obiecte",
            desc: "Vază din lut, pictată manual cu motive florale și detalii rustice întruchipând un chip de femeie cu elemente tradiționale.",
            dim: "30 cm înălțime"
        },
        "Amarul": {
            cat: "Obiecte",
            desc: "Obiect decorativ unic din porțelan cu textură lucioasă, ce reflectă contrastul dintre arta gândirii și fragilității.",
            dim: "25 cm"
        },
        "Rue": {
            cat: "Obiecte",
            desc: "Piesă conceptuală din porțelan (farfurie decorativă), ce este o depicție a unuei femei într-o poziții vulnerabile.",
            dim: "20 cm"
        },
        "Eliza": {
            cat: "Obiecte",
            desc: "Piesă conceptuală din porțelan (farfurie decorativă), ce este un portret al reginei Elizabeta I a Imperiului Britanic.",
            dim: "35 cm"
        },
        "Frumoasele": {
            cat: "Obiecte",
            desc: "Vază din lut pictată manual cu textură mată, ce include detalii simbolice ale legendei tradiționale 'Sânzienelor'",
            dim: "Variabil"
        },
        "Ale ei 100 de ciori": {
            cat: "Obiecte",
            desc: "Lucrare complexă simbolică realizată din lut, cu detalii gotice, ce descrie o scenă de pritenie între o bătrână și ciorile sale.",
            dim: "30x30 cm"
        }
    };

    // modal
    document.querySelectorAll(".product-card").forEach(card => {
        card.addEventListener("click", (e) => {
            e.preventDefault();

            const name = card.querySelector("h3")?.textContent.trim();
            const price = card.querySelector(".price")?.innerText;
            const img = card.querySelector("img")?.src;

            const info = detalii[name] || {
                cat: "Produs",
                desc: "Creație unică Savie.",
                dim: ""
            };

            document.getElementById("modal-name").innerText = name || "";
            document.getElementById("modal-price").innerText = price || "";
            document.getElementById("modal-img").src = img || "";
            document.getElementById("modal-category").innerText = info.cat;
            document.getElementById("modal-description").innerText = info.desc;
            document.getElementById("modal-size").innerText = info.dim;

            
            container.classList.remove("modal-picturi", "modal-obiecte");

            if (info.cat === "Picturi") {
                container.classList.add("modal-picturi");
            } else if (info.cat === "Obiecte") {
                container.classList.add("modal-obiecte");
            }

            qty.value = 1;

            modal.style.display = "flex";
            document.body.style.overflow = "hidden";
        });
    });

    closeBtn?.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    modal.addEventListener("click", (e) => {
        const input = modal.querySelector(".qty-input");
        if (!input) return;

        if (e.target.classList.contains("arrow-up")) input.stepUp();
        if (e.target.classList.contains("arrow-down") && input.value > 1) input.stepDown();
    });

});

document.addEventListener("DOMContentLoaded", () => {

    // adauga in cos (modal)
    const buyBtn = document.querySelector(".buy-btn");

    if (buyBtn) {
        buyBtn.addEventListener("click", () => {

            const name = document.getElementById("modal-name")?.innerText;
            const priceText = document.getElementById("modal-price")?.innerText;
            const qty = parseInt(document.querySelector(".qty-input")?.value || 1);
            const img = document.getElementById("modal-img")?.src;

            if (!name || !priceText) return;

            const price = parseInt(priceText.replace(/\D/g, ""));

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existing = cart.find(item => item.name === name);

            if (existing) {
                existing.qty += qty;
            } else {
                cart.push({ name, price, qty, img });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            window.location.href = "cos.html";
        });
    }

    // afisarea cosului
   const cartContainer = document.getElementById("cart-container");
const totalEl = document.getElementById("total-box");

if (!cartContainer) return;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// formatul pretului (cu spatiu pentru mii)
const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

function renderCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.qty;
        total += itemTotal;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <div class="cart-left">
                <img src="${item.img || 'imagini/placeholder.jpg'}" class="cart-img">

                <div class="cart-title">
                    <div class="name">${item.name}</div>
                    <div class="sub">${item.qty} × ${formatPrice(item.price)} lei</div>
                </div>
            </div>

            <div class="cart-right">
                ${formatPrice(itemTotal)} lei
            </div>

            <button class="cart-delete" data-index="${index}">×</button>
        `;

        cartContainer.appendChild(div);
    });

    totalEl.innerText = "Total: " + formatPrice(total) + " lei";
}

renderCart();

// stergerea unui produs din cos
cartContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("cart-delete")) {

        const index = e.target.dataset.index;

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        renderCart();
    }
}); });


// emailjs
emailjs.init("PUBLIC_KEY");


// cos
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};


// adauga in cos (pagina principala)
document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {

        const name = card.querySelector("h3")?.innerText;
        const price = parseInt(card.querySelector(".price")?.innerText.replace(/\D/g, ""));
        const img = card.querySelector("img")?.src;

        const qty = 1;

        const existing = cart.find(i => i.name === name);

        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name, price, qty, img, isCustom: false });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        window.location.href = "cos.html";
    });
});


// personalizat
document.getElementById("trimitePersonalizat")?.addEventListener("click", () => {

    const input = document.getElementById("mesajPersonalizat");

    if (!input || input.value.trim() === "") {
        alert("Scrie descrierea comenzii!");
        return;
    }

    cart.push({
        name: "Comandă personalizată",
        price: 0,
        qty: 1,
        img: "imagini/custom.png",
        desc: input.value.trim(),
        isCustom: true
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    window.location.href = "cos.html";
});


// render la cos
function renderCart() {

    const cartContainer = document.getElementById("cart-container");
    const totalEl = document.getElementById("total-box");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.qty;
        total += itemTotal;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        if (item.isCustom) div.classList.add("custom");

        div.innerHTML = `
            <div class="cart-left">
                <img src="${item.img}" class="cart-img">

                <div class="cart-title">
                    <div class="name">
                        ${item.name}
                    </div>

                    ${
                        item.isCustom
                        ? `<div class="custom-desc-line">
                              Comandă personalizată: ${item.desc}
                           </div>`
                        : `<div class="sub">${item.qty} × ${formatPrice(item.price)} lei</div>`
                    }
                </div>
            </div>

            <div class="cart-right">
                ${item.isCustom ? "" : formatPrice(itemTotal) + " lei"}
            </div>

            <button class="cart-delete" data-index="${index}">×</button>
        `;

        cartContainer.appendChild(div);
    });

    totalEl.innerText = "Total: " + formatPrice(total) + " lei";
}


//  permite stergea unui sau + produse din cos
document.addEventListener("click", (e) => {

    if (e.target.classList.contains("cart-delete")) {

        const index = e.target.dataset.index;

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        renderCart();
    }
});


// finalizeaza comanda
document.getElementById("finalizeazaBtn")?.addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Coșul este gol!");
        return;
    }

    document.getElementById("checkout-modal").style.display = "flex";
});

document.getElementById("inchideCheckout")?.addEventListener("click", () => {
    document.getElementById("checkout-modal").style.display = "none";
});


// trimite email
document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("trimiteComanda")?.addEventListener("click", () => {

    const nume = document.getElementById("nume").value;
    const prenume = document.getElementById("prenume").value;
    const adresa = document.getElementById("adresa").value;
    const email = document.getElementById("email").value;
    const telefon = document.getElementById("telefon").value;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!nume || !prenume || !adresa || !email || !telefon) {
        alert("Completează toate câmpurile!");
        return;
    }

    if (!/^0\d{0,8}$/.test(telefon)) {
        alert("Numărul de telefon trebuie să înceapă cu 0 și să aibă maxim 9 cifre!");
        return;
    }

    // calcul total
    let total = 0;

    cart.forEach(item => {
        if (!item.isCustom) {
            total += item.qty * item.price;
        }
    });

    // obiect comandă
    let comanda = {
        nume,
        prenume,
        email,
        telefon,
        adresa,
        cos: cart,
        total,
        data: new Date().toLocaleString()
    };

    // salvare localStorage
    let comenzi = JSON.parse(localStorage.getItem("comenzi")) || [];
    comenzi.push(comanda);
    localStorage.setItem("comenzi", JSON.stringify(comenzi));

    // descarca fisier json
    const dataStr = JSON.stringify(comanda, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `comanda_${nume}_${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);

    // curățare coș
    localStorage.removeItem("cart");

    document.getElementById("cart-container").innerHTML = "";
    document.getElementById("total-box").innerText = "Total: 0 lei";

    document.getElementById("checkout-modal").style.display = "none";

    alert("Comanda a fost salvată și descărcată cu succes!");

});
// initializare cos
renderCart();});