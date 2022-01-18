const person = {
    name : {
        fname : "Prajjwal",
        lname : "Mishra"
    },
    age : 21
}

// Shallow Clone using Spread

const person_x = {...person};
person_x["name"]["fname"] = "Aaditya";
console.log(person["name"]["fname"]);


// Shallow Clone using assign

const person2 = Object.assign({}, person);

person2["name"]["fname"] = "Prashant";

// Nested Objects not cloned
console.log(person["name"]["fname"]);


// Deep Clone using Stringify

const person3 = JSON.parse(JSON.stringify(person));
person3["name"]["fname"] = "Smita";
console.log(person["name"]["fname"]);

// stringify converts Date object to string
const obj = { date: new Date('2019-06-01') };
const copy = JSON.parse(JSON.stringify(obj));
console.log(typeof copy["date"]);





// DeepCopy

var toString = Object.prototype.toString;
function deepCopy(obj) {
    var rv;

    switch (typeof obj) {
        case "object":
            if (obj === null) {
                // null => null
                rv = null;
            } else {
                switch (toString.call(obj)) {
                    case "[object Array]":
                        // It's an array, create a new array with
                        // deep copies of the entries
                        rv = obj.map(deepCopy);
                        break;
                    case "[object Date]":
                        // Clone the date
                        rv = new Date(obj);
                        break;
                    case "[object RegExp]":
                        // Clone the RegExp
                        rv = new RegExp(obj);
                        break;
                    // ...probably a few others
                    default:
                        // Some other kind of object, deep-copy its
                        // properties into a new object
                        rv = Object.keys(obj).reduce(function(prev, key) {
                            prev[key] = deepCopy(obj[key]);
                            return prev;
                        }, {});
                        break;
                }
            }
            break;
        default:
            // It's a primitive, copy via assignment
            rv = obj;
            break;
    }
    return rv;
}
var a = [1, {foo: "bar"}, ['a', 'b'], new Date()];
console.log(JSON.stringify(a));
var b = deepCopy(a);
console.log( typeof a[3]);