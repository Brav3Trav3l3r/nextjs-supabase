let str = "is2 This1 a3 test4";

let arr = str.split(" ");
// [ 'is2', 'This1', 'a3', 'test4' ]

const newArr = arr.map((e) => {
  let holder = "";
  e.filter((w) => {
    if (typeof Number(w)) {
      holder += w;
    }
  });
});
