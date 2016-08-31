var GeometryHelper = function(){
  this.pointIsInsideRectangle = function(point, rectangle){
    return (point.x > rectangle.bottomLeft.x
       && point.y < rectangle.bottomLeft.y
       && point.x < rectangle.bottomLeft.x + rectangle.width 
       && point.y > rectangle.bottomLeft.y - rectangle.height);
  };
  
  this.addVectors = function(vector1, vector2){
    return { x: vector1.x + vector2.x, y: vector1.y + vector2.y };
  };
  
  this.pointIsAboveRectangle = function(point, rectangle){
    return point.y < rectangle.bottomLeft.y - rectangle.height;
  };
  
  this.pointIsBelowRectangle = function(point, rectangle){
    return point.y > rectangle.bottomLeft.y;
  };
  
  this.pointIsLeftOfRectangle = function(point, rectangle){
    return point.x < rectangle.bottomLeft.x;
  };
  
  this.pointIsRightOfRectangle = function(point, rectangle){
    return point.x > rectangle.bottomLeft.x + rectangle.width;
  };
  
  this.findLineIntersection = function(line1Start, line1End, line2Start, line2End) {
    // source: http://jsfiddle.net/justin_c_rounds/Gd2S2/
    
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false,
        segmentsIntersect: false
    };
    denominator = ((line2End.y - line2Start.y) * (line1End.x - line1Start.x)) - ((line2End.x - line2Start.x) * (line1End.y - line1Start.y));
    if (denominator == 0) {
        return result;
    }
    a = line1Start.y - line2Start.y;
    b = line1Start.x - line2Start.x;
    numerator1 = ((line2End.x - line2Start.x) * a) - ((line2End.y - line2Start.y) * b);
    numerator2 = ((line1End.x - line1Start.x) * a) - ((line1End.y - line1Start.y) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1Start.x + (a * (line1End.x - line1Start.x));
    result.y = line1Start.y + (a * (line1End.y - line1Start.y));
    /*
        // it is worth noting that this should be the same as:
        x = line2Start.x + (b * (line2End.x - line2Start.x));
        y = line2Start.x + (b * (line2End.y - line2Start.y));
        */
    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    result.segmentsIntersect = result.onLine1 && result.onLine2;
    
    return result;
  };
};