class ArticlePreview extends HTMLElement {
    static get observedAttributes(){
        return ['autor', 'title', 'perfil', 'portada']
    };
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._datos = {};
        this._autor = '';
        this._title = '';
        this._perfil = '';
        this._portada = '';
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'autor':
                this._autor = newValue;
                this._datos.autor = newValue;
                break;
            case 'title':
                this._title = newValue;
                this._datos.title = newValue;
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
        this._title = opciones.title || this._title;
        this._perfil = opciones.perfil || this._perfil;
        this._portada = opciones.portada || this._portada;

        this.setAttribute('autor', opciones.autor || this._autor);
        this.setAttribute('title', opciones.title || this._title);
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
            .article-preview {
            border: 1px solid #ccc;
            padding: 16px;
            margin: 16px;
            border-radius: 8px;
            }
            .title {
            font-size: 1.5em;
            margin-bottom: 8px;
            }
            .content {
            font-size: 1em;
            color: #555;
            }
        </style>
        <article class="article-preview">
            <figure>
                <img src="${this._portada}" alt="Article Image Portada" />
            </figure>
            <section>
                <h2 class="title">${this._title}</h2>
                <p class="content"><slot></slot></p>
            </section>
            <footer>
                <figure>
                    <img src="${this._perfil}" alt="Article Image Perfil" />
                </figure>
                <p>${this._autor}</p>
                <p>${new Date().toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</p>
                <span>
                    <img src="./images/icon-share.svg" alt="Share Icon" />
                </span>
            </footer>
        </article>
        `;
    }    
}

customElements.define('article-preview', ArticlePreview);

/* const preview = document.querySelector('#preview');
preview.articleData = {
    title: 'Example Title',
    content: 'This is the content of the article.'
}; */

/* const preview = document.createElement('article-preview');
const $app = document.querySelector('#app');



console.log(preview.datos);

$app.appendChild(preview);
preview.setAttribute('autor', 'Ivan');

preview.datos = {
    autor: 'Michelle Appleton',
    portada: "./images/drawers.jpg",
    title: "Shift the overall look and feel by adding these wonderful touches to furniture in your home",
    perfil: "./images/avatar-michelle.jpg"
}; */