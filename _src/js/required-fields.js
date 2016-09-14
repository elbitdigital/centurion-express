
/* Required fields */

var RequiredField = (function () {

	/**
	 * Required Field constructor
	 * @constructor
	 */
	function RequiredField(viewport, fieldClass) {

		var self = this;

		this.viewport = viewport;

		this.input = {};
		this.label = {};
		this.fieldClass = fieldClass;
		this.message = {
			label: '',
			empty: this.viewport.dataset.empty
		};

		this.onClick = function () {

			try {

				self.input.viewport.focus();

			} catch ( e ) { }

		};

		this.onFocus = function () {

			self.viewport.classList.add('has-focus');

			if (self.input.viewport.value)
				self.viewport.classList.remove('is-error');

		};

		this.onBlur = function () {

			self.viewport.classList.remove('has-focus');

			if (!self.input.viewport.value)
				self.viewport.classList.add('is-error');
			else {

				if (self.validateInput(self.input.viewport)) {
					self.viewport.classList.add('is-valid');
					self.viewport.classList.remove('is-error');
				} else {
					self.viewport.classList.remove('is-valid');
					self.viewport.classList.add('is-error');
					self.viewport.classList.add('has-label');
				}
				// self.viewport.classList.remove('is-error');
			}

		};

		this.onInput = function () {

			// current
			// if (self.input.viewport.value) {
			// 	self.viewport.classList.remove('is-empty');
			// 	self.viewport.classList.add('has-label');
			// 	self.viewport.classList.add('is-valid');
			// } else {
			// 	self.viewport.classList.remove('has-label');
			// 	self.viewport.classList.remove('is-valid');
			// }

			if (self.input.viewport.value) {
				self.viewport.classList.remove('is-error');
				self.viewport.classList.add('has-label');
			} else {
				self.viewport.classList.remove('has-label');
				self.viewport.classList.remove('is-valid');
			}

		};

		if (this.viewport)
			this.init();

	}

	/**
	 * Normalize
	 */
	RequiredField.prototype.normalize = function () {

		if (this.input.viewport.value)
			this.viewport.classList.add('has-label');

	};

	/**
	 * Add the listeners
	 * It support IE8
	 */
	RequiredField.prototype.addListeners = function () {

		try {

			this.viewport.addEventListener('click', this.onClick, false);

			this.input.viewport.addEventListener('focus', this.onFocus, false);
			this.input.viewport.addEventListener('blur', this.onBlur, false);
			this.input.viewport.addEventListener('input', this.onInput, false);

		} catch ( e ) {	}

	};

	/**
	 * Get the input element
	 * @return {boolean}
	 */
	RequiredField.prototype.getInputElement = function () {

		this.input.viewport = this.viewport.querySelector(this.fieldClass);
		this.label.viewport = this.viewport.querySelector("label");
		this.message.label = this.label.viewport.innerText;
		console.log(this.message.empty);

		return !!this.input.viewport;

	};

	/**
	 * Validate input element values
	 * @return {boolean}
	 */
	RequiredField.prototype.validateInput = function (input) {

		console.log(input.validity.valid);

		/* Create verification for email and phone */

		// console.log((input.value.replace(/\s+/g, '') == input.value) ? 'válido' : 'inválido');

		if (input.id == "cEmail") {

			if (/\A[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\z/.test(input.value))
				return true;
			
		} else if (input.id == "cPhone") {
			
			if (input.value == "111") {
				this.label.viewport.innerText = this.message.label;
				return true;
			} else
				this.label.viewport.innerText = this.message.empty;
			
		}

		return false;

	};

	/**
	 * Init the instance
	 */
	RequiredField.prototype.init = function () {

		if (this.getInputElement())
			this.addListeners();

		this.normalize();

	};

	return RequiredField;

})();