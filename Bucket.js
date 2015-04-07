/**
 * Created by Martin on 04.04.2015.
 */

function Bucket(num){

    this.head = null;
    this.row_num = num;
    this.average_weighting;

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

    function delete_Element(element){

        //alert(element);
        if(element.previous == null){
            this.head = element.next;
            this.head.previous = null;
        }else if(element.next == null){
            element.previous.next = null;
        }else{
            element.previous.next = element.next;
            element.next.previous = element.previous;
        }
    }

    this.select_Element = function(){

        //use weighting calculation to select the best element
        var cur_el = this.head;
        var cur_selection = null;
        var cur_maxdistance = 0;

        //alert("4-0-1");

        //go over list an save in temp file the weighting with greatest difference
        while(cur_el!=null){
            //alert("Bucket "+this.row_num+" Element ID: "+cur_el.element.ID+" next: "+cur_el.next);

            var distance = distance_check(cur_el.element.weightings,this.average_weighting);
            //alert(distance +"   "+cur_maxdistance);

            if(distance > cur_maxdistance){
                cur_selection = cur_el;
                cur_maxdistance = distance;
            }
            cur_el = cur_el.next;

        }
        //alert("4-0-3 "+cur_selection);
        if(cur_selection != null){
            delete_Element(cur_selection);
            return cur_selection.element;
        }else{
            return null;
        }
    }

    function distance_check(weighting,average_weighting){

        var distance_sum = 0;
        //alert("dis sum "+average_weighting+" ; "+weighting);

        for(var i=0; i<average_weighting.length; i++){

            distance_sum = distance_sum + Math.abs(average_weighting[i]-weighting[i]);
        }

        return distance_sum;
    }
}