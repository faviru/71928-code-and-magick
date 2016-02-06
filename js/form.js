'use strict';

(function() {
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
  var reviewMarkContainer = document.querySelector('.review-form-group-mark').elements;
  var reviewMark1 = reviewMarkContainer.namedItem('review-mark-1');
  var reviewMark2 = reviewMarkContainer.namedItem('review-mark-2');
  var reviewMark3 = reviewMarkContainer.namedItem('review-mark-3');
  var reviewMark4 = reviewMarkContainer.namedItem('review-mark-4');
  var reviewMark5 = reviewMarkContainer.namedItem('review-mark-5');

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
    commentField.setAttribute('required', 'true');
    validateReviewForm();
  }

  function removeCommentRequired() {
    commentField.removeAttribute('required');
    validateReviewForm();
  }

  function validateReviewForm() {
    var nameHintVisible = setHintVisibility(nameField, nameHint);
    var commentHintVisible = setHintVisibility(commentField, commentHint);

    if (nameHintVisible || commentHintVisible) {
      hintContainer.classList.remove('invisible');
      formSubmitButton.setAttribute('disabled', 'true');
    } else {
      hintContainer.classList.add('invisible');
      formSubmitButton.removeAttribute('disabled');
    }
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

  reviewMark1.addEventListener('click', setCommentRequired);
  reviewMark2.addEventListener('click', setCommentRequired);
  reviewMark3.addEventListener('click', removeCommentRequired);
  reviewMark4.addEventListener('click', removeCommentRequired);
  reviewMark5.addEventListener('click', removeCommentRequired);
  nameField.addEventListener('input', validateReviewForm);
  commentField.addEventListener('input', validateReviewForm);

})();
