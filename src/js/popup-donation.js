"use strict";

const donateNow = document.querySelector('#donate-now');
const donateForVolonteers = document.querySelector('.page-footer__donate');
const popup = document.querySelector('.popup');
const popupClose = popup.querySelector('.popup__close');
const popupAmountBar = popup.querySelector('.popup__amount-bar');

const donationButton = document.querySelector('.donation__button');
const donationAmount = document.querySelector('#donation-amount');
const popupDonation = document.querySelector('.popup-donation');
const popupContent = popupDonation.querySelector('.popup-donation__container');
const fieldSets = popupDonation.querySelectorAll('fieldset');
const progressPoints = popupDonation.querySelectorAll('.popup-donation__progressbar .popup-donation__progressbar-point');
const prevButton = popupDonation.querySelector('.popup-donation__prev-button');
const nextButton = popupDonation.querySelector('.popup-donation__next-button');
const amountBar = popupDonation.querySelector('.form-donation__amount-bar');
const amountOther = popupDonation.querySelector('#amount-other');
const amountSum = popupDonation.querySelector('.form-donation__amount-sum');
const choosePetLabel = popupDonation.querySelector('label[for=choose-pet]');
const petSelector = popupDonation.querySelector('#choose-pet');
const form = popupDonation.querySelector('.popup-donation__form');
let presetDonationValue = false;


/* Start --- Misc */
const openPopup = function () {
  popup.style.display = 'block';
};
const openPopupDonation = function () {
  popupDonation.style.display = 'block';
  if (donationAmount.value) {
    amountSum.value = donationAmount.value;
    amountOther.checked = true;
    amountSum.disabled = false;
    amountSum.focus();
  }
  if (presetDonationValue) {
    if (presetDonationValue === 'other') {
      amountOther.checked = true;
      amountSum.disabled = false;
      amountSum.focus();
    } else {
      document.querySelector(`#amount-${presetDonationValue}`).checked = true;
      presetDonationValue = false;
    }
  }
};
const closePopup = function () {
  if (popup.style.display === 'none') return;
  popup.style.display = 'none';
  window.removeEventListener('keydown', onEcsDown);
  popup.removeEventListener('click', onShadowAreaClick);
  popupAmountBar.removeEventListener('click', onPopupAmountBarClick);
  popupClose.removeEventListener('click', closePopup);
};
const closePopupDonation = function (evt) {
  if (popupDonation.style.display === 'none') return;
  popupDonation.style.display = 'none';
  window.removeEventListener('keydown', onEcsDown);
  popupDonation.removeEventListener('click', onShadowAreaClick);
  popupDonation.removeEventListener('input', onInputForm);

};
const onEcsDown = function (evt) {
  if (evt.code === 'Escape') {
    closePopup();
    closePopupDonation();
  }
};
const onShadowAreaClick = function (evt) {
  if (evt.currentTarget === evt.target) {
    closePopup();
    closePopupDonation();
  }

};
const submitDonationForm = function () {

  form.requestSubmit();

};
const nextButtonMakeSubmit = function () {
  nextButton.classList.remove('button--green');
  nextButton.classList.add('form-donation__submit');
  nextButton.querySelector('.button__text').textContent = 'complite donation';
  nextButton.type = 'submit';
};
const nextButtonMakeButton = function () {
  nextButton.classList.remove('form-donation__submit');
  nextButton.classList.add('button--green');
  nextButton.querySelector('.button__text').textContent = 'next';
  nextButton.type = 'button';
};

popupDonation.querySelector('.form-donation__block-32 input').addEventListener('input', (evt) => evt.currentTarget.value = evt.currentTarget.value.slice(0, 3));
/* End --- Misc */

const checkActiveFieldset = function () {
  let activeFieldsetIndex = 0;

  for (let i = 0; i < fieldSets.length; i++) {
    if (fieldSets[i].classList.contains('active')) activeFieldsetIndex = i;
  }
  return activeFieldsetIndex;
};

const runFadeOutEffect = function (element) {
  element.style.opacity = 0;
  setTimeout(() => element.style.opacity = 1, 1);
};

const showPrevFieldset = function () {
  const activeFieldsetIndex = checkActiveFieldset();

  if (activeFieldsetIndex <= 1) {
    prevButton.style.display = 'none';
    fieldSets.forEach((item) => item.classList.remove('active'));
    fieldSets[0].classList.add('active');
    runFadeOutEffect(fieldSets[0]);
    progressPoints.forEach((item) => item.classList.remove('fill'));
    progressPoints[0].classList.add('fill');
    return;
  }
  fieldSets[activeFieldsetIndex].classList.remove('active');
  fieldSets[activeFieldsetIndex - 1].classList.add('active');
  runFadeOutEffect(fieldSets[activeFieldsetIndex - 1]);
  progressPoints[activeFieldsetIndex].classList.remove('fill');

  /* change appereance of next button to button type */
  if (activeFieldsetIndex === fieldSets.length - 1) {
    nextButtonMakeButton();
    nextButton.disabled = false;
  }

};

const showNextFieldset = function () {
  const activeFieldsetIndex = checkActiveFieldset();

  /* Submit form if filled required */
  if (activeFieldsetIndex === fieldSets.length - 1) {
    submitDonationForm();
    return;
  }

  /* change fieldset */
  fieldSets[activeFieldsetIndex].classList.remove('active');
  fieldSets[activeFieldsetIndex + 1].classList.add('active');
  runFadeOutEffect(fieldSets[activeFieldsetIndex + 1]);

  /* add progress points */
  progressPoints[activeFieldsetIndex + 1].classList.add('fill');
  prevButton.style.display = 'flex';

  /* change appereance of next button to submit type */
  if (activeFieldsetIndex === fieldSets.length - 2) {
    nextButtonMakeSubmit();
    if (!checkFormValidity()) nextButton.disabled = true;
  }


};

const onPrevButtonClick = function () {
  showPrevFieldset();
};
const onNextButtonClick = function () {
  showNextFieldset();
};

const onAmountBarChange = function () {
  if (amountOther.checked) {
    amountSum.disabled = false;
    amountSum.focus();
  } else {
    amountSum.disabled = true;
  }

};
const onPetSelectorChange = function () {
  if (petSelector.value) {
    choosePetLabel.style.backgroundColor = '#00a092';
    petSelector.style.color = '#000000';
    console.log(petSelector.value);
  } else {
    choosePetLabel.style.backgroundColor = 'rgba(0, 160, 146, 0.5)';
    petSelector.style.color = '#a4a8ae';

  }
};

const onPopupAmountBarClick = function (evt) {
  presetDonationValue = popup.querySelector(`#${evt.target.htmlFor}`).value;
  closePopup();
  runPopupDonation();
};

const runPopup = function () {
  openPopup();
  window.addEventListener('keydown', onEcsDown);
  popup.addEventListener('click', onShadowAreaClick);
  popupClose.addEventListener('click', closePopup);
  popupAmountBar.addEventListener('click', onPopupAmountBarClick);
};

const runPopupDonation = function () {
  openPopupDonation();
  window.addEventListener('keydown', onEcsDown);
  popupDonation.addEventListener('click', onShadowAreaClick);
  popupDonation.addEventListener('input', onInputForm);
  petSelector.addEventListener('change', onPetSelectorChange);
  amountBar.addEventListener('change', onAmountBarChange);
  prevButton.addEventListener('click', onPrevButtonClick);
  nextButton.addEventListener('click', onNextButtonClick);
};

const onInputForm = function () {
  const activeFieldsetIndex = checkActiveFieldset();

  if (checkFormValidity()) {
    nextButton.disabled = false;
    return;
  }
  if (activeFieldsetIndex === fieldSets.length - 1) nextButton.disabled = true;

};

function checkFormValidity() {
  for (let i = 0; i < form.elements.length; i++) {
    if (!form.elements[i].validity.valid) {
      return false;
    }
  }
  return true;
}


const onDonationButtonClick = function () {
  runPopupDonation();
};

const onDonationButtonClickPrev = function () {
  runPopup();
};




//Starts here ***************************** */
donationButton.addEventListener('click', onDonationButtonClick);
donateNow.addEventListener('click', onDonationButtonClickPrev);
donateForVolonteers.addEventListener('click', onDonationButtonClickPrev);


// window.addEventListener('click', (evt) => {
//   console.log(evt.target);
// });