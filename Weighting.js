/**
 * Created by Martin on 15.03.2015.
 */

function Weighting(val_array){

    this.weightings = val_array;

    this.reduce_weighting = function(variants){

        for(var i=2; i<=variants; i++){
            if(reduce_weighting(i,this.weightings)==false){
                return false;
            }
        }
        return true;
    }

    function reduce_weighting(num,val){

        for(var i=0; i<val.length; i++){
            if(val[i]!=0 && val[i]%num !=0){
                return true;
            }
        }
        return false;
    }
}