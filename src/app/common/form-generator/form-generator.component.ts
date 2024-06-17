import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IgcFormControlDirective } from 'igniteui-angular';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
defineComponents(IgcRatingComponent);

@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss'],
})

export class FormGeneratorComponent implements OnInit {
  appForm!: FormGroup;
  _formObject: any = [];
  formSection: any;
  activeSection = 'General';
  @Input() Pageheader: any = '';
  @Input() inputStyle: any = { width: '188px' };
  @Output() saveFormClicked = new EventEmitter();
  @Output() formGenerated = new EventEmitter();
  @Output() singleSelectionChanged = new EventEmitter();

  enUS: any;
  mobileNumber: string = '';
  isValidMobileNumber: boolean = false;
  isButtonDisabled: boolean = true;
  mobileNumberError: string = '';

  constructor(
    private formbuilder: FormBuilder,
  ) {
    this.enUS = {
      firstDayOfWeek: 0,
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'],
      monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'mm/dd/yy',
      weekHeader: 'Wk'
    }
  }

  ngOnInit() {
  }

  @Input()
  set formObject(formObj: any) {
    this._formObject = [];
    for (const section in formObj) {
      if (formObj.hasOwnProperty(section)) {
        this.formSection = {
          Label: section,
          Name: section,
          ReadOnly: true,
          Type: 'Section',
          FormFields: formObj[section],
        };
        this._formObject.push(this.formSection);
      }
    }

    formObj = this._formObject;
    this.generateReactiveForm(formObj);
  }

  generateReactiveForm(formObject: any) {
    const formModel: any = {};

    if (formObject) {
      // outer sections
      formObject.forEach((section: any) => {
        const sectionFields = section.FormFields;
        sectionFields.forEach((element: any) => {
          if (element.value !== undefined) {
            formModel[element.name] = new FormControl(element.value);
          } else {
            formModel[element.name] = new FormControl(null, Validators.required);
          }
        });
      });
      this.appForm = this.formbuilder.group(formModel);
      if (Object.keys(this.appForm.value).length > 0) {
        this.formGenerated.emit(this.appForm);
      }
    }
  }

  saveForm(event: any) {
    this.saveFormClicked.emit(this.appForm.value);
  }

  clear() {
    this.appForm.reset();
  }

  processFile(imageInput: any) {
    // Handle file input
  }

  validateMobileNumber(): void {
    this.isValidMobileNumber = /^\d{10}$/.test(this.mobileNumber);
    this.isButtonDisabled = !this.isValidMobileNumber;
    const regex = /^[6-9]\d{9}$/;
    if (this.mobileNumber && !regex.test(this.mobileNumber)) {
      this.mobileNumberError = 'Enter valid Mobile number';
    } else {
      this.mobileNumberError = '';
    }
  }

  blockNonNumericalInput(event: KeyboardEvent): void {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  get email() {
    return this.appForm.get('Email address');
  }
  
  onSelectChange(selectedValue: any) {debugger
    this.singleSelectionChanged.emit(selectedValue)
  }
}
