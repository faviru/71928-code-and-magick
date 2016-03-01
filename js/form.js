/*global docCookies*/
'use strict';

(function() {
  /**
   * Граница меджу полодительной и отрицательной оценками.
   * @type {number}
   * @const
     */
  var COMMENT_REQUIRED_MARK_THRESHOLD = 3;

  /**
   * День рождения автора.
   * @type {number}
   * @const
     */
  var B_DAY_DAY = 8;

  /**
   * Месяц рождения автора.
   * @type {number}
   * @const
   */
  var B_DAY_MONTH = 6;

  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var formSubmitButton = document.querySelector('.review-submit');
  var reviewForm = document.querySelector('.review-form');
  var nameField = reviewForm['review-name'];
  var commentField = document.querySelector('.review-form-field-text');
  var hintContainer = document.querySelector('.review-fields');
  var nameHint = document.querySelector('.review-fields-name');
  var commentHint = document.querySelector('.review-fields-text');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    nameField.value = docCookies.getItem('nameField');
    var cookieCheckedMark = docCookies.getItem('checkedMark');
    if (cookieCheckedMark) {
      var cookieSavesMark = document.querySelector('#review-mark-' + cookieCheckedMark);
      cookieSavesMark.checked = true;
      setCommentRequired.call(cookieSavesMark);
    }
    formContainer.classList.remove('invisible');
    nameField.setAttribute('required', 'true');
    validateReviewForm();
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  /**
   * Устанавливает обязательность заполнения поля Отзыв.
   */
  function setCommentRequired() {
    if (this.value < COMMENT_REQUIRED_MARK_THRESHOLD) {
      commentField.setAttribute('required', 'true');
    } else {
      commentField.removeAttribute('required');
    }
    validateReviewForm();
  }

  /**
   * Показывает/скрывает поле подсказки в зависимости от валидности формы.
   */
  function validateReviewForm() {
    var nameHintVisible = setHintVisibility(nameField, nameHint);
    var commentHintVisible = setHintVisibility(commentField, commentHint);

    if (nameHintVisible || commentHintVisible) {
      hintContainer.classList.remove('invisible');
    } else {
      hintContainer.classList.add('invisible');
    }

    formSubmitButton.disabled = !formIsValid();
  }

  /**
   * Определяет валидность заполнения формы.
   * @returns {boolean}
     */
  function formIsValid() {
    var isValid = true;

    for (var i = 0; i < reviewForm.elements.length; i++) {
      isValid = reviewForm.elements[i].validity.valid;
      if (!isValid) {
        break;
      }
    }
    return isValid;
  }

  /**
   * Устанавливает видимость подсказок для обязательности заполнения поля.
   * @param {Element} field
   * @param {Element} hint
   * @returns {boolean}
     */
  function setHintVisibility(field, hint) {
    if (field.hasAttribute('required') && field.value === '') {
      hint.classList.remove('invisible');
      return true;
    } else {
      hint.classList.add('invisible');
      return false;
    }
  }

  for (var i = 0; i < reviewForm['review-mark'].length; i++) {
    reviewForm['review-mark'][i].addEventListener('click', setCommentRequired);
  }

  nameField.addEventListener('input', validateReviewForm);
  commentField.addEventListener('input', validateReviewForm);

  reviewForm.onsubmit = function(evt) {
    evt.preventDefault();

    var today = new Date();
    var dateInterval = new Date();
    var todayMonth = today.getMonth();
    var todayYear = today.getFullYear();

    if (todayMonth === B_DAY_MONTH) {
      if (today.getDate() > B_DAY_DAY) {
        dateInterval.setFullYear(todayYear, B_DAY_MONTH, B_DAY_DAY);
      } else {
        dateInterval.setFullYear(todayYear - 1, B_DAY_MONTH, B_DAY_DAY);
      }
    } else {
      if (todayMonth > B_DAY_MONTH) {
        dateInterval.setFullYear(todayYear, B_DAY_MONTH, B_DAY_DAY);
      } else {
        dateInterval.setFullYear(todayYear - 1, B_DAY_MONTH, B_DAY_DAY);
      }
    }

    var formattedDateToExpire = new Date(+today + (today - dateInterval)).toUTCString();
    var reviewMark = document.querySelector('.review-form')['review-mark'].value;

    docCookies.setItem('nameField', nameField.value, formattedDateToExpire);
    docCookies.setItem('checkedMark', reviewMark, formattedDateToExpire);
    reviewForm.submit();
  };
})();
