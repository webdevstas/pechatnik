particlesJS("particles-js", { "particles": { "number": { "value": 25, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#8e8e8e" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 3 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } }, "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 4.16725702807898, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } }, "line_linked": { "enable": true, "distance": 150, "color": "#afafaf", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 5.000708433694776, "direction": "none", "random": true, "straight": false, "out_mode": "bounce", "bounce": false, "attract": { "enable": true, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "window", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "repulse" }, "resize": true }, "modes": { "grab": { "distance": 155.83419241926586, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true });

var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene, {
    relativeInput: false
});

Vue.component('step-item', {
    template: `
    <div class="col-md-4">
    <div class="form__section-item">
        <div class="form__section-item__step__title bold">Шаг {{ step.id }} ></div>
        <a href="" class="form__section-item__select__btn" v-on:click=modalOpen>{{ selectBtnText }}</a>
        <img v-bind:src="step.defImg" alt="" class="form__section-item__img">
        <div class="form__section-item__colors"></div>
        <div class="form__section-item__step__btn"> </div>
        <div class="form__section-item__price bold">{{ step.price }} руб.</div>
    </div>
    <div v-if=isModalOpened id="modal-win">
        <span class="close-modal" v-on:click=modalClose>Закрыть</span>
        <ul class="modal-list">
            <li v-for='variant in step.variants' class="modal-list__item"><img class="modal-list__item__img" :src=variant.img alt=""></li>
        </ul>
    </div>
</div>
        `,
    props: {
        step: Object
    },
    data: function() {
        return {
            isModalOpened: false
        }
    },
    computed: {
        selectBtnText: function() {
            if (this.step.id === 1) {
                return 'Выбрать другой шаблон'
            } else if (this.step.id === 2) {
                return 'Выбрать другую оснастку'
            }
        }
    },
    methods: {
        modalOpen: function(e) {
            e.preventDefault();
            this.isModalOpened = true;
            document.body.style.overflow = 'hidden';
        },
        modalClose: function(e) {
            this.isModalOpened = false;
            document.body.style.overflow = 'auto';
        }
    }
})

var formApp = new Vue({
    el: '#form-app',
    data: {
        formSteps: [{
                id: 1,
                defImg: 'img/form/shtamp-blue.png',
                variants: [{
                        id: 1,
                        img: 'img/form/shtamp-red.png',
                        price: null
                    },
                    {
                        id: 2,
                        img: 'img/form/shtamp-black.png',
                        price: null
                    }
                ],
                colors: [],
                price: 500
            },
            {
                id: 2,
                defImg: 'img/form/avtomaticheskaya-osnastka-blue.png',
                variants: [{
                        id: 1,
                        img: 'img/form/avtomaticheskaya-osnastka-red.png',
                        price: null
                    },
                    {
                        id: 2,
                        img: 'img/form/avtomaticheskaya-osnastka-black.png',
                        price: null
                    }
                ],
                colors: [],
                price: 400
            }
        ]
    },
    methods: {

    },
    computed: {

    }
});