function kali2(obj) {

    const keys = Object.keys(obj)
  
    for (let index = 0; index < keys.length; index++) {
      
      // dummy untuk key dan value properti object
      const key = keys[index]
      const value = obj[key]
  
      if (typeof value === 'number') {
        
        // menggandakan nilai jika bertipe angka
        obj[key] = obj[key] * 2
  
      } else if (value && typeof value === 'object') {
        
        // memanggil diri sendiri jika bertipe Object
        kali2(obj[key])
  
      }
    }
  
    return obj
  
}

const results = {
    barang1 : {
        S : 23,
        M : 45,
        L : 50,
        rusak : {
            S : 3,
            M : 5,
            L : 5
        }
    },
    barang2 : {
        S : 24,
        M : 70,
        L : 90
    }
}

const compose = (...fns) => (arg) =>
  fns.reduceRight((acc, fn) => (fn ? fn(acc) : acc), arg)

const tambah = (n) => (n2) =>  {
    console.log("tambah",n,n2,n + n2)
    return n + n2
}

const kali = (n) => (n2) =>  {
    console.log("kali",n,n2, n * n2)
    return n * n2
}

const composedOperations = compose(tambah(1),kali(2))

const compute = (arr, initialNum = 0) =>
  arr.reduce(composedOperations)

// console.log(compute([6,4],2))

var arr = [2, 3]; 
   
function sumofArray(sum, num) { 
    return sum + num; 
} 

function myGeeks() { 
    return arr.reduce(sumofArray); 
} 

console.log(myGeeks())