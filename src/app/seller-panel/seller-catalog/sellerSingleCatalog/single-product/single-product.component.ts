import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TokenStorageService } from '../../../../_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedDataService } from '../../../../_services/sharedService/shared-data.service';
import { HttpClient } from '@angular/common/http';
import { ProductServiceService } from '../../../../_services/productServices/product-service.service';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { FormBuilder, FormControl } from '@angular/forms';
// interface Field {
//   identifier: string; // This must match the type used as keys in formControls
//   mandatory: boolean;
// }
// Define the ProductDataBuilder class
// class ProductDataBuilder {
 
// }
// Importing bootstrap for TypeScript to recognize it
declare var bootstrap: any;

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {
  constructor( 
    private tokenStorage: TokenStorageService, 
    private toast:NgToastService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private sharedDataService:SharedDataService,
    private http: HttpClient,
    private productService:ProductServiceService,
    private fb: FormBuilder,) {    }

// productFormBuilder: FormGroup = this.fb.group({});
  productFieldsBuilder: any[] = [];
  variationConfig:any[] = [];
  sizeFieldBuilder:any[] = [];
  productDetailsBuilder:any[]=[];
  productDescAndOtherBuilder:any[]=[];
  isLoading = true;
  form!: FormGroup;
  rowsData: any[] = [];  // To store rows from the form
  tableFieldBuilder:any[] = [];



  get productRows(): FormArray {
    return this.form.get('productRows') as FormArray;
  }
  get checkboxesControl(): FormArray {
    return this.form.get('productSize') as FormArray;
  }
  bornCategoryId:any;
  ngOnInit() {
        this.bornCategoryId = 2;
        this.form = this.fb.group({
          productRows: this.fb.array([]),
          productSize: this.fb.array([])
        });

        this.productService.getFormBuilders(this.bornCategoryId).subscribe((data: any) => {
        console.log(data);
        
        this.productFieldsBuilder = data.productDataBuilderList;
        this.tableFieldBuilder = data.tableDataBuilderList;
        this.sizeFieldBuilder = data.sizeDataBuilderList;
        this.productDetailsBuilder = data.productDetailsBuilderList;
        this.productDescAndOtherBuilder = data.productDescAndOtherBuilderList;
        this.productFieldsForm();
        this.tableDatabuildForm();
        this.sizeBuildForm();
        this.productDetailsForm();
        this.productDescAndOtherForm();
      });
    }

    productFieldsForm() {
    this.productFieldsBuilder.forEach((field) => {
      if (field.type === 'multi-select') {
        this.form.addControl(
          field.identifier,
          this.fb.array([]) // Use FormArray for multi-select
        );
      } else {
        const validators = [];
        if (field.required) validators.push(Validators.required);
        if (field.min !== undefined) validators.push(Validators.min(field.min));
        if (field.max !== undefined) validators.push(Validators.max(field.max));

        this.form.addControl(field.identifier, this.fb.control('', validators));
      }
    });
  }

  tableDatabuildForm() {
    this.tableFieldBuilder.forEach((field) => {
      if (field.type === 'multi-select') {
        this.form.addControl(
          field.identifier,
          this.fb.array([]) // Use FormArray for multi-select
        );
      } else {
        const validators = [];
        if (field.required) validators.push(Validators.required);
        if (field.min !== undefined) validators.push(Validators.min(field.min));
        if (field.max !== undefined) validators.push(Validators.max(field.max));
      }
    });
  }

    sizeBuildForm() {
    this.sizeFieldBuilder.forEach((field) => {
      if (field.type === 'multi-select') {
        this.form.addControl(
          field.identifier,
          this.fb.array([]) // Use FormArray for multi-select
        );
      } else {
        const validators = [];
        if (field.required) validators.push(Validators.required);
        if (field.min !== undefined) validators.push(Validators.min(field.min));
        if (field.max !== undefined) validators.push(Validators.max(field.max));
        this.form.addControl(field.identifier, this.fb.control('', validators));
      }
    });
  }

  productDetailsForm() {
    this.productDetailsBuilder.forEach((field) => {
      if (field.type === 'multi-select') {
        this.form.addControl(
          field.identifier,
          this.fb.array([]) // Use FormArray for multi-select
        );
      } else {
        const validators = [];
        if (field.required) validators.push(Validators.required);
        if (field.min !== undefined) validators.push(Validators.min(field.min));
        if (field.max !== undefined) validators.push(Validators.max(field.max));
        this.form.addControl(field.identifier, this.fb.control('', validators));
      }
    });
  }

  productDescAndOtherForm() {
    this.productDescAndOtherBuilder.forEach((field) => {
      if (field.type === 'multi-select') {
        this.form.addControl(
          field.identifier,
          this.fb.array([]) // Use FormArray for multi-select
        );
      } else {
        const validators = [];
        if (field.required) validators.push(Validators.required);
        if (field.min !== undefined) validators.push(Validators.min(field.min));
        if (field.max !== undefined) validators.push(Validators.max(field.max));
        this.form.addControl(field.identifier, this.fb.control('', validators));
      }
    });
  }


checkBawal:any[] = [];
onCheckboxChange(event: any, field: any) {
  // Ensure the FormArray exists, or initialize it if missing
  let formArray: FormArray = this.form.get(field.identifier) as FormArray;
  if (!formArray) {
    formArray = this.fb.array([]);
    this.form.addControl(field.identifier, formArray); // Dynamically add if not present
  }
  
  const option = event.target.value;
  if (event.target.checked) {
    formArray.push(this.fb.control(event.target.value));
    this.addTableRow({ variantSize: option }); // Add row for checked option
  } else {
    const index = formArray.controls.findIndex((control) => control.value === event.target.value);
    if (index !== -1) {
      formArray.removeAt(index);
      this.removeRowByCategory(option); // Remove row for unchecked option
    }
  }
  // Optional: Track the current state
  this.checkBawal = formArray.value;
  console.log(this.checkBawal.length);
}



// Add new row
addTableRow(data: any = {}) {
  const row = this.fb.group({});
  this.tableFieldBuilder.forEach(col => {
    if (col.type === 'dropdown') {
      row.addControl(col.identifier, this.fb.control(data[col.identifier] || col[0], Validators.required));
    } else if(col.type === 'text') {
      row.addControl(col.identifier, this.fb.control(data[col.identifier] || '', Validators.required));
    }
  });
  this.productRows.push(row);
}





// Remove row by category
removeRowByCategory(variantSize: string) {
  console.log("removeRowByCategory:: " + variantSize);
  const index = this.productRows.controls.findIndex(row => row.value.variantSize === variantSize);
  console.log("index:: " + index);
  if (index !== -1) {
    this.productRows.removeAt(index);
  }
}

// Remove row by index
removeRow(index: number) {
  this.productRows.removeAt(index);
}

onSubmit() {

  console.log(this.form.value);
  
  if (this.form.valid) {
     this.productService.saveRows(this.form.value).subscribe(
       (response:any) => {
         this.toast.success({detail:"Success",summary:"Data Saved Success", position:"bottomRight",duration:3000});
       },
       (error:any) => {
        this.toast.error({detail:"Error",summary:"Data not saved", position:"bottomRight",duration:3000});
       }
     );
   } else {
     console.log('Form is invalid!');
     this.form.markAllAsTouched();
   }
}


  loadData(){
    this.productService.getrows().subscribe(
      (data:any) => {

        console.log("Load Data:: " + data);
        console.log(data);
        

        //Patching the Data
        this.form.patchValue(data);
        
        //Creating Rows
        this.productRows.clear();  // Clear existing rows in the form array
        data.productRows.forEach((row: any) => {
          this.addTableRow(row);  // Add rows to the form from the fetched data
        }); 


        //Creating Multise-selection Box
        Object.keys(data).forEach((key) => {
          const control = this.form.get(key);
          if(key === "productSize"){
            if (control instanceof FormArray) {
              // Populate FormArray for multi-select fields
              const values: any[] = data[key];
              values.forEach((value) => {
                if (!control.value.includes(value)) {
                  control.push(this.fb.control(value));
                }
              });
            }
          }
        });
        this.toast.success({detail:"Success",summary:"Data Fetch Success", position:"topRight",duration:3000});
      },
      (error) => {
        this.toast.error({detail:"Error",summary:"Form Data Not Loaded", position:"bottomRight",duration:3000});
      }


    );
  } 

    





  //Starting new code
  openModal() {
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();
  }

  closeModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('myModal'));
    modal.hide();
  }

  colors: string[] = ['Red', 'Blue', 'Green', 'Black', 'White'];
  sizes: string[] = ['S', 'M', 'L', 'XL', 'XXL'];
  // Extra JSON data
extraFields: any[] = [
                      { "identifier": "variantSize", "name": "Variant Size", "type": "text", "required": false },
                      { "identifier": "price", "name": "Price", "type": "text", "required": true },
                      { "identifier": "mrp", "name": "Mrp Price", "type": "text", "required": true },
                      { "identifier": "skuId", "name": "SKU ID", "type": "text", "required": true },
                      { "identifier": "productLength", "name": "Product Length (inch)", "type": "dropdown", "values": ["5", "15", "25", "300", "100"], "required": true },
                      { "identifier": "productBreath", "name": "Product Breath", "type": "dropdown", "values": ["45", "50", "55", "60", "65", "70", "75", "80"], "required": true },
                      { "identifier": "productHeight", "name": "Product Height", "type": "dropdown", "values": ["100", "101", "102", "103", "106", "109", "145", "1520"], "required": true }
                    ];

  selectedColor: string = '';
  selectedSize: string = '';
  rows: any[] = [];
  alertMessage: string = ''; // For showing alert message
  formSubmitted: boolean = false; // Flag to trigger validation on submit

  // Add a new row to the table with selected values
  
addRow() {
  this.formSubmitted = true;

  // Check if the color and size combination already exists
  const exists = this.rows.some(row => 
    row.color === this.selectedColor && 
    row.size === this.selectedSize
  );

  if (exists) {
    this.alertMessage = `The combination of color: ${this.selectedColor} and size: ${this.selectedSize} already exists!`;
    setTimeout(() => {
      this.alertMessage = '';
    }, 3000);
  } else {
    // Add the row to the table with additional fields
    const newRow = {
      color: this.selectedColor,
      size: this.selectedSize,
      length: null, // Initialize length as null
      extraFields: this.tableFieldBuilder.reduce((acc, field) => {
        acc[field.identifier] = field.type === 'dropdown' ? field.values[0] : ''; // Default value for text or dropdown
        return acc;
      }, {})
    };
  
    this.rows.push(newRow);

    // Reset dropdowns after adding the row
    this.selectedColor = '';
    this.selectedSize = '';

    // Clear the alert message after 3 seconds
    setTimeout(() => {
      this.alertMessage = '';
    }, 3000);
  }
}

  // Remove a specific row from the table
  removeRow1(index: number) {
    this.rows.splice(index, 1);
  }


  productColor:any;
  // Submit the form (for demonstration purposes, just logging the rows)
  onSubmit1(form: any) {
    this.formSubmitted = true;

    if (form.valid) {
      console.log('Form submitted with rows:', this.rows);

         // Grouping by productColor and collecting sizes for each color
      const groupedByColor:any = {};

      this.rows.forEach(product => {
        // Check if the productColor already exists in the groupedByColor object
        if (!groupedByColor[product.color]) {
          groupedByColor[product.color] = {
            sizes: [],
            products: []
          };
        }

        // Add the size (now renamed to productSize) to the sizes array (ensure it's unique)
        if (product.size && !groupedByColor[product.color].sizes.includes(product.size)) {
          groupedByColor[product.color].sizes.push(product.size);
        }

        // Add the productColor and productSize to the product's extraFields
        const productWithUpdatedFields = {
          ...product,
          extraFields: {
            ...product.extraFields,
            productSize: product.size, // Replacing 'size' with 'productSize' in extraFields
            productColor: product.color // Adding 'productColor' to extraFields
          }
        };

        // Remove the original color, size, and length fields from the product object
        // delete productWithUpdatedFields.color;
        // delete productWithUpdatedFields.size;
        // delete productWithUpdatedFields.length;

        // Push the product with the updated extraFields into the color group
        groupedByColor[product.color].products.push(productWithUpdatedFields);
      });

      // Example of the grouped structure with productSize and productColor in extraFields
      const groupedJson = groupedByColor;

      console.log('Grouped products by color with productSize and productColor in extraFields:', groupedJson);

      // Here you would call your backend service to send the grouped data
      // Example:

      // Here you would call your backend service to send the grouped data
      // Example:
      // this.backendService.submitGroupedData(groupedJson).subscribe(response => {
      //   console.log('Data submitted successfully:', response);
      // });

    } // Call your backend service here to send the data
     else {
      console.log('Form invalid, cannot submit.');
    }
  }
  



  // isModalOpen = false;
  // // Function to open the modal
  // openModal() {
  //   this.isModalOpen = true;
  // }

  // // Function to close the modal
  // closeModal() {
  //   this.isModalOpen = false;
  // }

  // confirmAction(){
  // }





  
}

