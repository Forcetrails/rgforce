/**
 * @author @rahulgawale
 * @description - This component provides lookup with additional field to search by.
 * use additionalSearchField - to search by additional field
 * use additionalDisplayField - to display additional record info in lookup auto complete (can be formula field)
 */

import { LightningElement, api } from "lwc";
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

export default class FlowRecordPicker extends LightningElement {
  _recordId;
  @api
  get recordId() {
    return this._recordId;
  }
  set recordId(value) {
    this._recordId = value;
  }

  @api label = "Search Accounts";
  @api sobjectApiName = "Account";
  @api primarySearchField = "Name";
  @api primaryDisplayField = "Name";
  @api required;
  @api additionalSearchField = "Description";
  @api additionalDisplayField = "Description";

  // additional fields
  @api variant = "default";

  _filter;
  @api
  get filter() {
    return this._filter;
  }
  set filter(value) {
    // validate JSON
    if (value) {
      try {
        this._filter = JSON.parse(value);
      } catch (err) {
        console.error("Error: Invalid filter JSON value", err);
      }
    }
  }

  @api disabled;
  @api placeholder;
  @api fieldLevelHelp;
  @api messageWhenBadInput;

  @api
  checkValidity() {
    return this.template
      .querySelector("lightning-record-picker")
      .checkValidity();
  }

  @api
  reportValidity() {
    return this.template
      .querySelector("lightning-record-picker")
      .reportValidity();
  }

  @api
  setCustomValidity(message) {
    return this.template
      .querySelector("lightning-record-picker")
      .setCustomValidity(message);
  }

  @api
  clearSelection() {
    return this.template
      .querySelector("lightning-record-picker")
      .clearSelection();
  }

  @api
  blur() {
    return this.template
      .querySelector("lightning-record-picker")
      .blur();
  }

  @api
  focus() {
    return this.template
      .querySelector("lightning-record-picker")
      .focus();
  }

  get displayInfo() {
    return {
      primaryField: this.primaryDisplayField || this.primarySearchField,
      additionalFields: [this.additionalDisplayField]
    };
  }

  get matchingInfo() {
    return {
      primaryField: { fieldPath: this.primarySearchField },
      additionalFields: [{ fieldPath: this.additionalSearchField }]
    };
  }

  handleRecordSelect(event) {
    this._recordId = event.detail.recordId;

    const pse = new CustomEvent("selected", {
      detail: { recordId: this._recordId }
    });
    this.dispatchEvent(pse);

    try {
      const attributeChangeEvent = new FlowAttributeChangeEvent(
        "recordId",
        this._recordId
      );
      this.dispatchEvent(attributeChangeEvent);
    } catch (err) {
      console.error("Error while firing FlowAttributeChangeEvent", err);
    }
  }
}