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
const btnDelete = document.querySelectorAll(".delete");

const btnList = document.querySelectorAll(".btnList");

btnAllStudent.addEventListener("click", turnPageInStudent);
btnClassStudent.addEventListener("click", turnPageInStudent);
btnTestStudent.addEventListener("click", turnPageInStudent);
btnMoneyStudent.addEventListener("click", turnPageInStudent);
btnRandomStudent.addEventListener("click", turnPageInStudent);
btnAdd.forEach((btn) => {
  btn.addEventListener("click", addStudentInStudent);
});
btnDelete.forEach((btn) => {
  btn.addEventListener("click", deleteStudentInStudent);
});
btnList.forEach((btn) => {
  btn.addEventListener("click", turnPageInClass);
});
document.addEventListener("keydown", save);

// 첫번째 페이지
function turnPageInStudent(event) {
  const thisIndex = event.target.getAttribute("btnIndex");
  main.querySelectorAll(".main-page").forEach((page) => {
    page.classList.add("hide");
  });
  main.querySelector(`.main-page[pageIndex="${thisIndex}"]`).classList.remove("hide");
}
function addStudentInStudent(event) {
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
  const newDelete = document.createElement("button");
  newDelete.classList.add("delete");
  newDelete.innerText = "X";
  newDelete.addEventListener("click", deleteStudentInStudent);
  newStudent.appendChild(newOrder);
  newStudent.appendChild(newName);
  newStudent.appendChild(newSchool);
  newStudent.appendChild(newAge);
  newStudent.appendChild(newDelete);

  parentDiv.insertBefore(newStudent, lastChild);
}
function deleteStudentInStudent(event) {
  const thisStudent = event.target.parentNode;
  thisStudent.remove();
}

// 두번째 페이지
function turnPageInClass(event) {
  const thisIndex = event.target.getAttribute("btnIndex");
  main.querySelectorAll(".main-page.classStudent .content").forEach((content) => {
    content.classList.add("hide");
  });
  main.querySelector(`.main-page.classStudent .content[pageIndex="${thisIndex}"]`).classList.remove("hide");
}

// Firebase
async function save(event) {
  if (event.ctrlKey) {
    if (event.key === "s") {
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
      await setDoc(doc(db, "studentData", "middle"), {
        data: middleData,
      });
      await setDoc(doc(db, "studentData", "high"), {
        data: highData,
      });
    }
  }
}
async function getData() {
  const divElementary = document.querySelector(".elementary");
  const divMiddle = document.querySelector(".middle");
  const divHigh = document.querySelector(".high");
  const elementaryData = await getDoc(doc(db, "studentData", "elementary"));
  const middleData = await getDoc(doc(db, "studentData", "middle"));
  const highData = await getDoc(doc(db, "studentData", "high"));
  //   if (!docSnap.data()) {
  //     return;
  //   }
  const studentData = [elementaryData.data().data, middleData.data().data, highData.data().data];
  const studentDiv = [divElementary, divMiddle, divHigh];

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < studentData[j].length; i++) {
      const newStudent = document.createElement("div");
      newStudent.classList.add("student");
      const newOrder = document.createElement("div");
      newOrder.classList.add("order");
      const newName = document.createElement("div");
      newName.classList.add("name");
      newName.innerText = studentData[j][i].name;
      newName.setAttribute("contentEditable", true);
      const newSchool = document.createElement("div");
      newSchool.classList.add("school");
      newSchool.innerText = studentData[j][i].school;
      newSchool.setAttribute("contentEditable", true);
      const newAge = document.createElement("div");
      newAge.classList.add("age");
      newAge.innerText = studentData[j][i].age;
      newAge.setAttribute("contentEditable", true);
      const newDelete = document.createElement("button");
      newDelete.classList.add("delete");
      newDelete.innerText = "X";
      newDelete.addEventListener("click", deleteStudentInStudent);

      newStudent.appendChild(newOrder);
      newStudent.appendChild(newName);
      newStudent.appendChild(newSchool);
      newStudent.appendChild(newAge);
      newStudent.appendChild(newDelete);
      studentDiv[j].insertBefore(newStudent, studentDiv[j].querySelector(".btnAdd"));
    }
  }
}

getData();
