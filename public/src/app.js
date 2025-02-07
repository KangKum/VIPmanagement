import { getFirestore, collection, doc, addDoc, setDoc, getDoc, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";
const db = getFirestore();

const main = document.querySelector(".main");
const allStudent = document.querySelector(".allStudent");
const classStudent = document.querySelector(".classStudent");
const testStudent = document.querySelector(".testStudent");
const moneyStudent = document.querySelector(".moneyStudent");
const randomStudent = document.querySelector(".randomStudent");

const footer = document.querySelector(".footer");
const btnAllStudent = footer.querySelector(".btnAllStudent");
const btnClassStudent = footer.querySelector(".btnClassStudent");
const btnTestStudent = footer.querySelector(".btnTestStudent");
const btnMoneyStudent = footer.querySelector(".btnMoneyStudent");
const btnRandomStudent = footer.querySelector(".btnRandomStudent");

const btnAdd = document.querySelectorAll(".btnAdd");

btnAllStudent.addEventListener("click", turnPage);
btnClassStudent.addEventListener("click", turnPage);
btnTestStudent.addEventListener("click", turnPage);
btnMoneyStudent.addEventListener("click", turnPage);
btnRandomStudent.addEventListener("click", turnPage);
btnAdd.forEach((btn) => {
  btn.addEventListener("click", addStudent);
});
document.addEventListener("keydown", save);

function turnPage(event) {
  let index = event.target.getAttribute("btnIndex");
  document.querySelectorAll(".main-page").forEach((page) => {
    page.classList.add("hide");
  });
  main.querySelector(`.main-page[pageIndex="${index}"]`).classList.remove("hide");
}

function addStudent(event) {
  const parentDiv = event.target.parentNode;
  const lastChild = event.target;

  const newStudent = document.createElement("div");
  newStudent.classList.add("student");
  const newOrder = document.createElement("div");
  newOrder.classList.add("order");
  const newName = document.createElement("div");
  newName.classList.add("name");
  newName.setAttribute("contentEditable", true);
  const newSchool = document.createElement("div");
  newSchool.classList.add("school");
  newSchool.setAttribute("contentEditable", true);
  const newAge = document.createElement("div");
  newAge.classList.add("age");
  newAge.setAttribute("contentEditable", true);
  newStudent.appendChild(newOrder);
  newStudent.appendChild(newName);
  newStudent.appendChild(newSchool);
  newStudent.appendChild(newAge);

  parentDiv.insertBefore(newStudent, lastChild);
}
async function save(event) {
  if (event.ctrlKey) {
    if (event.key === "s" || event.key === "S") {
      event.preventDefault();

      //초등
      let elementaryData = [];
      const elementaryStudents = allStudent.querySelector(".elementary").querySelectorAll(".student");
      for (let i = 0; i < elementaryStudents.length; i++) {
        let tempObj = {};
        tempObj.name = elementaryStudents[i].querySelector(".name").innerText;
        tempObj.school = elementaryStudents[i].querySelector(".school").innerText;
        tempObj.age = elementaryStudents[i].querySelector(".age").innerText;
        elementaryData.push(tempObj);
      }
      //중등
      let middleData = [];
      const middleStudents = allStudent.querySelector(".middle").querySelectorAll(".student");
      for (let i = 0; i < middleStudents.length; i++) {
        let tempObj = {};
        tempObj.name = middleStudents[i].querySelector(".name").innerText;
        tempObj.school = middleStudents[i].querySelector(".school").innerText;
        tempObj.age = middleStudents[i].querySelector(".age").innerText;
        middleData.push(tempObj);
      }
      //고등
      let highData = [];
      const highStudents = allStudent.querySelector(".high").querySelectorAll(".student");
      for (let i = 0; i < highStudents.length; i++) {
        let tempObj = {};
        tempObj.name = highStudents[i].querySelector(".name").innerText;
        tempObj.school = highStudents[i].querySelector(".school").innerText;
        tempObj.age = highStudents[i].querySelector(".age").innerText;
        highData.push(tempObj);
      }
      await setDoc(doc(db, "studentData", "elementary"), {
        data: elementaryData,
      });
    }
  }
}
