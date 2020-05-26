
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
  this.label = (obj.label) ? obj.label:'';
  this.placeholder = (obj.placeholder) ? obj.placeholder:this.label;
  if(this.type == 'select')  this.placeholder = '';

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
    this.label_hidden = (obj.label_hidden) ? this.gen_label_hidden(): '';

    switch(this.type){
      case 'text':
      case 'number':
      case 'password':
      case 'email':
      case 'hidden':
      case 'file':
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
      case 'checkbox':
        ret = this.gen_checkbox();
	break;
      case 'photo':
        ret = this.gen_photo();
	break;
      case 'file':
        ret = this.gen_file();
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

  this.gen_label_hidden = function(){
    var ret = '<input type="hidden" name="meta[label]['+ this.id + ']" value="' + this.label +'" >';
    return ret;
  }

  this.gen_text = function(){
    this.step = (this.obj.step)  ? 'step="'+ this.obj.step+'" ':'';

    var ret = '<input class="form-control '+this.class+'" type="'+this.type+'" name="'+this.name+'" placeholder="'+this.placeholder+'" value="'+this.value+'" id="'+this.id+'"'+ this.required + this.autofocus + this.readonly +this.disabled + this.style + this.step + this.maxlength + this.bg_color +'  >';
    
    ret += this.label_hidden;
    return ret;
  }

  this.gen_textarea = function(){
    this.rows = (this.obj.rows) ? 'rows="'+this.obj.rows+'" ': '';
    this.cols = (this.obj.cols) ? 'cols="'+this.obj.cols+'" ': '';
    this.wrap = (this.obj.wrap) ? 'wrap="'+this.obj.wrap+'" ': '';

    var ret = '<textarea  class="form-control '+this.class+'" type="'+this.type+'" name="'+this.name+'" placeholder="'+this.placeholder+'" id="'+this.id+'"'+ this.rows + this.cols + this.wrap + this.maxlength + this.autofocus + this.required + this.readonly +this.disabled + this.style + this.bg_color +' > '+this.value+'</textarea>';
    
    ret += this.label_hidden;
    return ret;
  }
  
  /*
   * data-object property
   */

  this.gen_select = function(){
    this.placeholder = (this.placeholder !== '') ? this.placeholder:'Choose One'; 
    var opt = this.options;
    this.selected = (obj.selected) ? obj.selected: '';

    var data_obj = (obj.data_obj) ? "data-obj='" + obj.data_obj + "'":'';

    var ret = '<select id="'+this.id+'" name="'+this.name+'" class="form-control '+this.class+'"'+ this.required + this.readonly + data_obj + this.disabled +'>';
    ret += '<option value="">'+this.placeholder+'</option>';
    //if(opt && Array.isArray(opt)){
    if(opt && opt != ''){
      for(var i in opt){
        var key = opt[i].code;
	var value = opt[i].name;
	var selected = (this.selected != '' && key == this.selected) ? "selected": "";
	ret += '<option value="'+key+'"'+ selected +'>'+ value  +'</option>';
      }
    }
    ret += '</select>';
    ret += '<div id="meta_'+ this.id +'">';
    if(this.obj.meta_val && this.obj.meta_val != '')  ret += '<input name="meta['+ this.id +']" type="hidden" value="'+this.obj.meta_val+'">';
    ret += '</div>';
    ret += this.label_hidden;
    return ret;
  }

  this.gen_radio = function(){
    var opt = this.options;
    var ret = checked = '';
    this.checked = (obj.checked) ? obj.checked: '';
    var radio_cls = (this.obj.radio_cls) ? this.obj.radio_cls:'radio';
    
    if(opt && opt != ''){
      for(var i in opt){
        var key = opt[i].code;
	var value = opt[i].name;
	var name = (opt[i].field_name) ? opt[i].field_name: this.name;
	var id = (opt[i].id) ? opt[i].id: this.id;
	var checked = (this.checked != '' && key == this.checked) ? "checked": "";
        ret += '<label class="'+ radio_cls +'"'+ this.bg_color +'>';
	  ret += '<input type="'+this.type+'" id="'+ id +'" name="'+name +'" value="'+ key +'" class="'+ this.class +'"' +checked +'>' + value;
	ret += '</label>';
      }
    }
    ret += this.label_hidden;
    return ret;
  }

  this.gen_checkbox = function(){
    var opt = this.options;
    var ret =  '';
    this.checked = (obj.checked) ? obj.checked: '';
    var checkbox_cls = (this.obj.checkbox_cls) ? this.obj.checkbox_cls:'checkbox';
    

    if(opt){
      for(var i in opt){
        var key = opt[i].code;
	var value = opt[i].name;
	var name = (opt[i].field_name) ? opt[i].field_name: this.name;
	var id = (opt[i].id) ? opt[i].id: this.id;
	var checked = (this.checked != '' && key == this.checked) ? "checked": "";

        ret += '<label class="'+ checkbox_cls +'"'+ this.bg_color +'>';
	  ret += '<input type="'+this.type+'" id="'+ id +'" name="'+name +'" value="'+ key +'" class="'+ this.class +'"' +checked +'>' + value;
	ret += '</label>';
      

	if(opt[i].extra){
          var extra = opt[i].extra;
	  ret += '<div class="'+ extra.class  +'" id="' + extra.id +'"></div>';
	}
      }
    }
    ret += this.label_hidden;

    return ret;
  }

  this.gen_photo = function(){
    var name_hidden = this.name + "_hidden";
    var id_hidden = name_hidden;
    var value = (obj.value) ? obj.value: "Choose One";
    var height = (obj.height) ? obj.height: '';
    var width = (obj.width) ? obj.width: '';
    var preview = (obj.preview) ? obj.preview: '';
    var preview_img = (obj.preview_img) ? obj.preview_img: '';
    var style = "border:1px solid green";

    var ret = '';
    
    ret += '<div class="form-group">';
      ret += '<img height="' + height +'" width="'+width+'" src="'+preview_img+'" id="'+preview+'" align="absmiddle" style="'+style+'"/>';
    ret += '</div>';
    ret += '<input type="hidden" name="'+ name_hidden +'" id="'+id_hidden+'" value="'+preview_img+'" >';
    ret += '<button type="button" name="'+this.name+'" id="'+this.id+'" class="'+this.class+'">'+ value+'</button>';
    ret += '';
    ret += this.label_hidden;
    return ret;
  }

  this.gen_file = function(){
    var ret = '<input type="'+this.type+'" name="'+this.name+'" id="'+this.id +'"'+ this.required +'>';
    ret += this.label_hidden;
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
	  if(this.obj.btn[i] == '') continue;
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
