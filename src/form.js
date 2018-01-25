
/*
 * FormBuilder
 *
 */

function Form(obj){
  this.obj = obj;
  this.type = obj.type;
  this.name = obj.name;
  this.id = (obj.id) ? obj.id:obj.name;
  this.value = (obj.value) ? obj.value:'';
  this.placeholder = (obj.placeholder) ? obj.placeholder:'';

  this.disabled = (obj.disabled ) ? 'disabled ':'';
  this.readonly = (obj.readonly) ? 'readonly ':'';
  this.required = (obj.required && obj.required === true ) ? 'required ':'';
  this.autofocus = !(obj.autofocus) ? 'autofocus ':'';

  this.class = (obj.class) ? obj.class:'';  
  this.style = (obj.style) ? 'style="'+obj.style +'" ':'';
  this.bg_color = (obj.bg_color) ? 'style="background-color: '+obj.bg_color+'" ': '';
  this.bg_class = (obj.bg_class) ? obj.bg_class:'';
  this.class += this.bg_class;
  
  this.maxlength = (obj.maxlength) ? 'maxlength="'+obj.maxlength+'" ': '';
  this.options = (obj.options) ? obj.options:'';
  
  this.gen_input = function(){
    var ret;
    switch(this.type){
      case 'text':
      case 'number':
      case 'password':
      case 'email':
      case 'hidden':
        ret = this.gen_text();
        break;
      case 'textarea':
        ret = this.gen_textarea();
	break;
      case 'select':
        ret = this.gen_select();
	break;
      case 'radio':
        ret = this.gen_radio();
	break;

      case 'button':
        ret = this.gen_button();
	break;
      case 'submit':
        ret = this.gen_submit();
	break;
      case 'btn-group':
        ret = this.gen_btnGroup();
        break;
    }
    return ret;
  }

  this.gen_text = function(){
    this.step = (this.obj.step)  ? 'step="'+ this.obj.step+'" ':'';

    var ret = '<input class="form-control '+this.class+'" type="'+this.type+'" name="'+this.name+'" placeholder="'+this.placeholder+'" value="'+this.value+'" id="'+this.id+'"'+ this.required + this.autofocus + this.readonly +this.disabled + this.style + this.step + this.maxlength + this.bg_color +'  >';
    return ret;
  }

  this.gen_textarea = function(){
    this.rows = (this.obj.rows) ? 'rows="'+this.obj.rows+'" ': '';
    this.cols = (this.obj.cols) ? 'cols="'+this.obj.cols+'" ': '';
    this.wrap = (this.obj.wrap) ? 'wrap="'+this.obj.wrap+'" ': '';

    var ret = '<textarea  class="form-control '+this.class+'" type="'+this.type+'" name="'+this.name+'" placeholder="'+this.placeholder+'" id="'+this.id+'"'+ this.rows + this.cols + this.wrap + this.maxlength + this.autofocus + this.required + this.readonly +this.disabled + this.style + this.bg_color +' > '+this.value+'</textarea>';
    return ret;
  }
  
  this.gen_select = function(){
    this.placeholder = (this.placeholder !== '') ? this.placeholder:'Choose One'; 
    var opt = this.options;

    var ret = '<select id="'+this.id+'" name="'+this.name+'" class="form-control '+this.class+'"'+ this.required + this.readonly + this.disabled +'>';
    ret += '<option value="">'+this.placeholder+'</option>';
    if(opt && Array.isArray(opt)){
      for(var i in opt){
        var key = opt[i].key;
	var value = opt[i].value;
	ret += '<option value="'+key+'">'+ value  +'</option>';
      }
    }
    ret += '</select>';
    return ret;
  }

  this.gen_radio = function(){
    var opt = this.options;
    var ret = checked = '';
    var radio_cls = (this.obj.radio_cls) ? this.obj.radio_cls:'radio';
    
    if(opt && Array.isArray(opt)){
      for(var i in opt){
        var key = opt[i].key;
	var value = opt[i].value;
        if(opt[i].checked && opt[i].checked === true){
          checked = "checked";
	}else checked = '';
        ret += '<label class="'+ radio_cls +'"'+ this.bg_color +'>';
	  ret += '<input type="'+this.type+'" id="'+ this.id +'" name="'+this.name +'" value="'+ key +'"'+ this.class +checked +'>' + value;
	ret += '</label>';
      }
    }
    return ret;
  }
  
  this.gen_button = function(){
    onclick = (this.onclick) ? 'onclick="'+this.onclick+'"':'';
    var ret = '<button class="'+this.class+'" type="'+this.type+'" name="'+this.name+'" id="'+this.id+'"'+ this.readonly +this.disabled + onclick +' >'+this.value+'</button>';
    return ret;
  }

  this.gen_submit = function(){
    var ret = '<input type="submit" id="'+ this.id +'" class="' + this.class +'" name="'+ this.name +'" value="' + this.value +'">';
    return ret;
  }

  this.gen_btnGroup = function(){
    var ret = '<div class="text-center">'; 
      ret += '<div class="btn-group">';
        for(var i in this.obj.btn){
          var key = this.obj.btn[i];
	  this.type = key.type;
	  this.class = key.class;
	  this.name = key.name;
	  this.id = key.name;
	  this.value = key.value;
          
	  ret += this.gen_input(); 

	}
      ret += '</div>';
    ret += '</div>';
    return ret;
  }

}
