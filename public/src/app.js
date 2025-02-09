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

const btnAdd = allStudent.querySelectorAll(".btnAdd");
const btnDelete = allStudent.querySelectorAll(".delete");

const allSection = classStudent.querySelectorAll(".section");
const btnList = classStudent.querySelectorAll(".btnList:not(.btnAddTable)");
const btnAddTable = classStudent.querySelector(".btnAddTable");

let clickedDiv;

btnAllStudent.addEventListener("click", turnPageInStudent);
btnClassStudent.addEventListener("click", turnPageInStudent);
btnTestStudent.addEventListener("click", turnPageInStudent);
btnMoneyStudent.addEventListener("click", turnPageInStudent);
btnRandomStudent.addEventListener("click", turnPageInStudent);
btnAdd.forEach((btn) => {
  btn.addEventListener("click", addStudent);
});
btnDelete.forEach((btn) => {
  btn.addEventListener("click", deleteStudent);
});
btnList.forEach((btn) => {
  btn.addEventListener("click", turnPageInClass);
});
btnAddTable.addEventListener("click", addTableInclass);
allSection.forEach((section) => {
  section.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      clickDiv(event);
    }
  });
});
document.addEventListener("keydown", save);

// 공통
function addStudent(event) {
  const newStudent = document.createElement("div");
  const newOrder = document.createElement("div");
  const newName = document.createElement("div");
  const newSchool = document.createElement("div");
  const newAge = document.createElement("div");
  const newDelete = document.createElement("button");
  newStudent.classList.add("student");
  newOrder.classList.add("order");
  newName.classList.add("name");
  newSchool.classList.add("school");
  newAge.classList.add("age");
  newDelete.classList.add("delete");
  newName.setAttribute("contenteditable", true);
  newSchool.setAttribute("contenteditable", true);
  newAge.setAttribute("contenteditable", true);
  newDelete.innerText = "-";
  newDelete.addEventListener("click", deleteStudent);
  newStudent.appendChild(newOrder);
  newStudent.appendChild(newName);
  newStudent.appendChild(newSchool);
  newStudent.appendChild(newAge);
  newStudent.appendChild(newDelete);

  event.target.parentNode.insertBefore(newStudent, event.target.parentNode.lastElementChild);
}
function deleteStudent(event) {
  event.target.parentNode.remove();
}

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
  newDelete.addEventListener("click", deleteStudent);
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
function addTableInclass() {
  const newTable = document.createElement("div");
  const newClassName = document.createElement("div");
  const newFrame = document.createElement("div");
  const newOrderFrame = document.createElement("div");
  const newNameFrame = document.createElement("div");
  const newSchoolFrame = document.createElement("div");
  const newAgeFrame = document.createElement("div");
  const newDeleteFrame = document.createElement("button");
  const newAddFrame = document.createElement("button");

  newTable.classList.add("classTable");
  newFrame.classList.add("studentFrame");
  newClassName.classList.add("classNameFrame");
  newOrderFrame.classList.add("orderFrame");
  newNameFrame.classList.add("nameFrame");
  newSchoolFrame.classList.add("schoolFrame");
  newAgeFrame.classList.add("ageFrame");
  newDeleteFrame.classList.add("deleteFrame");
  newAddFrame.classList.add("addFrame");

  newClassName.setAttribute("contenteditable", true);
  newOrderFrame.innerText = "순서";
  newNameFrame.innerText = "이름";
  newSchoolFrame.innerText = "학교";
  newAgeFrame.innerText = "학년";
  newDeleteFrame.innerText = "X";
  newAddFrame.innerText = "+";

  newDeleteFrame.addEventListener("click", deleteClassTable);
  newAddFrame.addEventListener("click", addStudent);

  newFrame.appendChild(newOrderFrame);
  newFrame.appendChild(newNameFrame);
  newFrame.appendChild(newSchoolFrame);
  newFrame.appendChild(newAgeFrame);
  newFrame.appendChild(newDeleteFrame);

  newTable.appendChild(newClassName);
  newTable.appendChild(newFrame);
  newTable.appendChild(newAddFrame);
  clickedDiv && clickedDiv !== "" && clickedDiv.appendChild(newTable);
}
function deleteClassTable(event) {
  event.target.parentNode.parentNode.remove();
}
function clickDiv(event) {
  if (clickedDiv) {
    if (event.target.classList.contains("clickedDiv")) {
      event.target.classList.remove("clickedDiv");
      clickedDiv = "";
    } else {
      clickedDiv.classList.remove("clickedDiv");
      clickedDiv = event.target;
      clickedDiv.classList.add("clickedDiv");
    }
  } else {
    clickedDiv = event.target;
    clickedDiv.classList.add("clickedDiv");
  }
}
// Firebase
async function save(event) {
  if (event.ctrlKey) {
    if (event.key === "s") {
      event.preventDefault();
      const dataName = ["elementary", "middle", "high"];

      // 첫번째 페이지
      //초등
      const elementaryData = [];
      const middleData = [];
      const highData = [];
      const datas = [elementaryData, middleData, highData];

      const elementaryStudents = allStudent.querySelector(".elementary").querySelectorAll(".student");
      const middleStudents = allStudent.querySelector(".middle").querySelectorAll(".student");
      const highStudents = allStudent.querySelector(".high").querySelectorAll(".student");
      const studentData = [elementaryStudents, middleStudents, highStudents];

      for (let j = 0; j < studentData.length; j++) {
        for (let i = 0; i < studentData[j].length; i++) {
          let tempObj = {};
          tempObj.name = studentData[j][i].querySelector(".name").innerText;
          tempObj.school = studentData[j][i].querySelector(".school").innerText;
          tempObj.age = studentData[j][i].querySelector(".age").innerText;
          datas[j].push(tempObj);
        }
        await setDoc(doc(db, "studentData", `${dataName[j]}`), {
          data: datas[j],
        });
      }

      // 두번째 페이지
      const elementaryClassData = [];
      const middleClassData = [];
      const highClassData = [];
      const classData = [elementaryClassData, middleClassData, highClassData];

      const elementaryClassStudent = classStudent.querySelector(".elementary").querySelectorAll(".student");
      const middleClassStudent = classStudent.querySelector(".middle").querySelectorAll(".student");
      const highClassStudent = classStudent.querySelector(".high").querySelectorAll(".student");
      const classStudentData = [elementaryClassStudent, middleClassStudent, highClassStudent];

      for (let j = 0; j < classStudentData.length; j++) {
        for (let i = 0; i < classStudentData[j].length; i++) {
          let tempObj = {};
          tempObj.section = classStudentData[j][i].parentNode.parentNode.classList[1];
          tempObj.class = classStudentData[j][i].parentNode.firstElementChild.innerText;
          tempObj.name = classStudentData[j][i].querySelector(".name").innerText;
          tempObj.school = classStudentData[j][i].querySelector(".school").innerText;
          tempObj.age = classStudentData[j][i].querySelector(".age").innerText;
          classData[j].push(tempObj);
        }
        await setDoc(doc(db, "classData", `${dataName[j]}`), {
          data: classData[j],
        });
      }
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
      newDelete.innerText = "-";
      newDelete.addEventListener("click", deleteStudent);

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
