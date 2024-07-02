
const repeat = false;
const noArrows = false;
const noBullets = false;


const container = document.querySelector('.slider-container');
var slide = document.querySelectorAll('.slider-single');
var slideTotal = slide.length - 1;
var slideCurrent = -1;

function initBullets() {
    if (noBullets) {
        return;
    }
    const bulletContainer = document.createElement('div');
    bulletContainer.classList.add('bullet-container')
    slide.forEach((elem, i) => {
        const bullet = document.createElement('div');
        bullet.classList.add('bullet')
        bullet.id = `bullet-index-${i}`
        bullet.addEventListener('click', () => {
            goToIndexSlide(i);
        })
        bulletContainer.appendChild(bullet);
        elem.classList.add('proactivede');
    })
    container.appendChild(bulletContainer);
}

function initArrows() {
    if (noArrows) {
        return;
    }
    const leftArrow = document.createElement('a')
    const iLeft = document.createElement('i');
    iLeft.classList.add('fa')
    iLeft.classList.add('fa-arrow-left')
    leftArrow.classList.add('slider-left')
    leftArrow.appendChild(iLeft)
    leftArrow.addEventListener('click', () => {
        slideLeft();
    })
    const rightArrow = document.createElement('a')
    const iRight = document.createElement('i');
    iRight.classList.add('fa')
    iRight.classList.add('fa-arrow-right')
    rightArrow.classList.add('slider-right')
    rightArrow.appendChild(iRight)
    rightArrow.addEventListener('click', () => {
        slideRight();
    })
    container.appendChild(leftArrow);
    container.appendChild(rightArrow);
}

function slideInitial() {
    initBullets();
    initArrows();
    setTimeout(function () {
        slideRight();
    }, 500);
}

function updateBullet() {
    if (!noBullets) {
        document.querySelector('.bullet-container').querySelectorAll('.bullet').forEach((elem, i) => {
            elem.classList.remove('active');
            if (i === slideCurrent) {
                elem.classList.add('active');
            }
        })
    }
    checkRepeat();
}

function checkRepeat() {
    if (!repeat) {
        if (slideCurrent === slideTotal) {
            slide[0].classList.add('not-visible');
            slide[slideTotal].classList.remove('not-visible');
            if (!noArrows) {
                document.querySelector('.slider-right').classList.add('not-visible');
                document.querySelector('.slider-left').classList.remove('not-visible');
            }
        } else if (slideCurrent === 0) {
            slide[slideTotal].classList.add('not-visible');
            slide[0].classList.remove('not-visible');
            if (!noArrows) {
                document.querySelector('.slider-left').classList.add('not-visible');
                document.querySelector('.slider-right').classList.remove('not-visible');
            }
        } else {
            slide[slideTotal].classList.remove('not-visible');
            slide[0].classList.remove('not-visible');
            if (!noArrows) {
                document.querySelector('.slider-left').classList.remove('not-visible');
                document.querySelector('.slider-right').classList.remove('not-visible');
            }
        }
    }
}
function slideRight() {
    if (slideCurrent < slideTotal) {
        slideCurrent++;
    } else {
        slideCurrent = 0;
    }

    slide.forEach((elem) => {
        elem.classList.remove('active', 'preactive', 'proactive', 'proactivede', 'preactivede');
    });

    slide[slideCurrent].classList.add('active');
    if (slideCurrent > 0) {
        slide[slideCurrent - 1].classList.add('preactive');
    } else {
        slide[slideTotal].classList.add('preactive');
    }
    if (slideCurrent < slideTotal) {
        slide[slideCurrent + 1].classList.add('proactive');
    } else {
        slide[0].classList.add('proactive');
    }

    updateBullet();
    checkRepeat();
}

function slideLeft() {
    if (slideCurrent > 0) {
        slideCurrent--;
    } else {
        slideCurrent = slideTotal;
    }

    slide.forEach((elem) => {
        elem.classList.remove('active', 'preactive', 'proactive', 'proactivede', 'preactivede');
    });

    slide[slideCurrent].classList.add('active');
    if (slideCurrent > 0) {
        slide[slideCurrent - 1].classList.add('preactive');
    } else {
        slide[slideTotal].classList.add('preactive');
    }
    if (slideCurrent < slideTotal) {
        slide[slideCurrent + 1].classList.add('proactive');
    } else {
        slide[0].classList.add('proactive');
    }

    updateBullet();
    checkRepeat();
}

function goToIndexSlide(index) {
    const sliding = (slideCurrent > index) ? () => slideRight() : () => slideLeft();
    while (slideCurrent !== index) {
        sliding();
    }
}

slideInitial();