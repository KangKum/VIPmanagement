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
function drawStudent(nameData, schoolData, ageData) {
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
  newName.setAttribute("contentEditable", true);
  newSchool.setAttribute("contentEditable", true);
  newAge.setAttribute("contentEditable", true);
  newDelete.innerText = "-";
  newDelete.addEventListener("click", deleteStudent);

  newName.innerText = nameData;
  newSchool.innerText = schoolData;
  newAge.innerText = ageData;

  newStudent.appendChild(newOrder);
  newStudent.appendChild(newName);
  newStudent.appendChild(newSchool);
  newStudent.appendChild(newAge);
  newStudent.appendChild(newDelete);

  return newStudent;
}
function drawTable(classNameData) {
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

  newClassName.innerText = classNameData;
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

  return newTable;
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

      // 두번째 페이지 // 테이블별로 저장
      const elementaryClassData = [];
      const middleClassData = [];
      const highClassData = [];
      const classDatas = [elementaryClassData, middleClassData, highClassData];

      const elementaryClass = classStudent.querySelectorAll(".elementary .classTable");
      const middleClass = classStudent.querySelectorAll(".middle .classTable");
      const highClass = classStudent.querySelectorAll(".high .classTable");
      const classData = [elementaryClass, middleClass, highClass];

      for (let j = 0; j < classData.length; j++) {
        for (let i = 0; i < classData[j].length; i++) {
          let tempObj = {};
          tempObj.section = classData[j][i].parentNode.classList[1];
          tempObj.class = classData[j][i].firstElementChild.innerText;
          let studentsInClass = [];
          for (let k = 0; k < classData[j][i].querySelectorAll(".student").length; k++) {
            let tempStudent = {};
            tempStudent.name = classData[j][i].querySelectorAll(".student")[k].querySelector(".name").innerText;
            tempStudent.school = classData[j][i].querySelectorAll(".student")[k].querySelector(".school").innerText;
            tempStudent.age = classData[j][i].querySelectorAll(".student")[k].querySelector(".age").innerText;
            studentsInClass.push(tempStudent);
          }
          tempObj.student = studentsInClass;
          classDatas[j].push(tempObj);
        }
        await setDoc(doc(db, "classData", `${dataName[j]}`), {
          data: classDatas[j],
        });
      }
      console.log(classDatas);
    }
  }
}
async function getData() {
  const dataName = ["elementary", "middle", "high"];

  //첫번째 페이지
  const elementaryData = await getDoc(doc(db, "studentData", "elementary"));
  const middleData = await getDoc(doc(db, "studentData", "middle"));
  const highData = await getDoc(doc(db, "studentData", "high"));
  const studentData = [elementaryData.data().data, middleData.data().data, highData.data().data];

  const divElementary = main.querySelector(".allStudent .elementary");
  const divMiddle = main.querySelector(".allStudent .middle");
  const divHigh = main.querySelector(".allStudent .high");
  const studentDiv = [divElementary, divMiddle, divHigh];

  for (let j = 0; j < studentData.length; j++) {
    for (let i = 0; i < studentData[j].length; i++) {
      const newStudent = drawStudent(studentData[j][i].name, studentData[j][i].school, studentData[j][i].age);
      studentDiv[j].insertBefore(newStudent, studentDiv[j].querySelector(".btnAdd"));
    }
  }

  //두번째 페이지
  const elementaryClassData = await getDoc(doc(db, "classData", "elementary"));
  const middleClassData = await getDoc(doc(db, "classData", "middle"));
  const highClassData = await getDoc(doc(db, "classData", "high"));
  const classData = [elementaryClassData.data().data, middleClassData.data().data, highClassData.data().data];

  const classElementary = main.querySelector(".classStudent .elementary");
  const classMiddle = main.querySelector(".classStudent .middle");
  const classHigh = main.querySelector(".classStudent .high");
  const classDiv = [classElementary, classMiddle, classHigh];

  for (let i = 0; i < classData.length; i++) {
    for (let j = 0; j < classData[i].length; j++) {
      const newTable = drawTable(classData[i][j].class);
      for (let k = 0; k < classData[i][j].student.length; k++) {
        const newStudent = drawStudent(classData[i][j].student[k].name, classData[i][j].student[k].school, classData[i][j].student[k].age);
        newTable.insertBefore(newStudent, newTable.lastElementChild);
      }
      classDiv[i].querySelector(`.${classData[i][j].section}`).appendChild(newTable);
    }
  }
}
getData();
// 두번째 페이지 마우스로 반 옮기는거 해야돼
