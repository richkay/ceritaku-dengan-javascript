## Compose Functions
Yang dimaksud dengan *Compose Functions* adalah menggabungkan lebih dari satu function untuk membangun sesuatu yang lebih.
Konsep ini sama halnya konsep umum dalam metematika yang mana kita bisa menggabungkan 2 bahkan lebih metode untuk memecahkan suatau masalah.

### Mengapa ini jadi Penting untuk di ketahui?
Kalau dari saya jawabanya "tidak tahu". Karena sangat relatif jika membahas penting dan tidak penting.
Tetapi saya tergelitik untuk menjabarkan ini. Apakah ini akan berhaga atau tidak, terserah anda yang menentukan. Namun Saya harap dengan ini ada ruang diskusi, agar acara ngopi kita lebih asik :)


### Lanjut
Tujuan dari kita menyusun / menulis fungsi ( *Compose Functions* )
Ada banyak, namun kalau dari saya sangat membantu untuk mengurangi kode dan memotong-motong kode menjadi lebih nyaman untuk dapat digunakan kembali.

Seperti yang kita ketahui, dalam javascript fungsi dianggap sebagai *first-class*, yang artinya dapat didistribusikan dan juga dapat disamarkan sebagai "nilai", seperti *string*,*number*,*booleans*,*objects*, dll
Inilah yang menjadikan javascript menjadi sangat terkenal dan menakutkan, karena JS memungkinkan sebuah fungsi mengambil funsi lain sebagai argumen dan bahkan bisa mengembalikanya sebagai fungsi.

**Contoh**
```
function salam(str) {
  return `hai, nama saya ${str}`
}
```
Untuk menggunakanya tentu anda sudah sanggat diluar kepala, ketika fungsi ini dipanggil tentu kita akan menerima string.
```
const result = salam('andi') // nilai dari result = 'hai, nama saya andi'
```
Tapi seperti telah kita bisacarakn sebelumnya, bahwa fungsi dapat mengambil fungsi.
jadi mari kita gunakan argumen kedua dan menguji, apa yang bisa kita lakukan hanya dengan menambahkan argumen fungsi ke fungsi:
```
// Fungsi Utama
function salam(str, modify = (s) => s) {
  return `hai, nama saya ${modify(str)}`
}

// Fungsi Tambahan
function capitalize(value) {
  return value.toUpperCase()
}

const result = salam('andi', capitalize) // nilai dari result = 'hai, nama saya ANDI'
```

Dari contoh diatas fleksibel sekali bukan, oleh karenanya mempelajari cara merencanakan dan menyusun fungsi dalam JavaScript adalah salah satu keterampilan terpenting (*menurut saya*) yang harus diambil ketika mengembangkan aplikasi JavaScript!

## Gitu Doang 'Ezzz'!! Yuk kita gass sedikit contoh masalah yang mengada-ada :)

Jika diketahui sebuah object sebagai berikut :
```
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
```
karena alasan tertentu nilai-nilai yang bertipe angka dari setiap properti object harus di kali(x) 2.
Maka kita membutuhkan fungsi yang bertanggung jawab untuk melihat dan menggandakan nilai-nilai dari object tersebut.

```
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
```
Mari kita jalankan fungsi 
```
console.log(kali2(results))
// Hasilnya
{ 
    barang1: { 
        S: 46, M: 90, L: 100, 
        rusak: { S: 6, M: 10, L: 10 } 
    },
    barang2: { S: 48, M: 140, L: 180 } 
}
```

Jadi kita menyelesaikan masalah diatas dengan teknik *rekursi* ( *akan kita bahas ditulisan yang lain :)* ) 
Oleh karena fakta bahwa kita dapat menggunakan fungsi secara bebas dalam JavaScript menyusun/penulisan fungsi menjadi topik yang sangat penting!

Dengan paradigma ini kita bisa membuat fungsi untuk lebih mudah dikembangkan dan merubah kompleksitas menjadi utilitas.
Bagaimana jadi tambah bingung?
Yuk kita coba variasi menulis fungsi, misal yang bisa mengumpulakan fungsi-fungsi lain:
```
const compose = (...fns) => (arg) =>
  fns.reduceRight((acc, fn) => (fn ? fn(acc) : acc), arg)
```
Yaps contoh diatas bisa digunakan untuk menampung fungsi-fungsi, dan kita tetap bisa mempertahankan cara pemanggilannya.
Maksudnya begini :

```
function capitalize(value) {
    return value.toUpperCase()
}

function check_nama(obj) {
  return obj ? obj : obj
}

function check_pekerjaan(obj) {
  obj['pekerjaan'] = capitalize(obj['pekerjaan'])
  return obj
}

const check_profile = compose(
  check_nama,
  check_pekerjaan,
)

const result = check_profile({
    nama: 'Aldi',
    pekerjaan: 'dokter'
})

console.log(result)

//hasilnya 
{ nama: 'Aldi', pekerjaan: 'DOKTER' }
```