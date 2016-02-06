'use strict';

(function() {
  var COMMENT_REQUIRED_MARK_THRESHOLD = 3;
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
    formContainer.classList.remove('invisible');
    nameField.setAttribute('required', 'true');
    validateReviewForm();
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  function setCommentRequired() {
    if (this.value < COMMENT_REQUIRED_MARK_THRESHOLD) {
      commentField.setAttribute('required', 'true');
    } else {
      commentField.removeAttribute('required');
    }
    validateReviewForm();
  }

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

})();
