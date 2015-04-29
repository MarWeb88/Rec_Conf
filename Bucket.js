/**
 * Created by Martin on 04.04.2015.
 */

function Bucket(num){

    this.head = null;
    this.row_num = num;
    this.average_weighting;
    this.list = new Array();

    var local_h_version = 0;

    this.add_Element = function(option){

        if(this.head == null){
            this.head = new Pointer_Element(option,null,null);
            this.average_weighting = option.weightings;
        }else{
            var cur_el = this.head;

            //iterate to the last element in the list
            while(cur_el.next != null){
                cur_el = cur_el.next;
            }
            //create new Pointer-Element and add it at the end of the list
            var new_pointer = new Pointer_Element(option,cur_el,null);
            cur_el.next = new_pointer;
        }
    }
    
    function delete_Element(head,element){
        //alert("head "+head +" element "+element.previous+"  "+element.next);
        //alert(element);
        if(element.previous == null && element.next == null){
            return null;
        }else if(element.previous == null && element.next != null){
            element.next.previous = null;
            return element.next;
        }else if(element.previous != null && element.next == null){
            element.previous.next = null;
        }else{
            element.previous.next = element.next;
            element.next.previous = element.previous;
        }
        return head;
    }

    /*this.delete_Element = function(head,element){

        if(element.previous == null && element.next == null){
            return null;

        }else if(element.previous == null && element.next != null){
            head = element.next;
            head.previous = null;

        }else if(element.previous != null && element.next == null){
            element.previous.next = null;

        }else{
            element.previous.next = element.next;
            element.next.previous = element.previous;
        }
        return head;
    }*/
    /*this.add_Element = function(option){

        this.list[this.list.length]=clone(option);

        if(this.list.length==1){
            this.average_weighting = option.weightings;

        }
    }

    this.delete_Element = function(place){
        this.list[place]=null;
    }

    this.select_Element = function(){
        var cur_selection = null;
        var selection_place;
        var cur_maxdistance = 0;

        for(var i=0; i<this.list.length; i++){

            if(this.list[i]!=null){
                var distance = distance_check(this.list[i].weightings,this.average_weighting);

                if(distance >= cur_maxdistance){
                    cur_selection = this.list[i];
                    selection_place = i;
                    cur_maxdistance = distance;
                }
            }
        }

        if(cur_selection != null) {
            this.average_weighting = get_new_average(this.average_weighting,cur_selection.weightings);
            this.delete_Element(selection_place);
            return cur_selection;
        }else{
            return null;
        }
    }*/

    this.select_Element = function(h_version){

        //use weighting calculation to select the best element
        var cur_el = this.head;
        var cur_selection = null;
        var cur_maxdistance = 0;

        //go over list an save in temp file the weighting with greatest difference
        while(cur_el!=null){

            var distance = distance_check(cur_el.element.weightings,this.average_weighting);

            if(distance >= cur_maxdistance){
                cur_selection = cur_el;
                cur_maxdistance = distance;
            }
            cur_el = cur_el.next;
        }
        if(cur_selection != null){
            //adapt average weighting
            this.average_weighting = get_new_average(this.average_weighting,cur_selection.element.weightings);
            this.head = delete_Element(this.head,cur_selection);

            if(h_version!=null){
                cur_selection.element.h_version = h_version;
            }else{
                cur_selection.element.h_version = get_h_version();
            }


            //get_combi(cur_selection.element);
            //get_num_Elements(this.head);
            return cur_selection.element;
        }else{
            return null;
        }
    }

    function distance_check(weighting,average_weighting){

        var distance_sum = 0;

        for(var i=0; i<average_weighting.length; i++){
            distance_sum = distance_sum + Math.pow(average_weighting[i]-weighting[i],2);
        }
        return distance_sum;
    }

    function get_new_average(weighting_a,weighting_b){

        var average_weighting = new Array(weighting_a.length);

        for(var i=0; i<average_weighting.length; i++){
            average_weighting[i]= (weighting_a[i]+weighting_b[i])/2;
        }
        return average_weighting;
    }

    function get_combi(option){
        var out = "";
        for(var i=0; i<option.row_num; i++){
            for(var j=0; j<option.rows[i].length; j++){
                out += option.rows[i][j].type+"; ";
            }
            out+="</br> ";
        }
        alert(out);
    }

    this.get_num_Elements = function(){
        var counter = 0;
        var z = this.head;

        while(z != null){
            z = z.next;
            counter++;
        }
        alert("number: "+counter);
    }

    function get_h_version(){
        if(local_h_version == 0){
            local_h_version = 1;
            return 0;
        }else{
            local_h_version = 0;
            return 1;
        }
    }
}