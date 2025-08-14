class ArticlePreview extends HTMLElement {
    static get observedAttributes(){
        return ['autor', 'titulo', 'perfil', 'portada']
    };
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._datos = {};
        this._autor = '';
        this._titulo = '';
        this._perfil = '';
        this._portada = '';
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'autor':
                this._autor = newValue;
                this._datos.autor = newValue;
                break;
            case 'titulo':
                this._titulo = newValue;
                this._datos.titulo = newValue;
                break;
            case 'perfil':
                this._perfil = newValue;
                this._datos.perfil = newValue;
                break;
            case 'portada':
                this._portada = newValue;
                this._datos.portada = newValue;
                break;
        }
        this.render();
    };
    
    connectedCallback() {
        this.render();
    }
    

    set datos(opciones) {
        this._autor = opciones.autor || this._autor;
        this._titulo = opciones.titulo || this._titulo;
        this._perfil = opciones.perfil || this._perfil;
        this._portada = opciones.portada || this._portada;

        this.setAttribute('autor', opciones.autor || this._autor);
        this.setAttribute('titulo', opciones.titulo || this._titulo);
        this.setAttribute('perfil', opciones.perfil || this._perfil);
        this.setAttribute('portada', opciones.portada || this._portada);
        this._datos = opciones;
        this.render();
    }

    get datos() {
        return this._datos;
    };

    
    render() {
        this.shadowRoot.innerHTML = /* html */`
        <style>
            :host {
                /* Colores */
                --Very-Dark-Grayish-Blue: hsl(217, 19%, 35%);
                --Desaturated-Dark-Blue: hsl(214, 17%, 51%);
                --Grayish-Blue: hsl(212, 23%, 69%);
                --Light-Grayish-Blue: hsl(210, 46%, 95%);
                
                /* Tipografía */
                --Font-weight-500: 500;
                --Font-weight-700: 700;
                font-family: 'Manrope', sans-serif;
            }
            *,
            *::before,
            *::after {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                border: 0;
                font: inherit;
                font-size: 100%;
                vertical-align: baseline;
            }
            .article-preview {
                display: grid;
                grid-template-columns: max(295px) minmax(0, 428px);
                grid-template-areas:
                "portada article-content"
                "portada author-info";
                background-color: white;
                gap: 1.75rem 0;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .portada {
                grid-area: portada;  
            }
            .portada img {
                inline-size: 100%;
                block-size: 100%;
                border-radius: 8px 0 0 8px;
                display: block;
                object-fit: cover;
                object-position: left;
            }
            .article-content {
                grid-area: article-content;
                padding: 1.75rem 1.75rem 0 ;
            }
            .title {
            font-size: 1.25rem;
            font-weight: var(--Font-weight-700);
            margin-bottom: 1.5rem;
            color: var(--Very-Dark-Grayish-Blue);
            }
            .content {
            font-size: 0.815rem;
            color: var(--Desaturated-Dark-Blue);
            }
            .author-info {
                grid-area: author-info;
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 0 1.75rem 1.75rem;
                position: relative;
            }
            .perfil {
                inline-size: 2.5rem;
                block-size: 2.5rem;
                border-radius: 50%;
            }
            .perfil img {
                inline-size: 100%;
                block-size: 100%;
                border-radius: 50%;
                display: block;
            }
            .author-text {
                flex-grow: 1;
            }
            .autor {
                font-weight: var(--Font-weight-700);
                color: var(--Very-Dark-Grayish-Blue);
                font-size: 0.813rem;
            }
            .fecha {
                font-weight: var(--Font-weight-500);
                color: var(--Grayish-Blue);
                font-size: 0.813rem;
            }
            .share {
                align-self: center;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--Light-Grayish-Blue);
                padding: 0.5rem;
                border-radius: 50%;
                inline-size: 1.75rem;
                block-size: 1.75rem;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            .share.is_active {
                background-color: var(--Desaturated-Dark-Blue);
            }
            .share svg {
                inline-size: 100%;
                block-size: 100%;
            }
            .share svg path {
                fill: #6E8098;
            }
            .dialog-share[open] {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 0.938rem;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                color: var(--Grayish-Blue);
                background-color: var(--Very-Dark-Grayish-Blue);
                inset-inline: 65.5%;
                inset-block: -85%;
            }
            .dialog-share:focus-visible {
                outline: none;
            }
            .dialog-share::before {
                content:"";
                position: absolute;
                bottom: -18px;
                width: 20px;
                height: 20px;
                clip-path: polygon(100% 0, 0% 0%, 50% 70%);
                background-color: var(--Very-Dark-Grayish-Blue);
            }
            .dialog-share p {
                letter-spacing: 0.25rem;
                font-size: 0.875rem;
            }
            .social-media {
                display: flex;
                gap: 0.75rem;    
            }
            .social-media a:focus-visible {
                outline: none;
            }
            .social-media a img {
                display: block;
                block-size: 100%;
                transition: transform 0.3s ease;
            }
            @media screen and (max-width: 767px) {
                .article-preview {
                    grid-template-columns: minmax(0, 428px);
                    grid-template-areas:
                        "portada "
                        "article-content"
                        "author-info";
                    margin: 0 1.25rem;
                    gap: 1rem 0;
                }
                .portada {
                    block-size: 280px;  
                }
                .portada img {
                    object-position: top;
                    border-radius: 8px 8px 0 0;
                }
            }
            @media screen and (max-width: 425px) {
                .article-preview {
                    gap: 0.75rem 0;
                }
                .portada {
                    block-size: 220px;  
                }
                .portada img {
                    border-radius: 8px 8px 0 0;
                }
            }
        </style>
        <article class="article-preview">
            <figure class="portada">
                <img src="${this._portada}" alt="Article Image Portada" />
            </figure>
            <section class="article-content">
                <h2 class="title">${this._titulo}</h2>
                <p class="content"><slot></slot></p>
            </section>
            <footer class="author-info">
                <figure class="perfil">
                    <img src="${this._perfil}" alt="Article Image Perfil" />
                </figure>
                <div class="author-text">
                    <p class="autor" >${this._autor}</p>
                    <p class="fecha" >${new Date().toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</p>
                </div>
                <span class="share">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15""><path d="M15 6.495L8.766.014V3.88H7.441C3.33 3.88 0 7.039 0 10.936v2.049l.589-.612C2.59 10.294 5.422 9.11 8.39 9.11h.375v3.867L15 6.495z"/></svg>
                </span>
                <dialog class="dialog-share">
                    <p>SHARE</p>
                    <nav class="social-media">
                        <a href="https://web.facebook.com" target="_black"><img src="./images/icon-facebook.svg" alt="Facebook Icon"></a>
                        <a href="https://x.com/?lang=es" target="_black"><img src="./images/icon-twitter.svg" alt="Twitter icon"></a>
                        <a href="https://es.pinterest.com" target="_black"><img src="./images/icon-pinterest.svg" alt="Pinterest Icon"></a>
                    </nav>
                </dialog>
            </footer>
        </article>
        `;
        this.shadowRoot.querySelector('.share').addEventListener('click', () => {
            const dialog = this.shadowRoot.querySelector('.dialog-share');
            if (!dialog.open) {
                dialog.show();
                this.shadowRoot.querySelector('.share').classList.add('is_active');
                this.shadowRoot.querySelector('.share svg path').style.fill = '#fff';
            } else {
                dialog.close();
                this.shadowRoot.querySelector('.share').classList.remove('is_active');
                this.shadowRoot.querySelector('.share svg path').style.fill = '#6E8098';
            }
        });
    };    
};

customElements.define('article-preview', ArticlePreview);

/* const preview = document.querySelector('#preview');
preview.datos = {
    autor: 'Ivan'
} */

/* const preview = document.createElement('article-preview');
const $app = document.querySelector('#app');



console.log(preview.datos);

$app.appendChild(preview);
// preview.setAttribute('autor', 'Ivan');

preview.datos = {
    autor: 'Michelle Appleton',
    portada: "./images/drawers.jpg",
    titulo: "Shift the overall look and feel by adding these wonderful touches to furniture in your home",
    perfil: "./images/avatar-michelle.jpg"
};

console.log(preview.titulo) */