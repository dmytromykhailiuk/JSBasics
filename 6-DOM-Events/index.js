//----------------Showing-the-width-and-height-of-a-window----------------------

const widthElement = document.getElementById("width-element");
const heightElement = document.getElementById("height-element");

const setWidthAndHeight = () => {
  widthElement.innerHTML = window.innerWidth;
  heightElement.innerHTML = window.innerHeight;
};

setWidthAndHeight();

const createThrottledHandler = (handler, throttleTime) => {
  let isThrottled = false;
  return (event) => {
    if (!isThrottled) {
      isThrottled = true;
      setTimeout(() => {
        handler(event);
        isThrottled = false;
      }, throttleTime);
    }
  };
};

const throttledHandler = createThrottledHandler(setWidthAndHeight, 500);

window.onresize = throttledHandler;

//-----------------------Searching-by-word-in-text------------------------------

const searchField = document.getElementById("search-field");
const textareaField = document.getElementById("textarea-field");
const contentField = document.getElementById("content-field");

const findToHighlight = () => {
  contentField.innerHTML = textareaField.value.replace(
    new RegExp(searchField.value.trim(), "gmu"),
    (str) => `<b>${str}</b>`
  );
};

searchField.oninput = findToHighlight;

textareaField.oninput = (e) => {
  contentField.innerHTML = e.target.value;
  findToHighlight();
};

//---------------------------Images-slider--------------------------------------

const timeUpButton = document.getElementById("time-up");
const timeDownButton = document.getElementById("time-down");
const nextImageLeftButton = document.getElementById("next-image-left");
const nextImageRightButton = document.getElementById("next-image-right");
const imageScreen = document.getElementById("image-screen");
const addImageField = document.getElementById("add-image-field");
const addImageButton = document.getElementById("add-image-btn");
const timerValueElement = document.getElementById("timer-value");

const IMAGE_NOT_FOUND_LINK =
  "https://www.labaleine.fr/sites/default/files/image-not-found.jpg";
const EMPTY_IMAGE_LINK =
  "https://www.beth-israel.org/wp-content/themes/Astoundz/images/placeholder.png";

const TimerValueCommands = {
  Up: "up",
  Down: "down",
};

const ChangeImageCommands = {
  Left: "left",
  Right: "right",
};

let images = [];

let selectedImageIndex;

let timerValue = 3;

const showImage = (url) => (imageScreen.src = url);

let autoSetNextImageTimeout;

const runAutoSetNextImage = () => {
  autoSetNextImageTimeout = setTimeout(() => {
    setNextImage(ChangeImageCommands.Right);
  }, timerValue * 1000);
};

const setNextImage = (command) => {
  if (images.length < 2) {
    return;
  }

  clearTimeout(autoSetNextImageTimeout);

  switch (command) {
    case ChangeImageCommands.Left:
      if (selectedImageIndex === 0) {
        selectedImageIndex = images.length - 1;
      } else {
        selectedImageIndex--;
      }
      break;
    case ChangeImageCommands.Right:
      if (selectedImageIndex === images.length - 1) {
        selectedImageIndex = 0;
      } else {
        selectedImageIndex++;
      }
      break;
    default:
  }

  showImage(images[selectedImageIndex]);

  runAutoSetNextImage();
};

const changeTimerValue = (command) => {
  switch (command) {
    case TimerValueCommands.Up:
      timerValue++;
      timerValueElement.innerHTML = timerValue.toString();
      break;
    case TimerValueCommands.Down:
      if (timerValue !== 1) {
        timerValue--;
        timerValueElement.innerHTML = timerValue.toString();
      }
      break;
    default:
  }
};

const deleteImage = () => {
  if (!images.length) {
    return;
  }

  let needDelete = confirm("Do you really want to delete this Image?");

  if (!needDelete) {
    return;
  }

  if (images.length === 1 && selectedImageIndex === 0) {
    selectedImageIndex = null;
    images = [];
    showImage(EMPTY_IMAGE_LINK);
  } else if (
    images.length - 1 === selectedImageIndex &&
    selectedImageIndex > 0
  ) {
    selectedImageIndex = 0;
    images.splice(selectedImageIndex, 1);
    showImage(images[selectedImageIndex]);
  } else {
    images.splice(selectedImageIndex, 1);
    showImage(images[selectedImageIndex]);
  }
};

const addImage = () => {
  const url = addImageField.value.trim();

  if (url) {
    if (!images.length) {
      selectedImageIndex = 0;
      showImage(url);
    }

    images.push(url);

    if (images.length === 2) {
      runAutoSetNextImage();
    }
  }

  addImageField.value = "";
};

imageScreen.ondblclick = deleteImage;
nextImageLeftButton.onclick = () => setNextImage(ChangeImageCommands.Left);
nextImageRightButton.onclick = () => setNextImage(ChangeImageCommands.Right);
imageScreen.onerror = () => showImage(IMAGE_NOT_FOUND_LINK);
timeUpButton.onclick = () => changeTimerValue(TimerValueCommands.Up);
timeDownButton.onclick = () => changeTimerValue(TimerValueCommands.Down);
addImageButton.onclick = addImage;

//-----------------------------Table-rows---------------------------------------

const table = document.getElementById("table-body");
const addRowButton = document.getElementById("add-row-button");

const deleteIcon = `<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 -256 1792 1792" id="svg3741" version="1.1" inkscape:version="0.48.3.1 r9886" width="25px" height="25px" sodipodi:docname="trash_font_awesome.svg">
<metadata id="metadata3751">
  <rdf:RDF>
    <cc:Work rdf:about="">
      <dc:format>image/svg+xml</dc:format>
      <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
    </cc:Work>
  </rdf:RDF>
</metadata>
<defs id="defs3749"/>
<sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="640" inkscape:window-height="480" id="namedview3747" showgrid="false" inkscape:zoom="0.13169643" inkscape:cx="896" inkscape:cy="896" inkscape:window-x="0" inkscape:window-y="25" inkscape:window-maximized="0" inkscape:current-layer="svg3741"/>
<g transform="matrix(1,0,0,-1,197.42373,1255.0508)" id="g3743">
  <path d="M 512,800 V 224 q 0,-14 -9,-23 -9,-9 -23,-9 h -64 q -14,0 -23,9 -9,9 -9,23 v 576 q 0,14 9,23 9,9 23,9 h 64 q 14,0 23,-9 9,-9 9,-23 z m 256,0 V 224 q 0,-14 -9,-23 -9,-9 -23,-9 h -64 q -14,0 -23,9 -9,9 -9,23 v 576 q 0,14 9,23 9,9 23,9 h 64 q 14,0 23,-9 9,-9 9,-23 z m 256,0 V 224 q 0,-14 -9,-23 -9,-9 -23,-9 h -64 q -14,0 -23,9 -9,9 -9,23 v 576 q 0,14 9,23 9,9 23,9 h 64 q 14,0 23,-9 9,-9 9,-23 z M 1152,76 v 948 H 256 V 76 Q 256,54 263,35.5 270,17 277.5,8.5 285,0 288,0 h 832 q 3,0 10.5,8.5 7.5,8.5 14.5,27 7,18.5 7,40.5 z M 480,1152 h 448 l -48,117 q -7,9 -17,11 H 546 q -10,-2 -17,-11 z m 928,-32 v -64 q 0,-14 -9,-23 -9,-9 -23,-9 h -96 V 76 q 0,-83 -47,-143.5 -47,-60.5 -113,-60.5 H 288 q -66,0 -113,58.5 Q 128,-11 128,72 v 952 H 32 q -14,0 -23,9 -9,9 -9,23 v 64 q 0,14 9,23 9,9 23,9 h 309 l 70,167 q 15,37 54,63 39,26 79,26 h 320 q 40,0 79,-26 39,-26 54,-63 l 70,-167 h 309 q 14,0 23,-9 9,-9 9,-23 z" id="path3745" inkscape:connector-curvature="0" style="fill:currentColor"/>
</g>
</svg>`;

let lastId = 2;
let currentFieldInEditMode = null;

let tableData = [];

const createRow = (firstname, lastname, id) => {
  if (!id) {
    ++lastId;
  }
  const tr = document.createElement("tr");
  tr.id = `row-${id || lastId}`;
  tr.innerHTML = `
    <td 
      class="row-field" 
      id=row-firstname-${id || lastId}>${firstname || "Firstname"}
    </td>
    <td 
      class="row-field" 
      id=row-lastname-${id || lastId}>${lastname || "Lastname"}</td>
    <td 
      class="delete-row-button" 
      id=row-delete-button-${id || lastId}>${deleteIcon}
    </td>`;
  return tr;
};

const createRowObject = (firstname, lastname, id) => {
  return {
    id: id || lastId,
    node: document.getElementById(`row-${id || lastId}`),
    firstname: {
      value: firstname || "Firstname",
      isEditMode: false,
      input: null,
      node: document.getElementById(`row-firstname-${id || lastId}`),
    },
    lastname: {
      value: lastname || "Lastname",
      isEditMode: false,
      input: null,
      node: document.getElementById(`row-lastname-${id || lastId}`),
    },
    deleteButton: document.getElementById(`row-delete-button-${id || lastId}`),
  };
};

const closeEditMode = ({ saveValue } = {}) => {
  if (currentFieldInEditMode) {
    const editableField =
      tableData[currentFieldInEditMode.index][currentFieldInEditMode.fieldType];
    editableField.isEditMode = false;
    editableField.node.innerHTML = saveValue
      ? editableField.input.value
      : editableField.value;
    if (saveValue) {
      editableField.value = editableField.node.innerHTML;
    }
    editableField.input = null;
    currentFieldInEditMode = null;
  }
};

const addRowToTable = (firstname, lastname, id) => {
  closeEditMode();
  table.append(createRow(firstname, lastname, id));
  const rowObject = createRowObject(firstname, lastname, id);
  tableData = [...tableData, rowObject];
};

const getDeleteButtonFromTarget = (element) => {
  if (element.id === "table") {
    return false;
  } else if (element.classList.contains("delete-row-button")) {
    return element;
  }
  return getDeleteButtonFromTarget(element.parentElement);
};

const deleteRowById = (id) => {
  closeEditMode();
  const index = tableData.findIndex((el) => el.id === +id);
  tableData[index].node.remove();
  tableData.splice(index, 1);
};

addRowButton.onclick = () => addRowToTable();

table.onclick = (e) => {
  const deleteButton = getDeleteButtonFromTarget(e.target);
  if (deleteButton) {
    const id = deleteButton.id.split("-")[3];
    deleteRowById(id);
  }
};

const startEditField = (index, fieldType) => {
  const currentRow = tableData[index][fieldType];
  if (!currentRow.isEditMode) {
    closeEditMode();
    currentRow.isEditMode = true;
    currentRow.node.innerHTML = `<input value="${currentRow.value}"/>`;
    currentRow.input = currentRow.node.firstElementChild;
    currentRow.input.focus();
    currentFieldInEditMode = { index, fieldType };
  }
};

table.ondblclick = (e) => {
  if (e.target.classList.contains("row-field")) {
    const idArr = e.target.id.split("-");
    const id = idArr[2];
    const index = tableData.findIndex((el) => el.id === +id);
    const fieldType = idArr[1];
    startEditField(index, fieldType);
  }
};

table.onkeyup = (e) => {
  switch (e.code) {
    case "Enter":
      closeEditMode({ saveValue: true });
      break;
    case "Escape":
      closeEditMode();
      break;
    default:
  }
};

addRowToTable("Jill", "Smith", 1);
addRowToTable("Michael", "Jackson", 2);
