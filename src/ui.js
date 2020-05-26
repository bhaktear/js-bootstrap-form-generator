var ui = {
  modal: function(obj){
    var ret = '';
    modal_class = (obj.modal_class) ? obj.modal_class:'';
    ret += '<div id="'+obj.id+'" class="modal fade" tabindex="-1" role="dialog">';
      ret += '<div class="modal-dialog '+modal_class+'">';

        ret += '<div class="modal-content">';
          ret += '<div class="modal-header">';
            ret += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            ret += '<h4 class="modal-title">'+ obj.modal_title +'</h4>';
          ret += '</div>';
          ret += '<div class="modal-body">';
            ret += obj.modal_content;
          ret +='</div>';
          ret += '<div class="modal-footer">';
            ret += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
          ret += '</div>';
        ret += '</div>';
      ret +='</div>';
    ret += '</div>';
    return ret;
  },

  report: function(obj){
    var ret = '';
    for(var i in obj){
      var row = obj[i];
      ret += '<div class="row">';
      for(var j in row){
        var col = row[j];
        if(col.label){
          ret += '<div class="'+col.class_label+'">';
          ret += '<label>'+col.label+'</label>';
	  ret += '</div>';
	}
	if(col.value){
          ret += '<div class="'+col.class_obj+'">';
          ret += '<label>'+col.value+'</label>';
	  ret += '</div>';
	}

	if((col.height) && (col.width)){
          ret += '<div class="form-group '+ col.class_obj  +'">';
            ret += '<img src="'+col.preview+'" height="'+col.height+'" width="'+col.width+'" border="1px solid green"/>';
	  ret += '</div>';
	}
      }
      if(col.text){
          ret += '<div class="'+col.class_label+'">';
          ret += col.text;
	  ret += '</div>';

      }
      ret += '</div>';
    }
    return ret;
  },

  formgen:function(obj,form_id,form_action,action){
    var ret = '';
    if(!action)  action = true;
    else action = false;
    if(!form_action)  form_action = '';
    if(action === true){
      ret += '<form role="form" id="'+form_id+'" action="'+form_action+'" method="post" enctype="multipart/form-data">';
    }

    for(var i in obj){
      rows = obj[i];
      var lst = rows.length - 1; 
      var first = rows[0];
      

      if(first && first.fieldset_start){
        var text_color = (first.text_color) ? first.text_color:'';

        ret +='<fieldset class="well addr-fieldset"><legend class="addr-legend" >';
	ret += '<label class="'+ text_color+'">'+ first.fieldset_start +'</label></legend>';
      }


      if(rows[0] && rows[0].tab_start){
        ret += '<ul class="nav nav-tabs">';  
	for(var k in rows[0].tab_menu){
	  var key = rows[0].tab_menu[k];
	  var active = key.class;	
          var url = key.url;
	  var label = key.label;
          ret += '<li class="'+active+'"><a data-toggle="tab" href="#'+url+'">'+label+'</a></li>';
        }
        ret += '</ul>';
      }

      if(rows[0] && rows[0].tab_content === true){
        if(rows[0].tab_first)  ret += '<div class="tab-content">';
        var active = (rows[0].tab_first)  ? 'active':'';
        var content_class = (rows[0].content_class) ? rows[0].content_class:"tab_margin";
        ret += '<div class="tab-pane '+ active +' '+ content_class +'" id = "'+ rows[0].tab_id +'">';
      }
      
      if(first && first.panel_start === true){
        var panel_class = (first.panel_class) ? first.panel_class:'panel-default';
	var panel_id = (first.panel_id) ? 'id="'+ first.panel_id +'"':'';
        ret += '<div class="panel '+panel_class+'"'+ panel_id +'>';
        if(first.panel_heading)  ret += '<div class="panel-heading">'+first.panel_heading+'</div>';
        ret +='<div class="panel-body">';
      }

      if(first && first.div_start === true){
        var disabled = (first && first.disabled === true) ? 'disabled':'';
        ret += '<div id="'+ first.id +'"'+ disabled +'>';
      }

      ret += '<div class=\"row\">';
      for(var j in rows){
        cols = rows[j];

	var name = (cols.name) ? cols.name: '';
        var id = (cols.id) ? cols.id:name;
	var sdisplay = (cols.sdisplay) ? ' style="display: '+ cols.sdisplay +'"':'';

	ret += '<div id="row_'+ id +'"' + sdisplay +'>';

        var input_group = (cols.input_group) ? 'input-group':'form-group';
  
	
        if(cols.class_label){ 
	  var label_icon = (cols.label_icon) ? '<i class="'+cols.label_icon+'"></i>':'';
	  var label_span = (cols.label_span) ? cols.label_span:'';
          var label_class = (label_span !== '') ? ' <span class="'+cols.label_span+'">'+ label_icon +'</span>':'';
	  

          ret += '<div class="'+input_group+'  '+cols.class_label+'">';
            ret += '<label>'+cols.label+' '+ label_class +'</label>';        
          ret += '</div>';
        }
        if(cols.class_obj){
	  var obj_icon = (cols.obj_icon) ? '<i class="'+cols.obj_icon+'"></i>':'';
	  var obj_span = (cols.obj_span) ? cols.obj_span:'';
          var obj_class = (obj_span !== '') ? ' <span class="'+cols.obj_span+'">'+ obj_icon +'</span>':'';	

          ret += '<div class="'+input_group+' '+cols.class_obj+'">';
	    ret += obj_class;
            var form = new Form(cols);
            ret += form.gen_input();
          ret += '</div>';
        }
        ret += '</div>';
      }
      ret += '</div>';
      
      if(rows[lst] && rows[lst].fieldset_end){
        ret += '</fieldset>';
	//ret += '</div>';
      }

      if(rows[lst] && rows[lst].tab_end){
        ret += '</div>';
        if(rows[lst].tab_lst)  ret +='</div>';
      }

      if(rows[lst] && rows[lst].panel_end){
        ret += '</div>';
        if(rows[lst].panel_footer){
          ret +='<div class="panel-footer">';
            ret += rows[lst].panel_footer_cont;
          ret += '</div>';
        }
        ret += '</div>';
      }
      if(rows[lst] && rows[lst].div_end === true)  ret += '</div>';
    }
    if(action === true){
      ret += '</form>';
    }
    return ret; 

  },

  layout:function(obj){
    var ret = '';
    if(obj.page_heading){
      ret += '<div class="row">';
        ret += '<div class="'+ obj.form_class + '">';
          ret += '<h4 class="page-header text-center">'+ obj.page_heading +' </h4>';
        ret += '</div>';
      ret += '</div>';
    }

    ret += '<div class="row">';
      ret += '<div class="'+ obj.form_class + '">';
      
      if(obj.panel){
        var panel_class = (obj.panel_class)  ?  obj.panel_class:"panel panel-default";
	ret += '<div class="'+ panel_class +'">';
	  if(obj.panel_heading){
            ret += '<div class="panel-heading">' + obj.panel_heading + '</div>';
	  }
	  ret += '<div class="panel-body">';
	    ret += obj.ui;
	  ret += '</div>';
	ret += '</div>';
      }else ret += obj.ui;

      ret += '</div>';
      
      if(obj.extra) ret += obj.extra;
    ret += '</div>';

    return ret;
  }

};
