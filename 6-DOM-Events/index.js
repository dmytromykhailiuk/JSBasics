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

const images = [];

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

const table = document.getElementById("table");
const deleteIcon = document.getElementById("delete-btn-cell").innerHTML;

const createRow = () => {
  return `
    <td></td>
    <td></td>
    <td>${deleteIcon}</td>
  `;
};
