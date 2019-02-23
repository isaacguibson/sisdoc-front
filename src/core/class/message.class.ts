import Swal from 'sweetalert2';

export class Message{
    private _type: 'error' | 'success' | 'info' | 'warning';
    private _title;
    private _message;
    private _confirmButtonText;
    private _confirmButtonColor;
    private _cancelButtonText;
    private _cancelButtonColor;

    private _timer;

    constructor(){
        this.clear()
    }

    setType(value){
        this._type = value
        return this;
    }

    setTitle(value){
        this._title = value
        return this;
    }

    setMessage(value){
        this._message = value
        return this;
    }

    setConfirmButton(text = 'Sim', color = 'green'){
        this._confirmButtonText = text;
        this._confirmButtonColor = color;
        return this;
    }

    setCancelButton(text = 'Não', color = 'red'){
        this._cancelButtonText = text;
        this._cancelButtonColor = color;
        return this;
    }

    setTimer(value){
        this._timer = value;
        return this;
    }

    get options(){
        let options = {};

        options['type'] = this._type !== null ? this._type : 'success';
        options['title'] = this._title !== null ? this._title : '';
        options['html'] = this._message !== null ? this._message : '';

        options['showConfirmButton'] = this._confirmButtonText !== null;
        if(this._confirmButtonText !== null){
            options['confirmButtonText'] = this._confirmButtonText;
            options['confirmButtonColor'] = this._confirmButtonColor;
        }

        options['showCancelButton'] = this._cancelButtonText !== null;
        if(this._cancelButtonText !== null){
            options['cancelButtonText'] = this._cancelButtonText;
            options['cancelButtonColor'] = this._cancelButtonColor;
        }
        
        if(this._timer !== null) 
            options['timer'] = this._timer;

        return options;
    }

    alert(){
        let swal = Swal.fire(this.options)
        this.clear();
        return swal;

        
    }

    clear(){
        this._type = null;
        this._title = null;
        this._message = null;

        this._confirmButtonText = null;
        this._confirmButtonColor = null;

        this._cancelButtonText = null;
        this._cancelButtonColor = null;

        this._timer = null;
    }

}