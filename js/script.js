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
        <img v-bind:src="curColor.img" alt="" class="form__section-item__img">
        <div class="form__section-item__colors"></div>
        <div class="form__section-item__step__btn"></div>
        <div class="form__section-item__colors">
            <ul class="form__section-item__colors__list">
                <li class="form__section-item__colors__list__item" v-for="color in curVariant.colors" :style="{backgroundColor: color.code}" :class="{active:color.isActive}" @click="selectColor(color, $event)"></li>
            </ul>
        </div>
        <div class="form__section-item__price bold">{{ curVariant.price }} руб.</div>
    </div>
    <div v-if=isModalOpened id="modal-win">
        <span class="close-modal" v-on:click=modalClose>Закрыть</span>
        <ul class="modal-list">
            <li v-for='variant in step.variants' class="modal-list__item"><img class="modal-list__item__img" :src=variant.img alt="" @click=selectVariant(variant)></li>
        </ul>
    </div>
</div>
        `,
    props: {
        step: Object
    },
    data: function() {
        return {
            isModalOpened: false,
            curVariant: this.step.variants[0],
            curColor: this.step.variants[0].colors[0]
        }
    },
    computed: {
        selectBtnText: function() {
            if (this.step.id === 1) {
                return 'Выбрать другой шаблон'
            } else if (this.step.id === 2) {
                return 'Выбрать другую оснастку'
            }
        },
        resultData: function() {
            let data = {
                stepId: this.step.id,
                variantId: this.curVariant.id,
                color: this.curColor.name,
                price: this.curVariant.price
            };
            return data;
        }
    },
    methods: {
        modalOpen: function(e) {
            e.preventDefault();
            this.isModalOpened = true;
            document.body.style.overflow = 'hidden';
        },
        modalClose: function() {
            this.isModalOpened = false;
            document.body.style.overflow = 'auto';
        },
        selectVariant: function(variant) {
            this.curVariant = variant;
            this.modalClose();
        },
        selectColor: function(color, event) {
            var chls = event.target.parentElement.children;
            for (var i = 0; i < chls.length; i++) {
                chls[i].classList.remove("color-active");
            }
            this.curColor = color;
            event.target.classList.add("color-active");
        }
    },
    watch: {
        resultData() {
            this.$emit('changed-data', this.resultData);
        }
    },
})

var formApp = new Vue({
    el: '#form-app',
    data: {
        firstStepResult: {},
        secondStepResult: {},
        formSteps: [{
                id: 1,
                variants: [{
                    id: 1,
                    price: 100,
                    img: 'img/form/shtamp-red.png',
                    colors: [{
                            id: 1,
                            code: 'red',
                            name: 'Красный',
                            img: 'img/form/shtamp-red.png'
                        },
                        {
                            id: 2,
                            code: 'black',
                            name: 'Чёрный',
                            img: 'img/form/shtamp-black.png'
                        },
                        {
                            id: 3,
                            code: 'blue',
                            name: 'Синий',
                            img: 'img/form/shtamp-blue.png'
                        }
                    ]
                }],
            },
            {
                id: 2,
                variants: [{
                    id: 1,
                    price: 100,
                    img: 'img/form/avtomaticheskaya-osnastka-red.png',
                    colors: [{
                            id: 1,
                            code: 'red',
                            name: 'Красный',
                            img: 'img/form/avtomaticheskaya-osnastka-red.png'
                        },
                        {
                            id: 2,
                            code: 'black',
                            name: 'Чёрный',
                            img: 'img/form/avtomaticheskaya-osnastka-black.png'
                        },
                        {
                            id: 3,
                            code: 'blue',
                            name: 'Синий',
                            img: 'img/form/avtomaticheskaya-osnastka-blue.png'
                        }
                    ]
                }]
            }
        ]
    },
    methods: {
        firstStepData: function(data) {
            this.firstStepResult = data;
        },
        secondStepData: function(data) {
            this.secondStepResult = data;
        }
    },
    computed: {
        totalPrice: function() {
            if (this.firstStepResult.price && this.secondStepResult.price) {
                return this.firstStepResult.price + this.secondStepResult.price;
            } else return this.formSteps[0].variants[0].price + this.formSteps[1].variants[0].price
        }
    }
});