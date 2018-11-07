import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import "./PdfForm.css"
export default class PdfForm extends Component{
    constructor(props){
        super(props);
        this.state = {
           warnings: '',
        }
    }
    checkFileType(){
        var pdfInput = document.getElementById("pdfInput");
        if(pdfInput.files.length <= 0){
            this.setState(
                {
                    warnings: (
                        <p>
                            { 
                                `There is no PDF file to upload.`
                            }
                        </p>
                    )
                }
            )
            return false;
        }
        else{
            var pdfFile = pdfInput.files[0];
            if(pdfFile.type.search("pdf") === -1){
                this.setState(
                    {
                        warnings: (
                            <div>
                                <p>
                                    { 
                                        `File type is not PDF.`
                                    }
                                </p>
                                <p>
                                    {
                                        `It is of '${pdfFile.type}' type.`
                                    }

                                </p>

                            </div>
                            
                        )
                    }
                )
                return false;
            }
            return true;
        }
    }
    onPressSubmit(event){
        event.preventDefault();
        if(this.checkFileType() ){
            this.submitForm();
        }
        
    }
    submitForm(){
        var form = document.getElementById("pdfForm");
        var formData = new FormData(form);
        var headers = new Headers();
        var options = {
            'method': 'POST',
            'mode': 'cors',
            'headers': headers,
            'body': formData,
          }
        fetch("http://localhost:8000/book/upload/", options)
        .then(
            (value) => {
                console.log(`1 - received value: ${value}`);
                return value.json();
            }
        )
        .then(
            (value) => {
                console.log(`2 - received  json value: ${value}`);
                console.log(value);
            }
        )
        .catch(
            (reason) => {
                console.log("deu erro");
                console.log(reason);
             }
        );

    }
    eraseWarnings(){
        this.setState(
            {
                warnings: "",
            }
        )
    }
    render(){
        return(
            <div
             className={"pdfform-main-div"}>

                <form 
                 id = { "pdfForm" }>
                    <TextField
                     name = { "pdfName" }
                     label={ "File Name (Optional)" }
                     placeholder = { "i.e.: Harry Potter" }
                     variant = { "outlined" } />

                    <input
                     name = { "pdfInput" }
                     id = { "pdfInput" }
                     type = { "file" } 
                     onClick = { 
                         () => {
                             this.eraseWarnings();
                         }
                     }
                     />

                    {
                        this.state.warnings
                    }


                     <input
                      name = { "submitButton" }
                      id = { "submitButton" }
                      type = { "submit" } 
                      onClick = { (event) => { this.onPressSubmit(event) }}
                      />

                </form>

            </div>
        )
    }
}

