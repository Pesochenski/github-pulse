const axios = require("axios");
const { parse } = require("node-html-parser");

const query = async () => {
  const res = await axios.get("https://github.com/ReSenpai").catch(err => err);
  // console.log(res.data);

  const repoNames = [];

  const output = parse(res.data).querySelectorAll(".repo").forEach(item => repoNames.push(item.childNodes[0]._rawText)); // .childNodes[0]._rawText;
  console.log(repoNames);
}

// const query = async () => {
//   const res = await fetch("https://github.com/Pesochenski", {
//     method: "GET",
//   }).then(res => res.json).catch(err => err);

//   console.log(res.data);

//   // const output = res.data.querySelector(".repo").innerHTML;
//   // console.log(output);
// }

query();