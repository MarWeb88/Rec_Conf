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

            while(cur_el.next != null){
                cur_el = cur_el.next;
            }
            var new_pointer = new Pointer_Element(option,cur_el,null);
        }
    }

    function delete_Element(element){
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

        //go over list an save in temp file the weighting with greatest difference
        while(cur_el!=null){

            var distance = distance_check(cur_el.element.weightings);

            if(distance > cur_maxdistance){
                cur_selection = cur_el;
                cur_maxdistance = distance;
            }
            cur_el = cur_el.next;
        }

        //delete Element from List
        delete_Element(cur_el);

        if(cur_el != null){
            return cur_el.element;
        }else{
            return null;
        }
    }

    function distance_check(weighting){

        var distance_sum = 0;

        for(var i=0; i<this.average_weighting; i++){
            distance_sum = distance_sum + Math.abs(this.average_weighting[i]-weighting[i]);
        }
        return distance_sum;
    }
}