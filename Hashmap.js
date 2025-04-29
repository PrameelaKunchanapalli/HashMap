
class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
      this.buckets = new Array(initialCapacity).fill(null).map(() => []);
      this.loadFactor = loadFactor;
      this.capacity = initialCapacity;
      this.size = 0;
    }
  
    hash(key) {
      let hashCode = 0;
      const prime = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (prime * hashCode + key.charCodeAt(i)) % this.capacity;
      }
      return hashCode;
    }
  // insert or update a key value pair
    set(key, value) {
      const index = this.hash(key);// get bucket index using hash
      if (index < 0 || index >= this.buckets.length) {
        throw new Error("Trying to access index out of bounds");
      }
  
      const bucket = this.buckets[index];
  // checking if key already exists,if yes update the value
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket[i][1] = value;
          return;
        }
      }
  //doesn't exists push a new pair
      bucket.push([key, value]);
      this.size++;
  
      if (this.size / this.capacity > this.loadFactor) {
        this.resize();
      }
    }
  
    get(key) {
      const index = this.hash(key);
      if (index < 0 || index >= this.buckets.length) {
        throw new Error("Trying to access index out of bounds");
      }
  
      const bucket = this.buckets[index];
      for (let [k, v] of bucket) {
        if (k === key) return v;
      }
      return null;
    }
  
    has(key) {
      return this.get(key) !== null;
    }
  
    remove(key) {
      const index = this.hash(key);
      if (index < 0 || index >= this.buckets.length) {
        throw new Error("Trying to access index out of bounds");
      }
  
      const bucket = this.buckets[index];
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) { 
          bucket.splice(i, 1);
          this.size--; //reduces the size
          return true;
        }
      }
      return false; //if key doesn't exists
    }
  
    length() {
      return this.size; //returns the current number of key-value pairs stored
    }
  
    clear() { // resets buckets empty arrays and size 0
      this.buckets = new Array(this.capacity).fill(null).map(() => []);
      this.size = 0;
    }
  
    keys() {
      const keysArray = [];
      for (let bucket of this.buckets) {
        for (let [key] of bucket) {
          keysArray.push(key);
        }
      }
      return keysArray;
    }
  
    values() {
      const valuesArray = [];
      for (let bucket of this.buckets) {
        for (let [, value] of bucket) {
          valuesArray.push(value);
        }
      }
      return valuesArray;
    }
  
    entries() {
      const entriesArray = [];
      for (let bucket of this.buckets) {
        for (let [key, value] of bucket) {
          entriesArray.push([key, value]);
        }
      }
      return entriesArray;
    }
  
    resize() {
      const oldBuckets = this.buckets;
      this.capacity *= 2;
      this.buckets = new Array(this.capacity).fill(null).map(() => []);
      this.size = 0;
  //reinsert all existing key value pairs into new buckets
      for (let bucket of oldBuckets) {
        for (let [key, value] of bucket) {
          this.set(key, value);//rehash and insert
        }
      }
    }
  }
  
 // Testing HashMap
 const test = new HashMap();
  
 test.set('apple', 'red');
 test.set('banana', 'yellow');
 test.set('carrot', 'orange');
 test.set('dog', 'brown');
 test.set('elephant', 'gray');
 test.set('frog', 'green');
 test.set('grape', 'purple');
 test.set('hat', 'black');
 test.set('ice cream', 'white');
 test.set('jacket', 'blue');
 test.set('kite', 'pink');
 test.set('lion', 'golden');
 
 console.log("Size before overwrite:", test.length());
 
 test.set('apple', 'green');
 test.set('banana', 'gold');
 test.set('carrot', 'dark orange');
 
 console.log("Size after overwrite:", test.length());
 
 test.set('moon', 'silver');
 console.log("Size after moon:", test.length());
 console.log("Capacity after resize:", test.capacity);
 
 console.log("Get apple:", test.get('apple'));
 console.log("Has lion:", test.has('lion'));
 console.log("Remove lion:", test.remove('lion'));
 console.log("Has lion:", test.has('lion'));
 console.log("Length after remove:", test.length());
 
 console.log("All keys:", test.keys());
 console.log("All values:", test.values());
 console.log("All entries:", test.entries());
 
 test.clear();
 console.log("After clear - length:", test.length());
  