import { getFirestore, collection, doc, addDoc, setDoc, getDoc, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";
const db = getFirestore();
getData();

//main영역 1-5페이지
const main = document.querySelector(".main");
const allStudent = document.querySelector(".allStudent");
const classStudent = document.querySelector(".classStudent");
const testStudent = document.querySelector(".testStudent");
const moneyStudent = document.querySelector(".moneyStudent");
const randomStudent = document.querySelector(".randomStudent");

//footer영역 1-5버튼
const footer = document.querySelector(".footer");
const btnAllStudent = footer.querySelector(".btnAllStudent");
const btnClassStudent = footer.querySelector(".btnClassStudent");
const btnTestStudent = footer.querySelector(".btnTestStudent");
const btnMoneyStudent = footer.querySelector(".btnMoneyStudent");
const btnRandomStudent = footer.querySelector(".btnRandomStudent");

//공통버튼
const btnAdd = allStudent.querySelectorAll(".btnAdd");
const btnDelete = allStudent.querySelectorAll(".delete");

//2번째 페이지
const allSection = classStudent.querySelectorAll(".section");
const btnList = classStudent.querySelectorAll(".btnList:not(.btnAddTable)");
const btnAddTable = classStudent.querySelector(".btnAddTable");

//3번째 페이지
const btnMiddleStudent = testStudent.querySelector(".list .btnMiddle");
const btnHighStudent = testStudent.querySelector(".list .btnHigh");

const btnFirstGrade = testStudent.querySelector(".list .btnFirst");
const btnSecondGrade = testStudent.querySelector(".list .btnSecond");
const btnThirdGrade = testStudent.querySelector(".list .btnThird");

const pageMiddleStudent = testStudent.querySelector(".content.middle");
const pageHighStudent = testStudent.querySelector(".content.high");

const pageMiddleFirst = testStudent.querySelector(".content.middle .pageFirst");
const pageMiddleSecond = testStudent.querySelector(".content.middle .pageSecond");
const pageMiddleThird = testStudent.querySelector(".content.middle .pageThrid");
const pageHighFirst = testStudent.querySelector(".content.high .pageFirst");
const pageHighSecond = testStudent.querySelector(".content.high .pageSecond");
const pageHighThird = testStudent.querySelector(".content.high .pageThrid");

const allBtnInTest = [btnFirstGrade, btnSecondGrade, btnThirdGrade];
const allPageInTest = [pageMiddleFirst, pageMiddleSecond, pageMiddleThird, pageHighFirst, pageHighSecond, pageHighThird];

//변수
let clickedDiv;
let allClassTable;
let allClassStudent;

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
  section.addEventListener("click", findClassTable);
  section.addEventListener("click", clickDiv);
});
document.addEventListener("keydown", save);
classStudent.addEventListener("click", (event) => {
  if (!clickedDiv) return;
  if (clickedDiv.classList.contains("classTable")) {
    if (event.target.classList.contains("activeOutline")) {
      if (event.target.classList.contains("classTable")) {
        let parentDiv = event.target.parentNode;
        let childrenDiv = Array.from(parentDiv.children);
        let index = childrenDiv.indexOf(event.target) + 1;
        parentDiv.insertBefore(clickedDiv, childrenDiv[index]);
      }
    }
  } else if (clickedDiv.classList.contains("student")) {
    if (clickedDiv !== event.target.parentNode) {
      if (event.target.classList.contains("student")) {
        let parentDiv = event.target.parentNode;
        let childrenDiv = Array.from(parentDiv.children);
        let index = childrenDiv.indexOf(event.target) + 1;
        parentDiv.insertBefore(clickedDiv, childrenDiv[index]);
      } else if (event.target.parentNode.classList.contains("student")) {
        let parentDiv = event.target.parentNode.parentNode;
        let childrenDiv = Array.from(parentDiv.children);
        let index = childrenDiv.indexOf(event.target.parentNode) + 1;
        parentDiv.insertBefore(clickedDiv, childrenDiv[index]);
      }
    }
  }
});
btnMiddleStudent.addEventListener("click", turnPageInTest);
btnHighStudent.addEventListener("click", turnPageInTest);
btnFirstGrade.addEventListener("click", turnPageInTest);
btnSecondGrade.addEventListener("click", turnPageInTest);
btnThirdGrade.addEventListener("click", turnPageInTest);
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
  if (clickedDiv && clickedDiv !== "" && clickedDiv.classList.contains("section")) {
    clickedDiv.appendChild(newTable);
  }

  allClassTable = main.querySelectorAll(".classTable");
}
function deleteClassTable(event) {
  event.target.parentNode.parentNode.remove();

  allClassTable = main.querySelectorAll(".classTable");
}
function clickDiv(event) {
  if (event.target.classList.contains("section")) {
    //
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
    //
  } else if (event.target.classList.contains("classNameFrame")) {
    //
    if (clickedDiv) {
      if (event.target.parentNode.classList.contains("clickedDiv")) {
        event.target.parentNode.classList.remove("clickedDiv");
        clickedDiv = "";
      } else {
        clickedDiv.classList.remove("clickedDiv");
        clickedDiv = event.target.parentNode;
        clickedDiv.classList.add("clickedDiv");
      }
    } else {
      clickedDiv = event.target.parentNode;
      clickedDiv.classList.add("clickedDiv");
    }
    //
  } else if (event.target.classList.contains("order")) {
    //
    if (clickedDiv) {
      if (event.target.parentNode.classList.contains("clickedDiv")) {
        event.target.parentNode.classList.remove("clickedDiv");
        clickedDiv = "";
      } else {
        clickedDiv.classList.remove("clickedDiv");
        clickedDiv = event.target.parentNode;
        clickedDiv.classList.add("clickedDiv");
      }
    } else {
      clickedDiv = event.target.parentNode;
      clickedDiv.classList.add("clickedDiv");
    }
    //
  }
  ///////////////////////////////////////////////////////////////////////////////////////
  allClassTable.forEach((table) => table.classList.remove("activeOutline"));
  allClassStudent.forEach((student) => student.classList.remove("activeOutline"));

  if (!clickedDiv) return;
  if (clickedDiv.classList.contains("classTable")) {
    allClassTable.forEach((table) => table.classList.add("activeOutline"));
  } else if (clickedDiv.classList.contains("student")) {
    allClassStudent.forEach((student) => student.classList.add("activeOutline"));
  }
}
function findClassTable() {
  allClassTable = main.querySelectorAll(".classTable");
  allClassStudent = main.querySelectorAll(".classStudent .student");
}

// 세번째 페이지
function btnAndPageInit() {
  allBtnInTest.forEach((btn) => {
    btn.classList.remove("btnClicked");
  });
  allPageInTest.forEach((page) => {
    page.classList.add("hide");
  });
}
function turnPageInTest(event) {
  if (event.target === btnMiddleStudent) {
    btnHighStudent.classList.remove("btnClicked");
    event.target.classList.add("btnClicked");
    btnAndPageInit();
  } else if (event.target === btnHighStudent) {
    btnMiddleStudent.classList.remove("btnClicked");
    event.target.classList.add("btnClicked");
    btnAndPageInit();
  } else if (event.target === btnFirstGrade) {
    if (btnMiddleStudent.classList.contains("btnClicked")) {
      btnAndPageInit();
      event.target.classList.add("btnClicked");
      pageHighStudent.classList.add("hide");
      pageMiddleStudent.classList.remove("hide");
      pageMiddleFirst.classList.remove("hide");
    } else if (btnHighStudent.classList.contains("btnClicked")) {
      btnAndPageInit();
      event.target.classList.add("btnClicked");
      pageMiddleStudent.classList.add("hide");
      pageHighStudent.classList.remove("hide");
      pageHighFirst.classList.remove("hide");
    }
  } else if (event.target === btnSecondGrade) {
    if (btnMiddleStudent.classList.contains("btnClicked")) {
      btnAndPageInit();
      event.target.classList.add("btnClicked");
      pageHighStudent.classList.add("hide");
      pageMiddleStudent.classList.remove("hide");
      pageMiddleSecond.classList.remove("hide");
    } else if (btnHighStudent.classList.contains("btnClicked")) {
      btnAndPageInit();
      event.target.classList.add("btnClicked");
      pageMiddleStudent.classList.add("hide");
      pageHighStudent.classList.remove("hide");
      pageHighSecond.classList.remove("hide");
    }
  } else if (event.target === btnThirdGrade) {
    if (btnMiddleStudent.classList.contains("btnClicked")) {
      btnAndPageInit();
      event.target.classList.add("btnClicked");
      pageHighStudent.classList.add("hide");
      pageMiddleStudent.classList.remove("hide");
      pageMiddleThird.classList.remove("hide");
    } else if (btnHighStudent.classList.contains("btnClicked")) {
      btnAndPageInit();
      event.target.classList.add("btnClicked");
      pageMiddleStudent.classList.add("hide");
      pageHighStudent.classList.remove("hide");
      pageHighThird.classList.remove("hide");
    }
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
